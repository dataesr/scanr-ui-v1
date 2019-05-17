import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import classes from './Search-page.scss';

import SearchPanel from './SearchPanel/SearchPanel';
import SearchResults from './SearchResults/SearchResults';
import FilterPanel from './FilterPanel/FilterPanel';
import SearchObjectTab from './SearchObjectTab/SearchObjectTab';


import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';

class SearchPage extends Component {
  state = {
    isLoading: false,
    currentQueryObject: 'all',
    currentQueryText: '',
    currentFilters: '',
    currentResultView: 'list',
    resultsData: [],
    facetsData: [],
  };

  componentDidMount() {
    this.submitResearch();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentQueryObject !== this.state.currentQueryObject) {
      this.setState({
        isLoading: true,
        resultsData: []
      });
      // console.log('reset');
      this.submitResearch();
    }
  }

  queryTextChangeHandler = (e) => {
    this.setState({ currentQueryText: e.target.value });
  }

  queryObjectChangeHandler = (e) => {
    const newObject = (typeof e === 'object') ? e.target.value.toLowerCase() : e;
    this.setState({ currentQueryObject: newObject });
  }

  resultViewChangeHandler = (newView) => {
    this.setState({ currentResultView: newView });
  }

  submitResearch = () => {
    const query = { query: this.state.currentQueryText };
    const apiName = (this.state.currentQueryObject === 'entities' || this.state.currentQueryObject === 'all')
      ? 'structures'
      : this.state.currentQueryObject;
    const url = `https://scanr-preprod.sword-group.com/api/v2/${apiName}/search`
    Axios.post(url, query)
      .then((response) => {
        this.setState({
          resultsData: response.data.results,
          facetsData: response.data.facets,
        });
      });
    this.setState({ isLoading: false });
    console.log(this.state.resultsData);
  }

  render() {
    // if (!this.state.data) {
    //   return <Fragment>No data</Fragment>;
    // }
    const bgColor = `has-background-${this.state.currentQueryObject}`;
    return (
      <Fragment>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <SearchPanel
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
          isHome={false}
          currentQueryObject={this.state.currentQueryObject}
          currentQueryText={this.state.currentQueryText}
          queryTextChangeHandler={this.queryTextChangeHandler}
          queryObjectChangeHandler={this.queryObjectChangeHandler}
          submitResearch={this.submitResearch}
        />
        <div className={classes[bgColor]}>
          <SearchObjectTab
            language={this.props.language}
            switchLanguage={this.props.switchLanguage}
            isHome={false}
            currentQueryObject={this.state.currentQueryObject}
            queryObjectChangeHandler={this.queryObjectChangeHandler}
            currentResultView={this.state.currentResultView}
            resultViewChangeHandler={this.resultViewChangeHandler}
          />
          <div className="container">
            <div className="row">
              <div className={`col-md-4 ${classes.NoGutters}`}>
                <FilterPanel
                  language={this.props.language}
                  switchLanguage={this.props.switchLanguage}
                />
              </div>
              <div className={`col-md-8 ${classes.NoGutters}`}>
                <SearchResults
                  language={this.props.language}
                  switchLanguage={this.props.switchLanguage}
                  resultsData={this.state.resultsData}
                  currentResultView={this.state.currentResultView}
                  currentQueryObject={this.state.currentQueryObject}
                />
              </div>
            </div>
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
  switchLanguage: PropTypes.func.isRequired,
};
