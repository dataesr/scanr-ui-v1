import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../../axios';
import classes from '../../Field.scss';

class AutoComplete extends Component {
  state = {
    categoryList: [],
    onFocus: false,
    searchInput: typeof this.props.fieldValue === 'object'
      ? this.props.fieldValue && this.props.fieldValue.name_fr : this.props.fieldValue,
  }

  componentDidMount() {
    this.APICall('');
  }

  onChange = (event) => {
    this.setState({ searchInput: event.target.value });
    this.APICall(event.target.value);
  }

  onFocus = (bool) => {
    this.setState({ onFocus: bool });
  }

  onSelectCategory = (event) => {
    this.setState({ searchInput: event.target.textContent });
    this.props.onChange(event);
    this.onFocus(false);
  }

  APICall(searchInput) {
    const maxResults = '5';
    const query = `{"name_fr": { "$regex": "^(?i)${searchInput}.*"}}`;
    const url = `${this.props.schemaName}?max_results=${maxResults}&where=${query}`;
    axios.get(url)
      .then((response) => {
        this.setState({
          categoryList: response.data.data,
        });
      });
  }

  renderSearchResults() {
    if (this.state.categoryList) {
      return this.state.categoryList.map(category => (
        <li
          id={this.props.id}
          key={category.id}
          className={`is-small ${classes.Li}`}
          onClick={this.onSelectCategory}
          data-value={category.id}
        >
        {category.name_fr}
        </li>
      ));
    }
    return null;
  }

  render() {
    let component = (
      <span className={classes.Text} onClick={this.props.onClick}>
        {typeof this.props.fieldValue === 'object'
          ? this.props.fieldValue && this.props.fieldValue.name_fr : this.props.fieldValue}
      </span>);
    if (this.props.editMode) {
      let inputColor = null;
      if (!this.props.canBeNull) {
        inputColor = this.state.searchInput ? 'is-primary' : 'is-danger';
      }
      component = (
        <Fragment>
          <input
            value={this.state.searchInput}
            className={`input is-rounded is-small ${inputColor} ${classes.BoxSizing}`}
            onChange={this.onChange}
            type="text"
            onFocus={() => this.onFocus(true)}
          />
          <div className={classes.ListContainer}>
            <ul>{this.state.onFocus && this.renderSearchResults()}</ul>
          </div>
        </Fragment>);
    }
    return component;
  }
}

export default AutoComplete;

AutoComplete.propTypes = {
  canBeNull: PropTypes.bool,
  editMode: PropTypes.bool,
  fieldValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  schemaName: PropTypes.string,
};

AutoComplete.defaultProps = {
  editMode: false,
  canBeNull: true,
};
