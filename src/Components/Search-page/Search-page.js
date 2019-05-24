import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import queryString from 'query-string'

import classes from './Search-page.scss';

import SearchPanel from './SearchPanel/SearchPanel';
import SearchResults from './SearchResults/SearchResults';
import FilterPanel from './FilterPanel/FilterPanel';
import SearchObjectTab from './SearchObjectTab/SearchObjectTab';
import Pagination from './Pagination/Pagination';


import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';

const transformRequest = (requests) => {
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

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      currentQueryText: '',
      request: {
        lang: this.props.language,
        sourceFields: ['id', 'label', 'natur', 'address'],
        searchFields: null,
        query: '',
        page: null,
        pageSize: null,
        filters: {},
        aggregations: {},
      },
      objectType: 'all',
      view: 'list',
      results: [],
      resultsCount: 0,
      facets: [],
      counts: {
        structures: 0,
        projects: 0,
        persons: 0,
        publications: 0,
        all: 0,
      },
    };
  }

  componentDidMount() {
    const newState = this.getParams();
    this.getCounts(newState);
    this.getData(newState);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
      this.setState({
        isLoading: true,
        results: [],
      });
      // console.log('reset');
      const newState = this.getParams();
      this.getCounts(newState);
      this.getData(newState);
    }
  }

  getParams() {
    // recup params dans url
    const objectType = this.props.match.params.objectType || 'entities';
    const view = queryString.parse(this.props.location.search).view || 'list';
    const query = queryString.parse(this.props.location.search).query || '';
    const pageSize = queryString.parse(this.props.location.search).pageSize;
    const page = queryString.parse(this.props.location.search).page;
    const filters = queryString.parse(this.props.location.search).filter;
    const newState = {
      objectType,
      view,
      request: {
        query,
        page,
        pageSize,
      },
    };
    this.setState(newState);
    return newState;
  }

  setParams(key, value, isFilter = false, isAggregation = false) {
    const temp = { ...this.state.request };
    if (isFilter) {
      temp.filters[key] = value;
      const url = queryString.stringify(temp);
      return url;
    }
    if (isAggregation) {
      temp.aggregations[key] = value;
      const url = queryString.stringify(temp);
      return url;
    }
    temp[key] = value;
    const url = queryString.stringify(temp);
    return url;
  }


  queryTextChangeHandler = (e) => {
    this.setState({ currentQueryText: e.target.value });
  }

  objectTypeChangeHandler = (e) => {
    if (typeof e === 'object') {
      e.preventDefault();
    }
    const newObject = (typeof e === 'object') ? e.target.value.toLowerCase() : e;
    const params = this.setParams();
    this.props.history.push(`/recherche/${newObject}?${params}`);
  }

  resultViewChangeHandler = (newView) => {
    const url = this.setParams('view', newView);
    this.props.history.push(this.props.location.pathname + '?' + url);
  }

  filterChangeHandler = (e) => {
    e.preventDefault();
    const url = this.setParams('view', newView);
    this.props.history.push(this.props.location.pathname + '?' + url);
  }

  getData = (newState) => {
    const apiName = (['entities', 'all'].includes(newState.objectType))
      ? 'structures'
      : newState.objectType;
    const url = `https://scanr-preprod.sword-group.com/api/v2/${apiName}/search`;
    Axios.post(url, transformRequest(newState.request))
      .then((response) => {
        this.setState({
          results: response.data.results,
          facets: response.data.facets,
          resultsCount: response.data.total,
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
      const url = `https://scanr-preprod.sword-group.com/api/v2/${api}/search`
      Axios.post(url, query)
        .then((response) => {
          const newCounts = { ...this.state.counts };
          newCounts[api] = response.data.total;
          newCounts.all = (
            newCounts.structures
            + newCounts.persons
            + newCounts.projects
            + newCounts.publications
          );
          this.setState({ counts: newCounts });
        });
    });
  }

  submitResearch = (e) => {
    e.preventDefault();
    const nextParams = `query=${this.state.currentQueryText}`;
    this.props.history.push(`${this.props.location.pathname}?${nextParams}`);
  }

  PaginationHandler = (value) => {
    const nextUrl = this.setParams('page', value);
    this.props.history.push(`${this.props.location.pathname}?${nextUrl}`);
  }

  ShouldRenderContainer = () => {
    if (!this.state.isLoading) {
      return (
        <div className="row">
          <div className="col-md-4">
            <FilterPanel
              language={this.props.language}
              facets={this.state.facets}
              filterChangeHandler={this.state.filterChangeHandler}
            />
          </div>
          <div className="col-md-8">
            <SearchResults
              {...this.props}
              language={this.props.language}
              results={this.state.results}
              facets={this.state.facets}
              resultsCount={this.state.resultsCount}
              view={this.state.view}
              objectType={this.state.objectType}
            />
          </div>
          <div className="col-md-8 ml-md-auto">
            <Pagination
              {...this.props}
              language={this.props.language}
              results={this.state.results}
              PaginationHandler={this.PaginationHandler}
              currentPage={parseInt(this.state.request.page)}
              currentPageSize={parseInt(this.state.request.pageSize)}
              totalDocuments={parseInt(this.state.resultsCount)}
            />
          </div>
        </div>
      );
    }
    return (
      <div className="row justify-content-center">
        <h1 className="col-4">
          Loading...
        </h1>
      </div>
    );
  }

  render() {
    const bgColor = `has-background-${this.state.objectType}`;
    return (
      <Fragment>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <SearchPanel
          language={this.props.language}
          isHome={false}
          objectType={this.state.objectType}
          currentQueryText={this.state.currentQueryText}
          queryTextChangeHandler={this.queryTextChangeHandler}
          queryObjectChangeHandler={this.objectTypeChangeHandler}
          submitResearch={this.submitResearch}
        />
        <div className={classes[bgColor]}>
          <SearchObjectTab
            language={this.props.language}
            isHome={false}
            objectType={this.state.objectType}
            queryObjectChangeHandler={this.objectTypeChangeHandler}
            view={this.state.view}
            resultViewChangeHandler={this.resultViewChangeHandler}
            counts={this.state.counts}
          />
          <div className="container">
            {this.ShouldRenderContainer()}
          </div>
        </div>
        <Footer language={this.props.language} />
      </Fragment>
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
