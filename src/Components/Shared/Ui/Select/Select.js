import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Select.scss';


class Select extends Component {
  state = { active: false };

  switchActive = () => {
    if (this.state.active) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
  }

  onSubmitWrapper = (value) => {
    this.setState({ active: false });
    this.props.onSubmit(value);
  }

  render() {
    const caret = this.state.active ? 'fa-caret-up' : 'fa-caret-down';
    return (
      <div className={`d-flex flex-column mb-3 ${classes.Container}`}>
        <form id="searchForm">
          <span className={classes.Title}>
            {this.props.title}
          </span>
          <input
            readOnly
            type="text"
            autoComplete="off"
            id="input"
            value={this.props.placeHolder}
            className={`pl-2 ${classes.SearchBar}`}
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
            <ul id="data" className={`d-flex flex-column ${classes.Autocomplete}`}>
              <li
                role="option"
                aria-selected={false}
                className={`p-1 pl-2 pr-2 ${classes.Suggestion}`}
                onClick={() => this.onSubmitWrapper('all')}
                onKeyPress={() => this.onSubmitWrapper('all')}
                onMouseDown={event => event.preventDefault()}
              >
                <div className="d-flex flex-row align-items-center">
                  <div>
                    {this.props.allLabel}
                  </div>
                  <div className={`ml-auto ${classes.FacetsCounts}`}>
                    {`(${this.props.count})`}
                  </div>
                </div>
              </li>
              {
                this.props.data.map(item => (
                  <li
                    role="option"
                    aria-selected={false}
                    key={item.value}
                    className={`p-1 pl-2 pr-2 ${classes.Suggestion}`}
                    onClick={() => this.onSubmitWrapper(item.value)}
                    onKeyPress={() => this.onSubmitWrapper(item.value)}
                    onMouseDown={event => event.preventDefault()}
                  >
                    <div className="d-flex flex-row align-items-center">
                      <div>
                        {item.value}
                      </div>
                      <div className={`ml-auto ${classes.FacetsCounts}`}>
                        {`(${item.count})`}
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

export default Select;

Select.propTypes = {
  allLabel: PropTypes.string,
  count: PropTypes.string,
  onSubmit: PropTypes.func,
  data: PropTypes.array,
  placeHolder: PropTypes.string,
  title: PropTypes.string,
};
