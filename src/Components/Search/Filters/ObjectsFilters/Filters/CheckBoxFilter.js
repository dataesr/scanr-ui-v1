import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './CheckBoxFilter.scss';


class CheckBoxFilter extends Component {
  state = {
    active: this.props.defaultActive,
    showAll: false,
  };

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

  showAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  submitWrapper(value) {
    const filtered = this.props.facets
      .filter(item => item.value.toLowerCase().includes(value.toLowerCase()));
    if (filtered[0]) {
      this.props.onSubmit(this.props.facetID, filtered[0].value, true, this.props.filterType);
    }
  }

  render() {
    const filters = this.props.filters.values || [];
    const caret = this.state.active ? 'fa-caret-up' : 'fa-caret-down';
    const printSeeAll = (this.props.facets.length > this.props.nbItemsToShow);
    return (
      <div className="d-flex flex-column mb-3">
        <form id="searchForm">
          {/* eslint-disable-next-line */}
          <div className={`d-flex flex-row ${classes.Title}`}>
            {/* eslint-disable-next-line */}
            <div>
              {this.props.title}
            </div>
            {
              (this.props.retractable)
                ? (
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={this.switchActive}
                      className={classes.SearchButton}
                    >
                      <i className={`fas ${caret} ${classes.SearchIcon}`} />
                    </button>
                  </div>
                )
                : null
            }
          </div>

          <div
            style={{ display: this.state.active ? 'block' : 'none' }}
            className={`pt-1 mt-0 ${classes.ItemsList}`}
          >
            <ul id="facets" className={`d-flex flex-column ${classes.Autocomplete}`}>
              {
                this.props.facets.map((facet, index) => {
                  if (index < this.props.nbItemsToShow || this.state.showAll) {
                    return (
                      <li
                        role="option"
                        aria-selected={false}
                        key={facet.value}
                        id={facet.value}
                        className={`${classes.Suggestion}`}
                        onClick={() => this.submitWrapper(facet.value)}
                        onKeyPress={() => this.submitWrapper(facet.value)}
                        onMouseDown={event => event.preventDefault()}
                      >
                        <div className="d-flex flex-row align-items-center">
                          <div className={`mr-1 ${classes.CheckBox}`}>
                            <input
                              type="checkbox"
                              id={facet.value}
                              checked={filters.includes(facet.value)}
                            />
                            <span className={classes.CheckMark} />
                          </div>
                          {/* eslint-disable-next-line */}
                          <label className={`pl-1 form-check-label ${classes.Item}`} htmlFor={facet.value}>
                            {facet.value}
                          </label>
                          <div className={`ml-auto ${classes.FacetsCounts}`}>
                            {`(${facet.count.toLocaleString(this.props.language)})`}
                          </div>
                        </div>
                      </li>
                    );
                  }
                  return null;
                })
              }
              {
                (!this.state.showAll && printSeeAll) ? (
                  <div className="text-right">
                    <button onClick={this.showAllHandler} type="button" className={classes.NoStyleButton}>
                      Voir tout
                    </button>
                  </div>
                ) : null
              }
              {
                (this.state.showAll && printSeeAll) ? (
                  <div className="text-right">
                    <button onClick={this.showAllHandler} type="button" className={classes.NoStyleButton}>
                      Voir moins
                    </button>
                  </div>
                ) : null
              }
            </ul>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckBoxFilter;

CheckBoxFilter.defaultProps = {
  filterType: 'any',
  defaultActive: false,
  nbItemsToShow: 4,
  retractable: false,
};

CheckBoxFilter.propTypes = {
  onSubmit: PropTypes.func,
  facets: PropTypes.array,
  filters: PropTypes.object,
  facetID: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string,
  retractable: PropTypes.bool,
  // subtitle: PropTypes.string,
  // placeholder: PropTypes.string,
  filterType: PropTypes.string,
  defaultActive: PropTypes.bool,
  nbItemsToShow: PropTypes.number,
  // setURL: PropTypes.func.isRequired
  // request: PropTypes.func.isRequired
};
