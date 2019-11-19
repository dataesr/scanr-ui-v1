import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './SelectFilter.scss';


class SelectFilter extends Component {
  state = { active: this.props.defaultActive };

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
    const allCount = this.props.facets.reduce((acc, item) => (acc + item.count), 0);

    return (
      <div className="d-flex flex-column mb-3">
        <form id="searchForm">
          {/* eslint-disable-next-line */}
          <div className={`d-flex flex-row ${classes.Title}`}>
            {/* eslint-disable-next-line */}
            <div onClick={this.switchActive}>
              {this.props.title}
            </div>
            <div className="ml-auto">
              <button
                type="button"
                onClick={this.switchActive}
                className={classes.SearchButton}
              >
                <i className={`fas ${caret} ${classes.SearchIcon}`} />
              </button>
            </div>
          </div>

          <div
            style={{ display: this.state.active ? 'block' : 'none' }}
            className={`p-2 mt-0 ${classes.ItemsList}`}
          >
            <div className="form-check">
              {
                (this.props.facets.length > 1)
                  ? (
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={this.props.title}
                          id={`all_${this.props.title}`}
                          checked
                        />
                        {/* eslint-disable-next-line */}
                        <label className={`form-check-label ${classes.Item}`} for={`all_${this.props.title}`}>
                          Tous
                        </label>
                      </div>
                      <div className={`ml-auto ${classes.FacetsCounts}`}>
                        {`(${allCount.toLocaleString()})`}
                      </div>
                    </div>
                  )
                  : null
              }
              {
                this.props.facets.map(facet => (
                  <div className="d-flex flex-row align-items-center">
                    <div>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={this.props.title}
                        id={facet.value}
                        value={facet.value}
                        onClick={() => this.submitWrapper(facet.value)}
                        checked={(this.props.facets.length === 1)}
                      />
                      {/* eslint-disable-next-line */}
                      <label className={`form-check-label ${classes.Item}`} for={facet.value}>
                        {facet.value}
                      </label>
                    </div>
                    <div className={`ml-auto ${classes.FacetsCounts}`}>
                      {`(${facet.count.toLocaleString()})`}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SelectFilter;

SelectFilter.defaultProps = {
  defaultActive: false,
};

SelectFilter.propTypes = {
  onSubmit: PropTypes.func,
  facets: PropTypes.array,
  facetID: PropTypes.string.isRequired,
  title: PropTypes.string,
  defaultActive: PropTypes.bool,
  // subtitle: PropTypes.string,
  // placeholder: PropTypes.string,
  // setURL: PropTypes.func.isRequired
  // request: PropTypes.func.isRequired
};
