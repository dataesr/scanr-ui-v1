import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { GridLoader } from 'react-spinners';

import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../../config/config';

import EmptySection from '../../../../Shared/Results/EmptySection/EmptySection';
import SectionTitleViewMode from '../../../Shared/SectionTitle';
import FilterPanel from './Components/FilterPanel';
import ProductionList from './Components/ProductionList';
import ProductionGraphs from './Components/ProductionGraphs';
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
class Productions extends Component {
  state = {
    productionType: 'publication',
    error: false,
    isLoading: true,
    total: 0,
    totalPerType: {
      patent: null,
      publication: null,
      thesis: null,
    },
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
    selectedProduction: '',
    sliderYear: {
      min: null,
      max: null,
    },
    sliderYearPrint: {
      min: null,
      max: null,
    },
    sliderBounds: {
      min: null,
      max: null,
    },
  }

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.childs !== this.props.childs) {
      this.fetchGlobalData();
    }
    if (prevState.sliderYear.min !== this.state.sliderYear.min || prevState.sliderYear.max !== this.state.sliderYear.max) {
      this.fetchDataByType();
    }
    if (prevState.total !== this.state.total) {
      this.fetchDataByType();
    }
    if (prevState.productionType !== this.state.productionType) {
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
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    let allIds = [this.props.match.params.id];
    if (this.props.childs.length > 0) {
      allIds = allIds.concat(this.props.childs).slice(0, 1000);
    }
    const preRequest = PreRequest;
    if (this.props.person) {
      preRequest.filters = {
        'authors.person.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: [this.props.match.params.id],
        },
        productionType: {
          type: 'MultiValueSearchFilter',
          op: 'any',
          values: ['publication', 'patent'],
        },
      };
    } else {
      preRequest.filters = {
        'affiliations.id': {
          type: 'MultiValueSearchFilter',
          op: 'any',
          values: allIds,
        },
      };
    }
    Axios.post(url, preRequest).then((response) => {
      let years = [2000, 2020];
      try {
        const years2 = response.data.facets.find(facet => facet.id === 'years').entries.map(a => parseInt(a.value, 10));
        if (years2.length > 0) {
          years = years2;
        }
      } catch (err) {
        this.setState({ error: true });
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
        sliderYearPrint: sliderBounds,
      });
    });
  }

  fetchDataByType = () => {
    this.setState({ isLoading: true });
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    const st = this.state.sliderYear.min ? this.state.sliderYear.min : 2000;
    const en = this.state.sliderYear.max ? this.state.sliderYear.max : 2020;
    const request = Request;
    request.query = this.state.query;
    request.filters.publicationDate.max = new Date(Date.UTC(en, 11, 31)).toISOString();
    request.filters.publicationDate.min = new Date(Date.UTC(st, 0, 1)).toISOString();
    request.filters.productionType.values = [this.state.productionType];
    let allIds = [this.props.match.params.id];
    if (this.props.childs.length > 0) {
      allIds = allIds.concat(this.props.childs).slice(0, 1000);
    }
    if (this.props.person) {
      request.filters['authors.person.id'] = {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: [this.props.match.params.id],
      };
    } else {
      request.filters['affiliations.id'] = {
        type: 'MultiValueSearchFilter',
        op: 'any',
        values: allIds,
      };
    }
    Axios.post(url, request).then((response) => {
      // eslint-disable-next-line
      let years2 = [2000, 2020]
      try {
        years2 = response.data.facets.find(facet => facet.id === 'years').entries.map(a => parseInt(a.value, 10));
      } catch (err) {
        this.setState({ error: true });
        // eslint-disable-next-line
        console.log(err);
      }
      const graphData = {};
      response.data.facets.forEach((facet) => {
        graphData[facet.id] = facet;
      });
      const data = response.data.results.sort((a, b) => (b.value.publicationDate - a.value.publicationDate));
      const selectedProduction = data.length > 0 ? data[0].value.id : '';
      this.setState({
        data,
        selectedProduction,
        graphData,
        isLoading: false,
      });
    });
  }

  changeTypeHandler = (e) => {
    e.preventDefault();
    this.setState({ productionType: e.target.value, activeGraph: null });
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
    this.setState({ sliderYearPrint: value });
  }

  sliderChangeCompleteHandler = (value) => {
    this.setState({ sliderYear: value });
  }

  // eslint-disable-next-line
  setSelectedProductionHandler = (selectedProduction) => {
    this.setState({ selectedProduction });
  };

  render() {
    if (this.state.total === 0) {
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
                title="Productions"
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
                icon="fa-folder-open"
                objectType="structures"
                language={this.props.language}
                id={this.props.match.params.id}
                total={this.state.total}
                title="Productions"
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
                icon="fa-folder-open"
                objectType="structures"
                language={this.props.language}
                id={this.props.match.params.id}
                total={this.state.total}
                title="Productions"
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
              icon="fa-folder-open"
              objectType="structures"
              language={this.props.language}
              id={this.props.match.params.id}
              total={this.state.total}
              title="Productions"
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
              sliderYearPrint={this.state.sliderYearPrint}
              sliderChangeHandler={this.sliderChangeHandler}
              sliderChangeCompleteHandler={this.sliderChangeCompleteHandler}
            />
            {
              (this.state.viewMode === 'list')
                ? (
                  <ProductionList
                    language={this.props.language}
                    data={this.state.data}
                    selectedProduction={this.state.selectedProduction}
                    setSelectedProductionHandler={this.setSelectedProductionHandler}
                  />
                )
                : (
                  <ProductionGraphs
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

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  childs: PropTypes.array.isRequired,
  person: PropTypes.bool,
};
