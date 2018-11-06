/* Composants externes */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
/* Config */
import {
  PAGE,
  PER_PAGE,
} from '../../config/config';

/* Composants internes */
import axios from '../../axios';
import Menu from '../Menu/Menu';
import SearchResults from './SearchResults/SearchResults';

import classes from './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    const p = {
      init: true,
      pagination: false,
    };
    this.axiosCall(p);
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
    const params = {
      init: false,
      pagination: true,
    };
    this.axiosCall(params);
  }

  axiosCall(params, search) {
    let page;
    if (params.pagination) {
      page = this.state.pagination.n_page + 1;
    } else {
      page = PAGE;
    }
    const query = `{"$text":{"$search": "${this.state.searchText}"}}`;
    const where = `where=${encodeURIComponent(query)}&`;
    const url = `${this.props.entity}?${this.state.searchText ? where : ''}page=${page}&max_results=${PER_PAGE}`;
    this.setState({ isLoading: true });
    axios.get(url)
      .then(
        (response) => {
          this.setState((prevState) => {
            let searchResults = response.data.data;
            if (!search) {
              searchResults = [...prevState.searchResults];
              Array.prototype.push.apply(searchResults, response.data.data);
            }
            const newPagination = { ...prevState.pagination };
            newPagination.n_hits = response.data.meta.total;
            if (params.pagination) {
              newPagination.n_page += 1;
            } else {
              newPagination.n_page = 1;
            }
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
          />
        </div>
        <div id="content" className={classes.Content}>
          <Route path={`${this.props.match.path}/:esr_id`} component={this.props.entityComponent} />
          <Route
            exact
            path={this.props.match.path}
            render={() => (
              <SearchResults
                {...this.props}
                nextContentButtonHandler={this.nextContentButtonHandler}
                noResultFound={this.state.noResultFound}
                pagination={this.state.pagination}
                searchResults={this.state.searchResults}
              />)}
          />
        </div>
      </div>
    );
  }
}


export default Search;

Search.propTypes = {
  entity: PropTypes.string.isRequired,
  gridComponent: PropTypes.any,
  label: PropTypes.string.isRequired,
};
