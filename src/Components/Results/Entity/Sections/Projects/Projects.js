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
    if (this.state.total === 0) {
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
              <EmptySection language={this.props.language} />
            </div>
          </section>
        </Fragment>
      );
    }
    if (this.state.error) {
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
              <p>Une erreur s&aposest produite.</p>
            </div>
          </section>
        </Fragment>
      );
    }
    if (this.state.isLoading) {
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
              <div className="row justify-content-center py-5 my-5">
                <GridLoader
                  color="#cc3d8f"
                  loading={this.state.isLoading}
                />
              </div>
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

// {
//   (this.state.viewMode === 'list')
//     ? (
//       <ProjectList
//         language={this.props.language}
//         data={this.state.data}
//         selectedProject={this.state.selectedProject}
//         setSelectedProductionHandler={this.setSelectedProductionHandler}
//       />
//     )
//     : (
//       <ProjectGraphs
//         language={this.props.language}
//         activeGraph={this.state.activeGraph}
//         setActiveGraphHandler={this.setActiveGraphHandler}
//         graphData={this.state.graphData}
//         productionType={this.state.productionType}
//         totalPerType={this.state.totalPerType}
//       />
//     )
// }
