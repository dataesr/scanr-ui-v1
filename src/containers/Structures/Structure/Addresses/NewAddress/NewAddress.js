/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import globalAxios from 'axios';

import Button from '../../../../../UI/Button/Button';
import AddressDispatcher from '../Address/AddressDispatcher';
/* CSS */
import classes from './NewAddress.scss';

class NewAddressInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNewAddress: false,
      searchBar: false,
      searchResults: null,
      selectedAddress: null,
    };
    this.addressGeocoding = debounce(this.addressGeocoding, 200);
  }

  toggleSearchBar = (bool) => {
    this.setState({ searchBar: bool });
  }

  addressGeocoding = () => {
    const encodedSearchInput = encodeURIComponent(this.state.searchInput);
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodedSearchInput}`;
    globalAxios.get(url)
      .then((response) => {
        this.setState({ searchResults: response.data.features });
      });
  }

  onChange = (event) => {
    this.setState({ searchInput: event.target.value });
    this.addressGeocoding();
  }

  selectAddress = (event) => {
    event.persist();
    this.setState(prevState => ({
      selectedAddress: prevState.searchResults[event.target.id],
      searchInput: event.target.value,
      searchResults: null,
    }));
  }

  createNewAddress = () => {
    this.setState({
      displayNewAddress: true,
    });
    this.props.setEditedAddress(this.state.selectedAddress);
  }

  renderSearchResults() {
    if (this.state.searchResults) {
      return this.state.searchResults.map((address, index) => (
        <input
          key={address.properties.id}
          className={`input ${classes.SearchResults}`}
          id={index}
          onClick={this.selectAddress}
          readOnly
          type="text"
          value={address.properties.label}
        />
      ));
    }
    return null;
  }

  render() {
    let rightButton = null;
    if (this.state.searchInput) {
      rightButton = (
        <Button onClick={() => this.toggleSearchBar(false)}>
          <i className="fas fa-undo" />
        </Button>);
    }
    if (this.state.selectedAddress) {
      rightButton = (
        <Button onClick={this.createNewAddress}>
          <i className="fas fa-check" />
        </Button>);
    }
    let addField = (
      <div className="column">
        <Button className="is-primary is-outlined is-small" onClick={() => this.toggleSearchBar(true)}>
          <i className="fa fa-plus" />
          &nbsp;
          Ajouter une nouvelle adresse
        </Button>
      </div>);
    if (this.state.searchBar) {
      addField = (
        <div className="column">
          <p className="control has-icons-left has-icons-right">
            <input
              value={this.state.searchInput}
              className="input is-rounded"
              onChange={this.onChange}
              type="text"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-search" />
            </span>
          </p>
        </div>);
    }
    return (
      <div className="column">
        <div className="columns">
          {addField}
          <div className="column is-narrow">
            {rightButton}
          </div>
        </div>
        {this.renderSearchResults()}
        {this.state.displayNewAddress ? (
          <AddressDispatcher
            address={this.state.selectedAddress.properties}
            coordinates={this.state.selectedAddress.geometry.coordinates}
            displayMode="full"
            deleteButton={() => this.toggleSearchBar(false)}
            editedAddress={this.state.selectedAddress}
            editMode
            hasErrored={this.props.hasErrored}
            saveAddress={this.props.addAddress}
            setEditedAddress={this.props.setEditedAddress}
          />) : null}
      </div>
    );// /return()
  }// /render
}// AddressesClass

export default NewAddressInput;

NewAddressInput.propTypes = {
  addAddress: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  setEditedAddress: PropTypes.func.isRequired,
};
