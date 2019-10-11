import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Autocomplete.scss';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      query: '',
    };
  }

  queryTextChangeHandler = (e) => {
    this.setState({
      active: true,
      query: e.target.value,
    });
    if (e.target.value === '') {
      this.setState({ active: false });
    }
  }

  selectSuggestion = (e) => {
    this.setState({
      query: e.target.id,
      active: false,
    });
    this.submitWrapper(e.target.id);
  }

  setActive = () => {
    if (this.state.query !== '') {
      this.setState({ active: true });
    }
  }

  setInactive = () => {
    if (this.props.facets.includes(document.activeElement.id)) {
      this.submitWrapper(document.activeElement.id);
    }
    this.setState({
      active: false,
    });
  }

  submitWrapper(value) {
    const filtered = this.props.facets
      .filter(item => item.value.toLowerCase().includes(value.toLowerCase()));
    if (filtered[0]) {
      this.props.onSubmit(this.props.facetID, filtered[0].value, false);
    }
  }

  render() {
    let filtered = [];
    if (this.props.facets) {
      filtered = this.props.facets
        .filter(item => item.value.toLowerCase().includes(this.state.query.toLowerCase()));
    }

    return (
      <div className="d-flex flex-column mb-3">
        <form id="searchForm">
          <label className={classes.Labels} htmlFor="input">
            {this.props.title}
          </label>
          <label className={classes.Labels} htmlFor="input">
            {this.props.subtitle}
          </label>
          <input
            type="text"
            autoComplete="off"
            id="input"
            value={this.state.query}
            className={`pl-2 ${classes.SearchBar}`}
            placeholder={this.props.placeholder}
            onChange={this.queryTextChangeHandler}
            onFocus={this.setActive}
            onBlur={this.setInactive}
          />
          <button
            className={classes.SearchButton}
            type="submit"
            onClick={() => this.submitWrapper(document.getElementById('input').value)}
          >
            <i className={`fas fa-search ${classes.SearchIcon}`} />
          </button>
          <div
            style={{ display: this.state.active ? 'block' : 'none' }}
            className={`p-2 mt-2 ${classes.AutocompleteFull}`}
          >
            <ul id="suggestions" className={`d-flex flex-column ${classes.Autocomplete}`}>
              {
                filtered.map(filter => (
                  <li
                    role="option"
                    aria-selected={false}
                    key={filter.value}
                    id={filter.value}
                    className={`p-1 pl-2 pr-2 ${classes.Suggestion}`}
                    onClick={() => this.submitWrapper(filter.value)}
                    onKeyPress={() => this.submitWrapper(filter.value)}
                    onMouseDown={event => event.preventDefault()}
                  >
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        {filter.value}
                      </div>
                      <div className={`ml-auto ${classes.FacetsCounts}`}>
                        {`(${filter.count})`}
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default Autocomplete;

Autocomplete.propTypes = {
  onSubmit: PropTypes.func,
  facets: PropTypes.array,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  facetID: PropTypes.string.isRequired,
};
