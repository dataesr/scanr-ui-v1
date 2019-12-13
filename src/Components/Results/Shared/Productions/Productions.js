import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { GridLoader } from 'react-spinners';

import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../../config/config';

import styles from '../../../../style.scss';

import EmptySection from '../EmptySection/EmptySection';
import SectionTitleViewMode from '../SectionTitle';
import FilterPanel from './Components/FilterPanel';
import ProductionList from './Components/ProductionList';
import ProductionGraphs from './Components/ProductionGraphs';
import Request from './Requests/Request';
import PreRequest from './Requests/PreRequest';
import DateRequest from './Requests/DateRequest';
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
    sliderData: [],
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
    high: null,
    low: null,
  }

  componentDidMount() {
    console.log('fre', this.props.childs);
    this.fetchGlobalData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.childs.length !== this.props.childs.length) {
      this.fetchGlobalData();
    }
    if (prevState.low !== this.state.low || prevState.high !== this.state.high) {
      this.fetchDataByType();
    }
    if (prevState.total !== this.state.total) {
      this.fetchDataByType();
    }
    if (prevState.productionType !== this.state.productionType) {
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
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    let allIds = [this.props.match.params.id];
    if (this.props.childs.length > 0) {
      const childs = this.props.childs.map(child => child.value.id).slice(0, 4095);
      allIds = allIds.concat(childs);
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
      const totalPerType = {};
      response.data.facets.find(facet => facet.id === 'types').entries.forEach((type) => {
        totalPerType[type.value] = type.count;
      });
      let productionType = 'publication';
      if (!totalPerType.publication) {
        productionType = Object.keys(totalPerType)[0];
      }

      const viewMode = response.data.total > 10 ? 'graph' : 'list';
      this.setState({
        total: response.data.total,
        totalPerType,
        productionType,
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
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    const request = Request;
    const dateRequest = DateRequest;
    request.query = this.state.query;
    dateRequest.query = this.state.query;
    request.filters.productionType.values = [this.state.productionType];
    dateRequest.filters.productionType.values = [this.state.productionType];
    request.filters.year.min = this.state.low ? this.state.low : 2000;
    request.filters.year.max = this.state.high ? (this.state.high + 1) : 2020;
    let allIds = [this.props.match.params.id];
    if (this.props.childs.length > 0) {
      const childs = this.props.childs.map(child => child.value.id).slice(0, 4095);
      allIds = allIds.concat(childs);
    }
    if (this.props.person) {
      request.filters['authors.person.id'] = {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: [this.props.match.params.id],
      };
      dateRequest.filters['authors.person.id'] = {
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
      dateRequest.filters['affiliations.id'] = {
        type: 'MultiValueSearchFilter',
        op: 'any',
        values: allIds,
      };
    }
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
    this.setState({
      productionType: e.target.value,
      activeGraph: null,
      low: null,
      high: null,
    });
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

  setSelectedProductionHandler = (selectedProduction) => {
    this.setState({ selectedProduction });
  };

  handleSliderRange = (low, high) => {
    this.setState({
      high: Math.max(low, high),
      low: Math.min(low, high),
    });
  }

  render() {
    if (this.state.total === 0 || this.state.error || this.state.isLoading) {
      return (
        <Fragment>
          <section className="container-fluid py-4">
            <div className="container">
              <SectionTitleViewMode
                icon="fa-folder-open"
                objectType="publications"
                language={this.props.language}
                id={this.props.match.params.id}
                total={this.state.total}
                title="Productions"
                lexicon="Productions"
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
                objectType="publications"
                language={this.props.language}
                id={this.props.match.params.id}
                total={this.state.total}
                title="Productions"
                lexicon="Productions"
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
                objectType="publications"
                language={this.props.language}
                id={this.props.match.params.id}
                total={this.state.total}
                title="Productions"
                lexicon="Productions"
                viewModeClickHandler={this.viewModeClickHandler}
                viewMode={this.state.viewMode}
              />
              <FilterPanel
                language={this.props.language}
                data={{}}
                totalPerType={this.state.totalPerType}
                selectedType={this.state.productionType}
                changeTypeHandler={this.changeTypeHandler}
                currentQueryText={this.state.currentQueryText}
                queryChangeHandler={this.queryChangeHandler}
                queryTextChangeHandler={this.queryTextChangeHandler}
                lowSliderYear={this.state.low}
                highSliderYear={this.state.high}
                handleSliderRange={this.handleSliderRange}
              />
              <div className="row justify-content-center py-5 my-5">
                <GridLoader
                  color={styles.publicationsColor}
                  loading={this.state.isLoading}
                />
              </div>
            </div>
          </section>
        </Fragment>
      );
    }

    // set tooltip for slider
    const sliderDataWithTooltip = [];
    this.state.sliderData.forEach((entry) => {
      const newEntry = { ...entry };
      newEntry.tooltip = `${entry.count} ${this.state.productionType} - ${entry.value}`;
      sliderDataWithTooltip.push(newEntry);
    });
    return (
      <Fragment>
        <section className="container-fluid py-4">
          <div className="container">
            <SectionTitleViewMode
              icon="fa-folder-open"
              objectType="publications"
              language={this.props.language}
              id={this.props.match.params.id}
              total={this.state.total}
              title="Productions"
              lexicon="Productions"
              viewModeClickHandler={this.viewModeClickHandler}
              viewMode={this.state.viewMode}
            />
            <FilterPanel
              language={this.props.language}
              data={sliderDataWithTooltip}
              totalPerType={this.state.totalPerType}
              selectedType={this.state.productionType}
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
