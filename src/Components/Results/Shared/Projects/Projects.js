import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { GridLoader } from 'react-spinners';

import { API_PROJECTS_SEARCH_END_POINT } from '../../../../config/config';

import styles from '../../../../style.scss';

import EmptySection from '../../../Shared/Results/EmptySection/EmptySection';
import SectionTitleViewMode from '../SectionTitle';
import FilterPanel from './Components/FilterPanel';
import ProjectList from './Components/ProjectList';
import ProjectGraphs from './Components/ProjectGraphs';
import Request from './Requests/Request';
import DateRequest from './Requests/DateRequest';
import PreRequest from './Requests/PreRequest';

/**
 * Productions
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Projects extends Component {
  state = {
    projectType: 'all',
    error: false,
    isLoading: true,
    total: null,
    sliderData: {},
    totalPerType: {},
    query: '',
    currentQueryText: '',
    graphData: {
      isOa: {},
      journals: {},
      years: {},
      keywords: {},
      types: {},
    },
    activeGraph: null,
    viewMode: 'list',
    data: [],
    selectedProject: '',
    high: null,
    low: null,
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.childs !== this.props.childs) {
      this.fetchGlobalData();
    }
    if (prevState.low !== this.state.low || prevState.high !== this.state.high) {
      this.fetchDataByType();
    }
    if (prevState.total !== this.state.total) {
      this.fetchDataByType();
    }
    if (prevState.projectType !== this.state.projectType) {
      this.fetchDataByType();
    }
    if (prevState.query !== this.state.query) {
      const low = 2000;
      const high = 2020;
      this.setState({ low, high });
      this.fetchDataByType();
    }
  }

  fetchGlobalData = () => {
    const url = API_PROJECTS_SEARCH_END_POINT;
    const preRequest = PreRequest;
    let allIds = [this.props.match.params.id];
    if (this.props.childs.length > 0) {
      allIds = allIds.concat(this.props.childs).slice(0, 4095);
    }
    preRequest.filters['participants.structure.id'].values = allIds;
    Axios.post(url, preRequest).then((response) => {
      const totalPerType = {};
      response.data.facets.find(facet => facet.id === 'types').entries.forEach((type) => {
        totalPerType[type.value] = type.count;
      });
      const viewMode = response.data.total > 10 ? 'graph' : 'list';
      this.setState({
        total: response.data.total,
        totalPerType,
        viewMode,
      });
    });
  }

  fetchDataByType = () => {
    if (this.state.total === 0) {
      this.setState({ isLoading: false });
      return;
    }
    this.setState({ isLoading: true });
    const url = API_PROJECTS_SEARCH_END_POINT;
    const request = Request;
    const dateRequest = DateRequest;
    request.query = this.state.query;
    dateRequest.query = this.state.query;
    if (this.state.projectType !== 'all') {
      request.filters.type = {
        type: 'MultiValueSearchFilter',
        op: 'any',
        values: [this.state.projectType],
      };
      dateRequest.filters.type = {
        type: 'MultiValueSearchFilter',
        op: 'any',
        values: [this.state.projectType],
      };
    }
    request.filters.year.min = this.state.low ? this.state.low : 2000;
    request.filters.year.max = this.state.high ? (this.state.high + 1) : 2020;

    let allIds = [this.props.match.params.id];
    if (this.props.childs.length > 0) {
      allIds = allIds.concat(this.props.childs).slice(0, 4095);
    }
    Request.filters['participants.structure.id'].values = allIds;
    dateRequest.filters['participants.structure.id'].values = allIds;
    Axios.post(url, dateRequest).then((response) => {
      const sliderData = response.data.facets.find(facet => facet.id === 'years').entries;
      this.setState({
        sliderData,
      });
    });
    Axios.post(url, request).then((response) => {
      const graphData = {};
      response.data.facets.forEach((facet) => {
        graphData[facet.id] = facet;
      });
      graphData.keywords = {
        id: 'keywords',
        entries: graphData.keywordsFr.entries.concat(graphData.keywordsEn.entries),
      };
      const data = response.data.results.sort((a, b) => (b.value.year - a.value.year));
      const selectedProject = data.length > 0 ? data[0].value.id : '';
      this.setState({
        data,
        selectedProject,
        graphData,
        isLoading: false,
      });
    });
  }

  changeTypeHandler = (e) => {
    e.preventDefault();
    if (e.target.value === 'all') {
      this.setState({ projectType: 'all', activeGraph: null });
    }
    this.setState({ projectType: e.target.value, activeGraph: null });
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  queryTextChangeHandler = (e) => {
    this.setState({ currentQueryText: e.target.value });
  }

  queryChangeHandler = (e) => {
    // eslint-disable-next-line
    e.preventDefault();
    this.setState(prevState => ({ query: prevState.currentQueryText }));
  }

  setActiveGraphHandler = (nextGraph) => {
    this.setState({ activeGraph: nextGraph });
  }

  handleSliderRange = (low, high) => {
    this.setState({
      high: Math.max(low, high),
      low: Math.min(low, high),
    });
  }

  setSelectedProjectHandler = (selectedProject) => {
    this.setState({ selectedProject });
  };

  render() {
    if (this.state.total === 0 || this.state.error || this.state.isLoading) {
      return (
        <Fragment>
          <section className="container-fluid py-4">
            <div className="container">
              <SectionTitleViewMode
                icon="fa-folder-open"
                objectType="structures"
                language={this.props.language}
                id={this.props.match.params.id}
                total={this.state.total}
                title="Projects"
                viewModeClickHandler={this.viewModeClickHandler}
                viewMode={this.state.viewMode}
              />
              {
                (this.state.total === 0) ? <EmptySection language={this.props.language} /> : null
              }
              {
                (this.state.error) ? <p>Une erreur s&aposest produite.</p> : null
              }
              {
                (this.state.isLoading)
                  ? (
                    <div className="row justify-content-center py-5 my-5">
                      <GridLoader
                        color={styles.projectsColor}
                        loading={this.state.isLoading}
                      />
                    </div>
                  )
                  : null
              }
            </div>
          </section>
        </Fragment>
      );
    }

    const sliderDataWithTooltip = [];
    this.state.sliderData.forEach((entry) => {
      const newEntry = { ...entry };
      newEntry.tooltip = `${entry.count} projets - ${entry.value}`;
      sliderDataWithTooltip.push(newEntry);
    });
    const title = (this.props.language === 'fr') ? 'Projets' : 'Projects';

    return (
      <Fragment>
        <section className="container-fluid py-4">
          <div className="container">
            <SectionTitleViewMode
              icon="fa-folder-open"
              objectType="structures"
              language={this.props.language}
              id={this.props.match.params.id}
              total={this.state.total}
              title={title}
              viewModeClickHandler={this.viewModeClickHandler}
              viewMode={this.state.viewMode}
            />
            <FilterPanel
              language={this.props.language}
              totalPerType={this.state.totalPerType}
              selectedType={this.state.projectType}
              data={sliderDataWithTooltip}
              changeTypeHandler={this.changeTypeHandler}
              currentQueryText={this.state.currentQueryText}
              queryChangeHandler={this.queryChangeHandler}
              queryTextChangeHandler={this.queryTextChangeHandler}
              lowSliderYear={this.state.low}
              highSliderYear={this.state.high}
              handleSliderRange={this.handleSliderRange}
            />
            {
              (this.state.viewMode === 'list')
                ? (
                  <ProjectList
                    language={this.props.language}
                    data={this.state.data}
                    selectedProject={this.state.selectedProject}
                    setSelectedProjectHandler={this.setSelectedProjectHandler}
                  />
                )
                : (
                  <ProjectGraphs
                    language={this.props.language}
                    activeGraph={this.state.activeGraph}
                    setActiveGraphHandler={this.setActiveGraphHandler}
                    graphData={this.state.graphData}
                    data={this.state.data}
                    projectType={this.state.projectType}
                    totalPerType={this.state.totalPerType}
                  />
                )
            }
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Projects;

Projects.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  childs: PropTypes.array,
};
