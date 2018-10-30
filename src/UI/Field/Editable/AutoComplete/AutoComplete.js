import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Aux from '../../../../hoc/Aux';
import axios from '../../../../axios';
import classes from '../../Field.css';

class AutoComplete extends Component {
  state = {
    categoryList: [],
    onFocus: false,
    searchInput: this.props.fieldValue.name_fr,
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

  selectCategory = (event) => {
    event.persist()
    this.setState({ searchInput: event.target.value });
    const selectedCategory = this.state.categoryList.find(item => item.name_fr === event.target.value);
    event.target.value = selectedCategory.code
    this.props.onChange(event);
  }

  APICall(searchInput) {
    const query = `{"name_fr": { "$regex": "^(?i)${searchInput}.*"}}`;
    const url = `${this.props.schemaName}?max_results=5&where=${query}`;
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
        <input
          id={this.props.id}
          key={category.code}
          className={`input ${classes.SearchResults}`}
          onClick={this.selectCategory}
          readOnly
          type="text"
          value={category.name_fr}
        />
      ));
    }
    return null;
  }

  render() {
    let component = (
      <span className={this.props.size === 'large' ? classes.Text : ''} onClick={this.props.onClick}>
        {this.props.fieldValue.name_fr}
      </span>);
    if (this.props.editMode) {
      let inputColor = null;
      if (!this.props.canBeNull) {
        inputColor = this.state.searchInput ? 'is-primary' : 'is-danger';
      }
      component = (
        <Aux>
          <input
            value={this.state.searchInput}
            className={`input is-rounded ${inputColor} ${classes.AutoComplete}`}
            onChange={this.onChange}
            type="text"
            onFocus={() => this.onFocus(true)}
          />
          {this.state.onFocus && this.renderSearchResults()}
        </Aux>);
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
  schemaName: PropTypes.string.isRequired,
  size: PropTypes.string,
};

AutoComplete.defaultProps = {
  editMode: false,
  canBeNull: true,
};
