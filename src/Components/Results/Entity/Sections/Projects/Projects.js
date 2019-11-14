import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { GridLoader } from 'react-spinners';


import { API_PROJECTS_SEARCH_END_POINT } from '../../../../../config/config';

import EmptySection from '../../../../Shared/Results/EmptySection/EmptySection';
import SectionTitleViewMode from './Components/SectionTitleViewMode';
import FilterPanel from './Components/FilterPanel';
import ProjectList from './Components/ProjectList';
import ProjectGraphs from './Components/ProjectGraphs';
import Request from './Requests/Request';
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
    total: 0,
    totalPerType: {},
    query: '',
    currentQueryText: '',
    graphData: {},
    activeGraph: null,
    viewMode: 'list',
    data: [],
    selectedProject: '',
    sliderYear: {
      min: null,
      max: null,
    },
    sliderBounds: {
      min: null,
      max: null,
    },
    modifyMode: false,
  }

  componentDidMount() {
    this.fetchGlobalData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sliderYear.min !== this.state.sliderYear.min || prevState.sliderYear.max !== this.state.sliderYear.max) {
      this.fetchDataByType();
    }
    if (prevState.total !== this.state.total) {
      this.fetchDataByType();
    }
    if (prevState.projectType !== this.state.projectType) {
      this.fetchDataByType();
    }
    if (prevState.query !== this.state.query) {
      const sliderYear = {
        min: 2000,
        max: 2020,
      };
      this.setState({ sliderYear });
      this.fetchDataByType();
    }
  }

  createGraphData = () => {
    const relations = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      const currentProject = this.state.data[i].value;
      const type = currentProject.type;
      const year = (currentProject.year) ? (currentProject.year.toString()) : 'NODATA#';

      const duration = (currentProject.duration) ? (currentProject.duration) : 0;
      let durationKey = 'NODATA#';
      if (duration <= 6) {
        durationKey = '0-6 mois';
      }
      if (duration > 6 && duration <= 12) {
        durationKey = '7-12 mois';
      }
      if (duration > 12 && duration <= 24) {
        durationKey = '13-24 mois';
      }
      if (duration > 24 && duration <= 36) {
        durationKey = '25-36 mois';
      }
      if (duration > 36 && duration <= 48) {
        durationKey = '37-48 mois';
      }
      if (duration > 48) {
        durationKey = '48+ mois';
      }

      const nbParticipants = (currentProject.participants) ? (currentProject.participants.length) : 0;
      let participantKey = 'NODATA#';
      if (nbParticipants > 0 && nbParticipants <= 1) {
        participantKey = '1 participant';
      }
      if (nbParticipants > 2 && nbParticipants <= 5) {
        participantKey = '2-5 participants';
      }
      if (nbParticipants > 5 && nbParticipants <= 10) {
        participantKey = '6-10 participants';
      }
      if (nbParticipants > 10) {
        participantKey = '11+ participants';
      }


      const key1 = type.concat(';', year);
      const key2 = year.concat(';', durationKey);
      const key3 = durationKey.concat(';', participantKey);
      const keys = [key1, key2, key3];
      for (let j = 0; j < keys.length; j += 1) {
        if (keys[j].indexOf('NODATA#') === -1) {
          if (!(keys[j] in relations)) {
            relations[keys[j]] = 0;
          }
          relations[keys[j]] += 1;
        }
      }
    }
    const sankeyData = [];
    const keys = Object.keys(relations);
    for (let i = 0; i < keys.length; i += 1) {
      const from = keys[i].split(';')[0];
      const to = keys[i].split(';')[1];
      const weight = relations[keys[i]];
      sankeyData.push([from, to, weight]);
    }
    this.setState({ sankeyData });
  }


  fetchGlobalData = () => {
    const url = API_PROJECTS_SEARCH_END_POINT;
    const preRequest = PreRequest;
    preRequest.filters['participants.structure.id'].values = [this.props.match.params.id];
    Axios.post(url, preRequest).then((response) => {
      let years = [2000, 2020];
      try {
        const years2 = response.data.facets.find(facet => facet.id === 'years').entries.map(a => parseInt(a.value, 10));
        if (years2.length > 0) {
          years = years2;
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
      const totalPerType = {};
      // const MaxProduction = '';
      response.data.facets.find(facet => facet.id === 'types').entries.forEach((type) => {
        totalPerType[type.value] = type.count;
      });
      const sliderBounds = {
        min: Math.min(...years),
        max: Math.max(...years),
      };
      const viewMode = response.data.total > 10 ? 'graph' : 'list';
      this.setState({
        total: response.data.total,
        totalPerType,
        viewMode,
        sliderBounds,
        sliderYear: sliderBounds,
      });
    });
  }

  fetchDataByType = () => {
    this.setState({ isLoading: true });
    const url = API_PROJECTS_SEARCH_END_POINT;
    const st = this.state.sliderYear.min ? this.state.sliderYear.min : 2000;
    const en = this.state.sliderYear.max ? this.state.sliderYear.max : 2020;
    const request = Request;
    request.query = this.state.query;
    request.filters.startDate.max = new Date(Date.UTC(en, 11, 31)).toISOString();
    request.filters.startDate.min = new Date(Date.UTC(st, 0, 1)).toISOString();
    Request.filters['participants.structure.id'].values = [this.props.match.params.id];
    if (this.state.projectType !== 'all') {
      request.filters.type = {
        type: 'MultiValueSearchFilter',
        op: 'any',
        values: [this.state.projectType],
      };
    }
    Axios.post(url, request).then((response) => {
      // eslint-disable-next-line
      let years2 = [2000, 2020]
      try {
        years2 = response.data.facets.find(facet => facet.id === 'years').entries.map(a => parseInt(a.value, 10));
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
      const graphData = {};
      response.data.facets.forEach((facet) => {
        graphData[facet.id] = facet;
      });
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

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
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

  sliderChangeHandler = (value) => {
    this.setState({ sliderYear: value });
  }

  // eslint-disable-next-line
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
                total={this.state.total}
                label="Projects"
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
                        color="#cc3d8f"
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

    return (
      <Fragment>
        <section className="container-fluid py-4">
          <div className="container">
            <SectionTitleViewMode
              language={this.props.language}
              total={this.state.total}
              label="Projects"
              viewModeClickHandler={this.viewModeClickHandler}
              viewMode={this.state.viewMode}
            />
            <FilterPanel
              language={this.props.language}
              totalPerType={this.state.totalPerType}
              selectedType={this.state.productionType}
              changeTypeHandler={this.changeTypeHandler}
              currentQueryText={this.state.currentQueryText}
              queryChangeHandler={this.queryChangeHandler}
              queryTextChangeHandler={this.queryTextChangeHandler}
              sliderBounds={this.state.sliderBounds}
              sliderYear={this.state.sliderYear}
              sliderChangeHandler={this.sliderChangeHandler}
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
                    sankeyData={this.state.sankeyData}
                    productionType={this.state.productionType}
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
};
