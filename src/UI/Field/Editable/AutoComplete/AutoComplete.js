import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../../axios';
import classes from '../../Field.scss';

class AutoComplete extends Component {
  state = {
    categoryList: [],
    onFocus: false,
    searchInput: '',
  }

  componentDidMount() {
    this.APICall('');
    let label = this.props.fieldValue;
    if (this.props.searchInstitution && this.props.fieldValue && this.props.fieldValue.names) {
      label = this.props.fieldValue.names.find(name => name.status === 'main');
    }
    if (!this.props.noInitialKey) {
      label = label[this.props.labelKey];
    }
    this.setState({ searchInput: label });
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
    const regex = { $regex: `^(?i)${searchInput}.*` };
    let query = { [this.props.autoCompleteKeys]: regex };
    if (Array.isArray(this.props.autoCompleteKeys)) {
      query = [];
      this.props.autoCompleteKeys.forEach(key => query.push({ [key]: regex }));
      query = { $or: query };
    }
    const url = `${this.props.schemaName}?max_results=${maxResults}&where=${JSON.stringify(query)}`;
    axios.get(url)
      .then((response) => {
        this.setState({
          categoryList: response.data.data,
        });
      });
  }

  renderSearchResults() {
    if (this.state.categoryList) {
      return this.state.categoryList.map((category) => {
        let label = category;
        if (this.props.searchInstitution) {
          label = category.names.find(name => name.status === 'main');
        }
        label = label[this.props.labelKey];
        return (
          <li
            id={this.props.id}
            key={category.id}
            className={`is-small ${classes.Li}`}
            onClick={this.onSelectCategory}
            data-value={category.id}
            role="presentation"
          >
            {label}
          </li>);
      });
    }
    return null;
  }

  render() {
    let component = (
      <span className={classes.Text} onClick={this.props.onClick} role="presentation">
        {this.state.searchInput}
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
  autoCompleteKeys: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
  ]),
  canBeNull: PropTypes.bool,
  editMode: PropTypes.bool,
  fieldValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  id: PropTypes.string,
  labelKey: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  noInitialKey: PropTypes.bool,
  schemaName: PropTypes.string,
  searchInstitution: PropTypes.bool,
};

AutoComplete.defaultProps = {
  editMode: false,
  canBeNull: true,
};
