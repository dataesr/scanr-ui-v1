import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string'
import { GridLoader } from 'react-spinners';

import classes from './Search-page.scss';

import SearchPanel from './SearchPanel/SearchPanel';
import SearchResults from './SearchResults/SearchResults';
import FilterPanel from './FilterPanel/FilterPanel';
import SearchObjectTab from './SearchObjectTab/SearchObjectTab';
import Pagination from './Pagination/Pagination';


import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';


class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentQueryText: '',
      api: 'all',
      view: 'list',
      request: {
        lang: this.props.language,
        sourceFields: ['id', 'label', 'nature', 'address'],
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
      },
      preview: {
        structures: {
          count: 0,
          data: [],
        },
        projects: {
          count: 0,
          data: [],
        },
        persons: {
          count: 0,
          data: [],
        },
        publications: {
          count: 0,
          data: [],
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
    this.getData(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        isLoading: true,
        data: {},
      });
      const newState = this.getParams();
      // Need to avaid getCount each change
      // if (prevState.request.query !== this.state.request.query) {
      // }
      this.getCounts(newState);
      this.getData(newState);
    }
  }

  // *******************************************************************
  // MAINTAINING URL AND STATE CONSISTANT WITH getParams and setParams
  // *******************************************************************
  getParams() {
    // recup params dans url
    const api = this.props.match.params.api;
    const parsedURL = queryString.parse(this.props.location.search)
    const view = parsedURL.view || 'list';
    const query = parsedURL.query || '';
    const currentQueryText = query;
    const pageSize = parsedURL.pageSize;
    const page = parsedURL.page;
    const filters = (parsedURL.filters) ? JSON.parse(parsedURL.filters) : null;
    const aggregations = (parsedURL.aggregations) ? JSON.parse(parsedURL.aggregations) : null;
    const sort = (parsedURL.sort) ? JSON.parse(parsedURL.sort) : null;
    const newState = {
      api,
      currentQueryText,
      view,
      request: {
        // searchFields: null, not in use now
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

  setParams(key, value, isFilter = false, isAggregation = false) {
    const temp = { ...this.state.request };
    if (isFilter) {
      temp.filters = (temp.filters) ? temp.filters : {};
      temp.filters[key] = value;
      temp.filters = JSON.stringify(temp.filters);
      const url = queryString.stringify(temp);
      return url;
    }
    if (isAggregation) {
      temp.aggregations[key] = value;
      const url = queryString.stringify(temp);
      return url;
    }
    if (temp.filters) {
      temp.filters = JSON.stringify(temp.filters);
    }
    if (temp.sort) {
      temp.sort = JSON.stringify(temp.sort);
    }
    if (temp.aggregations) {
      temp.aggregations = JSON.stringify(temp.aggregations);
    }
    temp[key] = value;
    const url = queryString.stringify(temp);
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
    const url = this.setParams('view', newView);
    this.props.history.push(`${this.props.location.pathname}?${url}`);
  }

  filterChangeHandler = (e) => {
    // console.log(e.target.id, e.target.value);
    console.log('id', e.target.id);
    console.log('value', e.target.value);
    const news = {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: [e.target.value],
    };
    const url = this.setParams(e.target.id, news, true, false);
    this.props.history.push(`${this.props.location.pathname}?${url}`);
  }

  submitResearch = (e) => {
    e.preventDefault();
    const nextParams = `query=${this.state.currentQueryText}`;
    this.props.history.push(`${this.props.location.pathname}?${nextParams}`);
  }

  paginationHandler = (value) => {
    const nextUrl = this.setParams('page', value);
    this.props.history.push(`${this.props.location.pathname}?${nextUrl}`);
  }


  // *******************************************************************
  // AXIOS CALL TO GET DATA
  // *******************************************************************
  transformRequest = (requests) => {
    const req = { ...requests };
    if (!req.query) {
      req.query = '';
    }
    if (requests.page) {
      req.page -= 1;
    }
    if (req.pageSize && req.pageSize < 10) {
      req.pageSize = 10;
    }
    return req;
  };


  getData = (newState) => {
    if (newState.api === 'all') {
      const data = {};
      this.setState({
        data,
        isLoading: false,
      });
    }
    const url = `https://scanr-preprod.sword-group.com/api/v2/${newState.api}/search`;
    Axios.post(url, this.transformRequest(newState.request))
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
        console.log(error);
      });
  }

  getCounts = (newState) => {
    const query = { query: newState.request.query };
    const apis = ['structures', 'persons', 'publications', 'projects'];
    apis.forEach((api) => {
      const url = `https://scanr-preprod.sword-group.com/api/v2/${api}/search`;
      Axios.post(url, query)
        .then((response) => {
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
        });
    });
  }

  // *******************************************************************
  // HELPERS FOR PAGE RENDERING
  // *******************************************************************
  ShouldRenderPagination = () => {
    if (this.state.view === 'list' && this.state.api !== 'all' && this.state.data.total) {
      return (
        <div className="col-md-8 ml-md-auto">
          <Pagination
            {...this.props}
            language={this.props.language}
            data={this.state.data}
            paginationHandler={this.paginationHandler}
            currentPage={parseInt(this.state.request.page, 0)}
            currentPageSize={parseInt(this.state.request.pageSize, 0)}
            totalDocuments={parseInt(this.state.data.total, 0)}
          />
        </div>
      );
    }
    return null;
  }

  ShouldRenderResults = () => {
    if (!this.state.isLoading && this.state.api !== 'all') {
      return (
        <div className="row">
          <div className="col-md-4">
            <FilterPanel
              language={this.props.language}
              facets={this.state.data.facets}
              filterChangeHandler={this.filterChangeHandler}
              filters={this.state.request.filters}
            />
          </div>
          <div className="col-md-8">
            <SearchResults
              {...this.props}
              language={this.props.language}
              data={this.state.data}
              view={this.state.view}
              api={this.state.api}
            />
          </div>
          {this.ShouldRenderPagination()}
        </div>
      );
    }
    if (!this.state.isLoading && this.state.api === 'all') {
      return (
        <div className="row">
          <div className="col-md-12">
            blah blah blah
          </div>
        </div>
      );
    }
    const scanRcolor = '#3778bb';
    return (
      <div className="row justify-content-center">
        <GridLoader
          color={scanRcolor}
          loading={this.state.isLoading}
        />
      </div>
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
          <div className="container">
            {this.ShouldRenderResults()}
          </div>
        </section>
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
