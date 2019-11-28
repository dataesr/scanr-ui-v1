import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import ReactPiwik from 'react-piwik';

import classes from './Search.scss';
import { API_BASE_URL } from '../../config/config';

import SearchPanel from './SearchPanel/SearchPanel';
import SearchResults from './SearchResults/SearchResults';
import AllResults from './SearchResults/AllResults';
import FilterPanel from './Filters/Filters';
import SearchObjectTab from './SearchObjectTab/SearchObjectTab';
import {
  PersonsAggregations,
  PublicationsAggregations,
  StructuresAggregations,
  ProjectsAggregations,
} from './Aggregations';

import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
import Banner from '../Shared/Banner/Banner';


class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentQueryText: '',
      api: 'all',
      view: 'list',
      sliderData: [],
      request: {
        searchFields: null,
        query: '',
        sort: null,
        page: null,
        pageSize: null,
        filters: null,
      },
      data: {
        results: [],
        facets: [],
        total: 0,
        graphs: [],
      },
      preview: {
        structures: {
          isLoading: true,
          count: 0,
          data: [],
          facets: [],
        },
        projects: {
          isLoading: true,
          count: 0,
          data: [],
          facets: [],
        },
        persons: {
          isLoading: true,
          count: 0,
          data: [],
          facets: [],
        },
        publications: {
          isLoading: true,
          count: 0,
          data: [],
          facets: [],
        },
        all: 0,
      },
    };
  }

  // *******************************************************************
  // REACT LIFECIRCLE HANDLERS
  // *******************************************************************
  componentDidMount() {
    const newState = this.getParams();
    this.setState(newState);
    const category = this.props.location.pathname.split('/')[2];
    if (category === 'all') {
      this.sendTracking(newState.request);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      const newState = this.getParams();
      this.setState(newState);
      const category = this.props.location.pathname.split('/')[2];
      if (category === 'all') {
        this.sendTracking(this.state.request);
      }
    } else if (prevState.request !== this.state.request || (this.state.data.total === 0)) {
      this.setState({
        isLoading: true,
        data: { results: [] },
      });
      // Need to avaid getCount each change
      if (this.state.preview.all === 0 || prevState.request.query !== this.state.request.query) {
        this.getCounts();
        this.getData();
      } else {
        this.getData();
      }
    }
  }

  // *******************************************************************
  // MAINTAINING URL AND STATE CONSISTANT WITH getParams and setURL
  // *******************************************************************
  getParams() {
    // recup params dans url
    const parsedURL = queryString.parse(this.props.location.search);
    const filters = (parsedURL.filters) ? JSON.parse(parsedURL.filters) : null;
    const api = this.props.match.params.api;
    const view = parsedURL.view || 'list';
    const query = parsedURL.query || '';
    const currentQueryText = query;
    const pageSize = parsedURL.pageSize;
    const page = parsedURL.page;
    const sort = (parsedURL.sort) ? JSON.parse(parsedURL.sort) : null;
    const newState = {
      api,
      currentQueryText,
      view,
      request: {
        query,
        sort,
        page,
        pageSize,
        filters,
      },
      data: { results: [] },
    };
    return newState;
  }

  setURL(request) {
    if (request.filters) {
      request.filters = JSON.stringify(request.filters);
    }
    if (request.sort) {
      request.sort = JSON.stringify(request.sort);
    }
    if (!request.view) {
      request.view = this.state.view;
    }
    const url = `${this.props.location.pathname}?${queryString.stringify(request)}`;
    return url;
  }

  // *******************************************************************
  // HANDLE CHANGE ON USER ACTIONS
  // *******************************************************************
  queryTextChangeHandler = (e) => {
    this.setState({ currentQueryText: e.target.value });
  }

  apiChangeHandler = (e) => {
    if (typeof e === 'object') {
      e.preventDefault();
    }
    const newObject = (typeof e === 'object') ? e.target.value.toLowerCase() : e;
    const params = `query=${this.state.request.query}`;
    this.props.history.push(`/recherche/${newObject}?${params}`);
  }

  viewChangeHandler = (newView) => {
    const newRequest = { ...this.state.request };
    newRequest.view = newView;
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  submitResearch = (e) => {
    e.preventDefault();
    const newRequest = { query: this.state.currentQueryText };
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  paginationHandler = (value) => {
    const newRequest = { ...this.state.request };
    newRequest.page = value;
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  // *******************************************************************
  // HANDLE FILTERS ACTIONS
  // *******************************************************************

  // MULTI VALUE FILTERS
  multiValueFilterHandler = (key, value, push = true, op = 'all') => {
    const newRequest = { ...this.state.request };
    if (newRequest.filters && newRequest.filters[key] && push) {
      if (!newRequest.filters[key].values.includes(value)) {
        newRequest.filters[key].values.push(value);
      } else {
        this.deleteMultiValueSearchFilter(key, value);
      }
    } else if (value) {
      newRequest.filters = (newRequest.filters) ? newRequest.filters : {};
      newRequest.filters[key] = {
        type: 'MultiValueSearchFilter',
        op,
        values: [value],
      };
    } else {
      this.deleteMultiValueSearchFilter(key, value);
    }

    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  deleteMultiValueSearchFilter = (key, value) => {
    const newRequest = { ...this.state.request };
    newRequest.filters[key].values = newRequest.filters[key].values.filter(item => (
      item !== value
    ));
    if (newRequest.filters[key].values.length === 0 || !value) {
      delete newRequest.filters[key];
    }
    if (Object.entries(newRequest.filters).length === 0) {
      delete newRequest.filters;
    }
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  // RANGE FILTER
  rangeFilterHandler = (min, max, missing = false) => {
    const newRequest = { ...this.state.request };
    newRequest.filters = (newRequest.filters) ? newRequest.filters : {};
    newRequest.filters.year = {
      type: 'LongRangeFilter',
      max: parseInt(max, 10) + 1,
      min,
      missing,
    };
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  // FILTERS ACTIONS
  deleteFilter = (key) => {
    const newRequest = { ...this.state.request };
    delete newRequest.filters[key];
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  deleteAllFilters = () => {
    const newRequest = { ...this.state.request };
    delete newRequest.filters;
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  // *******************************************************************
  // AXIOS CALL TO GET DATA
  // *******************************************************************
  transformRequest = (requests, api) => {
    const req = { ...requests };
    if (!req.query) {
      req.query = '';
    }
    if (req.page) {
      req.page -= 1;
    }
    if (req.pageSize && req.pageSize < 10) {
      req.pageSize = 10;
    }
    if (api === 'publications') {
      req.lang = 'default';
      req.aggregations = PublicationsAggregations;
    } else if (api === 'structures') {
      req.aggregations = StructuresAggregations;
      req.lang = this.props.language;
    } else if (api === 'persons') {
      req.aggregations = PersonsAggregations;
      req.lang = this.props.language;
    } else if (api === 'projects') {
      req.aggregations = ProjectsAggregations;
      req.lang = this.props.language;
    } else {
      req.lang = this.props.language;
    }
    Object.keys(req).forEach(key => (req[key] === undefined ? delete req[key] : ''));
    return req;
  };

  getData = () => {
    if (this.state.api === 'all') {
      const data = {};
      this.setState({
        data,
        isLoading: false,
      });
      return;
    }
    const url = `${API_BASE_URL}/${this.state.api}/search`;
    const apiWithDateFilters = ['projects', 'publications'];
    if (apiWithDateFilters.includes(this.state.api)) {
      const dateRequest = {};
      const newFilters = {};
      const stateFilters = { ...this.state.request.filters };
      Object.keys(stateFilters).forEach((key) => {
        if (key !== 'year') {
          newFilters[key] = stateFilters[key];
        }
      });
      dateRequest.pageSize = 0;
      dateRequest.query = this.state.request.query || '';
      dateRequest.filters = newFilters;
      dateRequest.aggregations = {
        years: {
          field: 'year',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 100,
        },
      };
      Axios.post(url, dateRequest, this.state.api)
        .then((response) => {
          const sliderData = response.data.facets.find(facet => facet.id === 'years').entries;
          this.setState({ sliderData });
        })
        .catch((error) => {
          /* eslint-disable-next-line */
          console.log(error);
        });
    }
    Axios.post(url, this.transformRequest(this.state.request, this.state.api))
      .then((response) => {
        const data = {
          results: response.data.results,
          facets: response.data.facets,
          total: response.data.total,
        };
        this.setState({
          data,
          isLoading: false,
        });
        this.sendTracking(this.state.request);
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  getCounts = () => {
    const query = { query: this.state.request.query };
    const apis = ['structures', 'persons', 'publications', 'projects'];
    apis.forEach((api) => {
      const url = `${API_BASE_URL}/${api}/search`;
      Axios.post(url, this.transformRequest(query, api))
        .then((response) => {
          /* eslint-disable-next-line */
          const newCounts = { ...this.state.preview };
          newCounts[api].isLoading = false;
          newCounts[api].count = response.data.total;
          newCounts[api].facets = response.data.facets;
          newCounts[api].data = response.data.results.slice(0, 6);
          newCounts.all = (
            newCounts.structures.count
            + newCounts.persons.count
            + newCounts.projects.count
            + newCounts.publications.count
          );
          this.setState({ preview: newCounts });
        })
        .catch((e) => {
          /* eslint-disable-next-line */
          console.log('error', e);
        });
    });
  }

  // *******************************************************************
  // RENDER HELPERS
  // *******************************************************************
  WhichResults = () => {
    if (this.state.api !== 'all') {
      return (
        <div className="container">
          <div className="row d-flex flex-wrap justify-content-between">
            <div className={classes.filters}>
              <FilterPanel
                language={this.props.language}
                facets={this.state.data.facets}
                generalFacets={this.state.preview[this.state.api].facets}
                multiValueFilterHandler={this.multiValueFilterHandler}
                rangeFilterHandler={this.rangeFilterHandler}
                filters={this.state.request.filters || {}}
                api={this.state.api}
                sliderData={this.state.sliderData}
              />
            </div>
            <div className={classes.results}>
              <SearchResults
                {...this.props}
                language={this.props.language}
                data={this.state.data}
                request={this.state.request}
                view={this.state.view}
                api={this.state.api}
                isLoading={this.state.isLoading}
                paginationHandler={this.paginationHandler}
                preview={this.state.preview}
              />
            </div>
          </div>
        </div>
      );
    }
    return (
      <AllResults
        language={this.props.language}
        request={this.state.request}
        api={this.state.api}
        preview={this.state.preview}
        apiChangeHandler={this.apiChangeHandler}
      />
    );
  }

  WhichBanner = () => {
    if (this.state.api !== 'all') {
      return (
        <Banner
          cssClass="deep"
          url="..."
          language={this.props.language}
          labelKey="WhatAreOurSources"
        />
      );
    }
    return (
      <Banner
        cssClass="deep"
        url="..."
        language={this.props.language}
        labelKey="Appear"
      />
    );
  }

  sendTracking = (request) => {
    ReactPiwik.push(['setCustomUrl', this.props.match.url]);
    const category = this.props.location.pathname.split('/')[2];
    const query = request.query;
    let nbResults = this.state.data.total;
    if (category === 'all') {
      nbResults = this.state.preview.all;
    }
    ReactPiwik.push(['setCustomUrl', this.props.match.url]);
    if (request.filters) {
      const currentFilters = request.filters;
      const filters = [];
      Object.keys(currentFilters).forEach((f) => {
        let filterValue = '';
        if (currentFilters[f].values) {
          filterValue = currentFilters[f].values.join(';');
        } else if (currentFilters[f].min && currentFilters[f].max) {
          filterValue = ((currentFilters[f].min).toString()).concat('_TO_', (currentFilters[f].max).toString());
        }
        const filter = f.concat('__VAL__', filterValue);
        filters.push(filter);
      });
      ReactPiwik.push(['setCustomVariable', 1, 'SearchFilter', filters.join('__FILTERS__'), 'page']);
      ReactPiwik.push(['trackPageView']);
    }
    ReactPiwik.push(['trackSiteSearch', query, category, nbResults]);
  }

  // *******************************************************************
  // RENDER METHOD
  // *******************************************************************
  render() {
    return (
      <div className="d-flex flex-column h-100">
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <SearchPanel
          language={this.props.language}
          api={this.state.api}
          currentQueryText={this.state.currentQueryText}
          queryTextChangeHandler={this.queryTextChangeHandler}
          apiChangeHandler={this.apiChangeHandler}
          submitResearch={this.submitResearch}
        />
        <section className={`flex-grow-1 ${classes.Search}`}>
          <SearchObjectTab
            language={this.props.language}
            api={this.state.api}
            apiChangeHandler={this.apiChangeHandler}
            view={this.state.view}
            viewChangeHandler={this.viewChangeHandler}
            preview={this.state.preview}
          />
          {this.WhichResults()}
        </section>
        {this.WhichBanner()}
        <Footer language={this.props.language} />
      </div>
    );
  }
}

export default SearchPage;

SearchPage.propTypes = {
  language: PropTypes.string.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  switchLanguage: PropTypes.func.isRequired,
};
