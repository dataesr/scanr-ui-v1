/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import globalAxios from 'axios';

import Aux from '../../../../hoc/Aux';
import axios from '../../../../axios';
import SortStatus from '../../../../Utils/SortStatus';
/* Composants internes */
import AddressDispatcher from './Address/AddressDispatcher';
import LeafletMap from './LeafletMap';

/* CSS */
import classes from './Addresses.scss';

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addMode: false,
      editedAddress: null,
      hasErrored: false,
      hoveredAddress: null,
      searchResults: null,
      selectedAddress: null,
      showAll: false,
    };
    this.addressGeocoding = debounce(this.addressGeocoding, 200);
  }

  toggleShowAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  mouseOut = () => {
    this.setState({ hoveredAddress: null });
  }

  mouseOver = (addressId) => {
    this.setState({ hoveredAddress: addressId });
  }

  addButtonHandler = () => {
    this.setState({ addMode: true });
  }

  addressGeocoding = () => {
    const encodedSearchInput = encodeURIComponent(this.state.searchInput);
    const url = `https://api-adresse.data.gouv.fr/search/?q=${encodedSearchInput}`;
    globalAxios.get(url)
      .then((response) => {
        this.setState({ searchResults: response.data.features });
      });
  }

  searchInputHandler = (event) => {
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

  setEditedAddress = (address) => {
    this.setState({ editedAddress: address });
  }

  addressAxiosCall = (addresses) => {
    const dataObject = {
      addresses,
    };
    const url = `structures/${this.props.structureId}`;
    this.setState({ hasErrored: false });
    axios.put(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.getStructures();
            this.setState({ editedAddress: null });
          }
        },
      )
      .catch(() => {
        this.setState({
          hasErrored: true,
        });
      });
  };

  editAddress = (updatedAddress) => {
    const updatedAddressesList = [...this.props.addresses];
    const addressIndex = updatedAddressesList.findIndex(address => address.id === updatedAddress.id);
    updatedAddressesList[addressIndex] = updatedAddress;
    this.addressAxiosCall(updatedAddressesList);
  }

  deleteAddress = (addressId) => {
    const editedAddressIndex = this.props.addresses.findIndex(name => name.id === addressId);
    const updatedAddressesList = [...this.props.addresses];
    updatedAddressesList.splice(editedAddressIndex, 1);
    this.addressAxiosCall(updatedAddressesList);
  };

  render() {
    const oldAddress = this.props.addresses.find(address => address.status === 'old');
    const btOldAddresses = (
      <button
        className="button is-light is-medium is-fullwidth is-rounded"
        type="button"
        onClick={this.toggleShowAllHandler}
      >
        <i className="fa fa-search" />
        &nbsp;
        {this.state.showAll ? 'Masquer' : 'Voir'}
        &nbsp;les anciennes adresses
      </button>);
    let displayedAddresses = [...this.props.addresses].sort(SortStatus);
    if (!this.state.showAll) {
      displayedAddresses = displayedAddresses.filter(address => address.status !== 'old');
    }
    let rightIcon = null;
    if (this.state.searchInput) {
      rightIcon = (
        <span className="icon is-small is-right" onClick={this.cancelSearch}>
          <i className="fas fa-times" />
        </span>);
    }
    if (this.state.selectedAddress) {
      rightIcon = (
        <span className="icon is-small is-right has-text-primary" onClick={this.validateAddress}>
          <i className="fas fa-check" />
        </span>);
    }
    let addField = (
      <div className={classes.bt_add}>
        <button
          className="button is-primary is-outlined is-small is-rounded"
          type="button"
          onClick={this.addButtonHandler}
        >
          <i className="fa fa-plus" />
          &nbsp;
          Ajouter une nouvelle adresse
        </button>
      </div>);
    if (this.state.addMode) {
      addField = (
        <p className="control has-icons-left has-icons-right">
          <input
            value={this.state.searchInput}
            className="input is-rounded"
            onChange={this.searchInputHandler}
            type="text"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
          {rightIcon}
        </p>);
    }
    let searchResults = null;
    if (this.state.searchResults) {
      searchResults = (
        <Aux>
          {this.state.searchResults.map((address, index) => (
            <input
              key={address.id}
              className={`input ${classes.SearchResults}`}
              id={index}
              onClick={this.selectAddress}
              readOnly
              type="text"
              value={address.properties.label}
            />
          ))}
        </Aux>
      );
    }
    return (
      <div className={`columns ${classes.FullDisplay}`}>
        <div className="column">
          {addField}
          {searchResults}
          {displayedAddresses.map(address => (
            <AddressDispatcher
              key={address.id}
              address={address}
              deleteButton={() => this.deleteAddress(address.id)}
              editAddress={this.editAddress}
              editedAddress={this.state.editedAddress}
              hasErrored={this.state.hasErrored}
              mouseOut={this.mouseOut}
              mouseOver={() => this.mouseOver(address.id)}
              setEditedAddress={this.setEditedAddress}
            />))}
          <div className={classes.bt_showAll}>
            { oldAddress ? btOldAddresses : null }
          </div>
        </div>
        <div className={`column ${classes.Map}`}>
          <LeafletMap
            displayedAddresses={displayedAddresses}
            editedAddress={this.state.editedAddress}
            hoveredAddress={this.state.hoveredAddress}
            editAddress={this.editAddress}
          />
        </div>
      </div>
    );// /return()
  }// /render
}// AddressesClass

export default Addresses;

Addresses.propTypes = {
  addresses: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
  getStructures: PropTypes.func.isRequired,
};
