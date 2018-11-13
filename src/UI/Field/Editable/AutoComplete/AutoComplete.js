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
    this.setState({ searchInput: label && label.name_fr });
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
    let query = { name_fr: regex };
    if (this.props.searchInstitution) {
      query = {
        $or: [
          { 'names.name_fr': regex },
          { id: regex },
        ],
      };
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
        const label = this.props.searchInstitution
          ? category.names.find(name => name.status === 'main')
          : category;
        return (
          <li
            id={this.props.id}
            key={category.id}
            className={`is-small ${classes.Li}`}
            onClick={this.onSelectCategory}
            data-value={category.id}
          >
            {label.name_fr}
          </li>);
      });
    }
    return null;
  }

  render() {
    let component = (
      <span className={classes.Text} onClick={this.props.onClick}>
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
  searchInstitution: PropTypes.bool,
};

AutoComplete.defaultProps = {
  editMode: false,
  canBeNull: true,
};
