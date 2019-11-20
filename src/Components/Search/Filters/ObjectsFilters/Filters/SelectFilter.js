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

  getCountFromKey = (entries, searchedKey, searchedKeyValue, returnKey) => {
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i][searchedKey] === searchedKeyValue) {
        return entries[i][returnKey];
      }
    }
    return 0;
  }

  submitWrapper(value) {
    // const filtered = this.props.facets
    //   .filter(item => item.value.toLowerCase().includes(value.toLowerCase()));
    // if (filtered[0]) {
    //   console.log('filtered[0].value=>', filtered[0].value);
    //   this.props.onSubmit(this.props.facetID, filtered[0].value);
    // }
    this.props.onSubmit(this.props.facetID, value);
  }

  render() {
    const caret = this.state.active ? 'fa-caret-up' : 'fa-caret-down';
    const allCount = this.props.facets.reduce((acc, item) => (acc + item.count), 0);

    if (!this.props.permanentList) {
      return null;
    }
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
              <div className="d-flex flex-row align-items-center">
                <div>
                  <input
                    className="form-check-input"
                    type="radio"
                    name={this.props.title}
                    id={`all_${this.props.title}`}
                    onClick={() => this.props.onSubmit(this.props.facetID, null, false)}
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
              {
                // Parcouros de toute la liste permanentList puis check de l'élément renvoyé par l'API
                this.props.permanentList.map((ele) => {
                  // recherche de l'élément en cours dans les facets retournée pour avoir le count et l'élément en cours
                  const count = this.getCountFromKey(this.props.facets, 'value', ele, 'count');
                  return (
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        <input
                          className="form-check-input"
                          type="radio"
                          name={this.props.title}
                          id={ele}
                          value={ele}
                          onClick={() => this.props.onSubmit(this.props.facetID, ele, false)}
                          checked={(count > 0 && (this.props.filters && this.props.filters.values && this.props.filters.values[0] === ele))}
                          disabled={count === 0}
                        />
                        {/* eslint-disable-next-line */}
                        <label className={`form-check-label ${classes.Item}`} for={ele}>
                          {ele}
                        </label>
                      </div>
                      <div className={`ml-auto ${classes.FacetsCounts}`}>
                        {`(${count.toLocaleString()})`}
                      </div>
                    </div>
                  );
                })
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
  permanentList: PropTypes.array,
  filters: PropTypes.object,
  // subtitle: PropTypes.string,
  // placeholder: PropTypes.string,
  // setURL: PropTypes.func.isRequired
  // request: PropTypes.func.isRequired
};
