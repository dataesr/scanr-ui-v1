/* Composants externes */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
/* Config */
import {
  PAGE,
  PER_PAGE,
} from '../../config/config';

/* Composants internes */
import axios from '../../axios';
import Menu from '../Menu/Menu';
import SearchResults from './SearchResults/SearchResults';
import FilterPanel from './FilterPanel/FilterPanel';

import classes from './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterPanel: false,
      filters: {},
      isLoading: false,
      noResultFound: false,
      pagination:
      {
        n_page: PAGE,
        n_hits: 0,
      },
      searchText: '',
      searchResults: [],
    };
    this.search = debounce(this.axiosCall, 1000);
  }

  componentDidMount() {
    this.axiosCall(true);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.path !== prevProps.match.path) {
      this.axiosCall(true);
    }
  }

  toggleFilterPanel = (bool) => {
    this.setState({ filterPanel: bool });
  }

  searchTextHandler = (event) => {
    this.setState({ searchText: event.target.value });
    const p = {
      init: true,
      pagination: false,
    };
    this.search(p, true);
  }

  nextContentButtonHandler = () => {
    this.axiosCall();
  }

  selectFilter = (event) => {
    event.persist();
    this.setState((prevState) => {
      const filters = { ...prevState.filters };
      filters[event.target.name] = event.target.value;
      if (!event.target.checked) {
        delete filters[event.target.name];
      }
      this.axiosCall(true, filters);
      return filters;
    });
  }

  axiosCall(init, filters) {
    const page = init ? PAGE : this.state.pagination.n_page + 1;
    const queries = { ...filters };
    if (this.state.searchText) {
      queries.$text = { $search: this.state.searchText };
    }
    const whereCondition = Object.keys(queries).length > 0
      ? `where=${JSON.stringify(queries)}&` : '';
    const url = `${this.props.entity}?${whereCondition}page=${page}&max_results=${PER_PAGE}`;

    this.setState({ isLoading: true });
    axios.get(url)
      .then(
        (response) => {
          this.setState((prevState) => {
            let searchResults = response.data.data;
            const newPagination = { ...prevState.pagination };
            if (!init) {
              newPagination.n_page = 1;
              searchResults = [...prevState.searchResults];
              Array.prototype.push.apply(searchResults, response.data.data);
              newPagination.n_page += 1;
            }
            newPagination.n_hits = response.data.meta.total;
            return {
              searchResults,
              noResultFound: response.data.meta.total === 0,
              pagination: newPagination,
              isLoading: false,
            };
          });
          this.props.history.push(this.props.match.path);
        },
      )
      .catch(() => this.setState({ noResultFound: true, searchResults: null, isLoading: false }));
  }

  render() {
    return (
      <div className={classes.Layout}>
        <div className={classes.Menu}>
          <Menu
            isLoading={this.state.isLoading}
            searchTextHandler={this.searchTextHandler}
            displayFilterPanel={() => this.toggleFilterPanel(true)}
          />
        </div>
        <FilterPanel
          activeFilters={this.state.filters}
          filtersConfig={this.props.filtersConfig}
          hideFilterPanel={() => this.toggleFilterPanel(false)}
          selectFilter={this.selectFilter}
          visible={this.state.filterPanel}
        />
        <div id="content" className={classes.Content}>
          <Switch>
            <Route path={`/${this.props.entity}/:id`} component={this.props.entityComponent} />
            <Route
              exact
              strict
              path={`/${this.props.entity}`}
              render={() => (
                <SearchResults
                  {...this.props}
                  nextContentButtonHandler={this.nextContentButtonHandler}
                  noResultFound={this.state.noResultFound}
                  pagination={this.state.pagination}
                  searchResults={this.state.searchResults}
                />)}
            />
          </Switch>
        </div>
      </div>
    );
  }
}


export default Search;

Search.propTypes = {
  entity: PropTypes.string.isRequired,
  filtersConfig: PropTypes.array.isRequired,
  gridComponent: PropTypes.any,
};
