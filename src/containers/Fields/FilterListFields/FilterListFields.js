import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './FilterListFields.scss';

class FilterListFields extends Component {
  state = {
    data: this.props.data,
    searchText: null,
  }

  addFilter = (event) => {
    this.setState({ searchText: event.target.value });
  }

  deleteFilter = () => {
    this.setState({ searchText: null });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    let result = this.state.data;
    if (this.state.searchText) {
      result = this.state.data.filter(item => (
        item.match(this.state.searchText)
      ));
    }

    const rows = result.map(item => (
      <tr key={item}>
        <td>
          {
            (this.props.redirection)
              ? <a href={`/${this.props.redirection}/${item}`}>{item}</a>
              : item
          }
        </td>
      </tr>
    ));

    const nbData = this.state.data.length;

    return (
      <Fragment>
        <div className={classes.TextTitleInline}>
          {this.props.title}
          &nbsp;
          <span className="tag is-white is-rounded">{nbData}</span>
        </div>

        {
          (this.props.showFilter) ? (
            <div className={`field has-addons ${classes.Filter}`}>
              <div className={`control ${classes.Input}`}>
                <input
                  className="input"
                  type="text"
                  placeholder="Filtre"
                  onChange={this.addFilter}
                  value={this.state.searchText || ''}
                />
              </div>
              <div className="control">
                <a className="button is-warning" onClick={this.deleteFilter} role="presentation">
                  <i className="fas fa-eraser" />
                </a>
              </div>
            </div>
          )
            : null
        }

        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
          <tbody>
            {rows}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default FilterListFields;

FilterListFields.propTypes = {
  data: PropTypes.array,
  title: PropTypes.string,
  redirection: PropTypes.string,
  showFilter: PropTypes.bool,
};

FilterListFields.defaultProps = {
  showFilter: true,
};
