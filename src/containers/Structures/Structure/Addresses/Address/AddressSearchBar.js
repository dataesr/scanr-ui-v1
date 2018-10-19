/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import globalAxios from 'axios';

import Button from '../../../../../UI/Button/Button';
/* CSS */
import classes from './Address.scss';

class AddressSearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: this.props.searchInput,
      searchResults: null,
      selectedAddress: null,
    };
    this.addressGeocoding = debounce(this.addressGeocoding, 200);
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
    const selectedAddress = this.state.searchResults[event.target.id]
    const newAddress = {
      city: selectedAddress.properties.city,
      citycode: selectedAddress.properties.citycode,
      country: 'France',
      coordinates: selectedAddress.geometry,
      geocoded: true,
      housenumber: selectedAddress.properties.housenumber || null,
      input_address: this.props.searchInput || event.target.value,
      postcode: selectedAddress.properties.postcode,
      score: selectedAddress.properties.score,
      street: selectedAddress.properties.street || selectedAddress.properties.name,
    };
    this.props.validateAddress(newAddress);
  }

  createNewAddress = () => {
    const address = this.state.selectedAddress.properties;
    const newAddress = {
      city: address.city,
      citycode: address.citycode,
      country: 'France',
      coordinates: this.state.selectedAddress.geometry,
      geocoded: true,
      housenumber: address.housenumber || null,
      input_address: this.props.searchInput || this.state.searchInput,
      postcode: address.postcode,
      score: address.score,
      street: address.street || address.name,
    };
    this.props.validateAddress(newAddress);
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
    return (
      <div className="column">
        <div className="columns">
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
          </div>
          <div className="column is-narrow">
            <Button onClick={this.props.cancel}>
              <i className="fas fa-undo" />
            </Button>
          </div>
        </div>
        {this.renderSearchResults()}
      </div>
    );// /return()
  }// /render
}// AddressesClass

export default AddressSearchBar;

AddressSearchBar.propTypes = {
  validateAddress: PropTypes.func.isRequired,
  searchInput: PropTypes.string,
  cancel: PropTypes.func.isRequired,
};
