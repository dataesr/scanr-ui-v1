import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import classes from './Search.scss';

import SearchPanel from './SearchPanel/SearchPanel';
import SearchResults from './SearchResults/SearchResults';
import AllResults from './SearchResults/AllResults';
import FilterPanel from './Filters/Filters';
import SearchObjectTab from './SearchObjectTab/SearchObjectTab';


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
      request: {
        searchFields: null,
        query: '',
        sort: null,
        page: null,
        pageSize: null,
        filters: null,
        aggregations: null,
      },
      data: {
        results: [],
        facets: [],
        total: 0,
        graphs: [],
      },
      preview: {
        structures: {
          count: 0,
          data: [],
          facets: [],
        },
        projects: {
          count: 0,
          data: [],
          facets: [],
        },
        persons: {
          count: 0,
          data: [],
          facets: [],
        },
        publications: {
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
    this.getCounts(newState);
    // this.getData(newState);
    window.scrollTo(0, 0);
  }

  // componentWillUpdate(nextProps, nextState) {
  //   if (nextState.request !== this.state.request) {
  //     return false;
  //   }
  //   return true;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location || (this.state.data.total === 0)) {
      this.setState({
        isLoading: true,
        data: {},
      });
      const newState = this.getParams();
      // Need to avaid getCount each change
      if (prevState.request.query !== newState.request.query) {
        this.getCounts(newState);
        this.getData(newState);
      } else {
        this.getData(newState);
      }
      window.scrollTo(0, 0);
    }
  }

  // *******************************************************************
  // MAINTAINING URL AND STATE CONSISTANT WITH getParams and setURL
  // *******************************************************************
  getParams() {
    // recup params dans url
    const api = this.props.match.params.api;
    const parsedURL = queryString.parse(this.props.location.search);
    const view = parsedURL.view || 'list';
    const query = parsedURL.query || '';
    const currentQueryText = query;
    const pageSize = parsedURL.pageSize;
    const page = parsedURL.page;
    const filters = (parsedURL.filters) ? JSON.parse(parsedURL.filters) : parsedURL.filters;
    const aggregations = (parsedURL.aggregations) ? JSON.parse(parsedURL.aggregations) : parsedURL.aggregations;
    const sort = (parsedURL.sort) ? JSON.parse(parsedURL.sort) : parsedURL.sort;
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
        aggregations,
      },
    };
    this.setState(newState);
    return newState;
  }

  setURL(request) {
    if (request.filters) {
      request.filters = JSON.stringify(request.filters);
    }
    if (request.sort) {
      request.sort = JSON.stringify(request.sort);
    }
    if (request.aggregations) {
      request.aggregations = JSON.stringify(request.aggregations);
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
    } else {
      newRequest.filters = (newRequest.filters) ? newRequest.filters : {};
      newRequest.filters[key] = {
        type: 'MultiValueSearchFilter',
        op,
        values: [value],
      };
    }
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  deleteMultiValueSearchFilter = (key, value) => {
    const newRequest = { ...this.state.request };
    newRequest.filters[key].values = newRequest.filters[key].values.filter(item => (
      item !== value
    ));
    if (newRequest.filters[key].values.length === 0) {
      delete newRequest.filters[key];
    }
    if (Object.entries(newRequest.filters).length === 0) {
      delete newRequest.filters;
    }
    const url = this.setURL(newRequest);
    this.props.history.push(url);
  }

  // RANGE FILTERS

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
    } else {
      req.lang = this.props.language;
    }
    Object.keys(req).forEach(key => (req[key] === undefined ? delete req[key] : ''));
    return req;
  };


  getData = (newState) => {
    if (newState.api === 'all') {
      const data = {};
      this.setState({
        data,
        isLoading: false,
      });
      return;
    }
    const url = `https://scanr-preprod.sword-group.com/api/v2/${newState.api}/search`;
    Axios.post(url, this.transformRequest(newState.request, newState.api))
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
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  getCounts = (newState) => {
    const query = { query: newState.request.query };
    const apis = ['structures', 'persons', 'publications', 'projects'];
    apis.forEach((api) => {
      const url = `https://scanr-preprod.sword-group.com/api/v2/${api}/search`;
      Axios.post(url, this.transformRequest(query, api))
        .then((response) => {
          /* eslint-disable-next-line */
          const newCounts = { ...this.state.preview };
          newCounts[api].count = response.data.total;
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
                filters={this.state.request.filters || {}}
                api={this.state.api}
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
        isLoading={this.state.isLoading}
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

  // *******************************************************************
  // RENDER METHOD
  // *******************************************************************
  render() {
    const bgColor = `has-background-${this.state.api}`;
    return (
      <div className="d-flex flex-column h-100">
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <SearchPanel
          language={this.props.language}
          isHome={false}
          api={this.state.api}
          currentQueryText={this.state.currentQueryText}
          queryTextChangeHandler={this.queryTextChangeHandler}
          apiChangeHandler={this.apiChangeHandler}
          submitResearch={this.submitResearch}
        />
        <section className={`flex-grow-1 ${classes[bgColor]}`}>
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
