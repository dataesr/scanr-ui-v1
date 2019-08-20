import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './SelectFilter.scss';


class SelectFilter extends Component {
  state = { active: false };

  selectSuggestion = (e) => {
    this.setState({
      query: e.target.id,
      active: false,
    });
    this.submitWrapper(e.target.id);
  }

  switchActive = () => {
    if (this.state.active) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
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
      this.props.onSubmit(this.props.facetID, filtered[0].value);
    }
  }

  render() {
    const caret = this.state.active ? 'fa-caret-up' : 'fa-caret-down';
    return (
      <div className="d-flex flex-column mb-3">
        <form id="searchForm">
          {/* eslint-disable-next-line */}
          <label className={classes.Labels} htmlFor="input">
            {this.props.title}
          </label>
          {/* eslint-disable-next-line */}
          <label className={classes.Labels} htmlFor="input">
            {this.props.subtitle}
          </label>
          <input
            readOnly
            type="text"
            autoComplete="off"
            id="input"
            value="Séléction..."
            className={`pl-2 ${classes.SearchBar}`}
            placeholder={this.props.placeholder}
            onClick={this.switchActive}
            onFocus={event => event.preventDefault()}
          />
          <button
            type="button"
            onClick={this.switchActive}
            className={classes.SearchButton}
          >
            <i className={`fas ${caret} ${classes.SearchIcon}`} />
          </button>
          <div
            style={{ display: this.state.active ? 'block' : 'none' }}
            className={`p-2 mt-2 ${classes.AutocompleteFull}`}
          >
            <ul id="facets" className={`d-flex flex-column ${classes.Autocomplete}`}>
              {
                this.props.facets.map(facet => (
                  <li
                    role="option"
                    aria-selected={false}
                    key={facet.value}
                    id={facet.value}
                    className={`p-1 pl-2 pr-2 ${classes.Suggestion}`}
                    onClick={() => this.submitWrapper(facet.value)}
                    onKeyPress={() => this.submitWrapper(facet.value)}
                    onMouseDown={event => event.preventDefault()}
                  >
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        {facet.value}
                      </div>
                      <div className={`ml-auto ${classes.FacetsCounts}`}>
                        {`(${facet.count})`}
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

export default SelectFilter;

SelectFilter.propTypes = {
  onSubmit: PropTypes.func,
  facets: PropTypes.array,
  facetID: PropTypes.string.isRequired,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  placeholder: PropTypes.string,
  // setURL: PropTypes.func.isRequired
  // request: PropTypes.func.isRequired
};
