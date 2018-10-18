/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../axios';
import SortStatus from '../../../../Utils/SortStatus';
import InfoMessage from '../../../../UI/Messages/InfoMessage';
import BtShowAll from '../../../../UI/Field/BtShowAll';
/* Composants internes */
import AddressDispatcher from './Address/AddressDispatcher';
import LeafletMap from './Map/LeafletMap';
import NewAddress from './NewAddress/NewAddress';

/* CSS */
import classes from './Addresses.scss';

class Addresses extends Component {
  state = {
    editedAddress: null,
    editedCoordinates: null,
    hasErrored: false,
    hoveredAddress: null,
    showAll: false,
  };

  toggleShowAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  mouseOut = () => {
    this.setState({ hoveredAddress: null });
  }

  mouseOver = (addressId) => {
    this.setState({ hoveredAddress: addressId });
  }

  setEditedAddress = (address, coordinates) => {
    this.setState({ editedAddress: address, editedCoordinates: coordinates });
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

  addAddress = (newAddress) => {
    const updatedAddressesList = [...this.props.addresses];
    updatedAddressesList.push(newAddress);
    this.addressAxiosCall(updatedAddressesList);
  }

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
      <BtShowAll
        onClick={this.toggleShowAllHandler}
        showAll={this.state.showAll}
        label="anciennes adresses"
      />);
    let infoMessage = null;
    let displayedAddresses = [...this.props.addresses].sort(SortStatus);
    if (!this.state.showAll) {
      displayedAddresses = displayedAddresses.filter(address => address.status !== 'old');
      if (displayedAddresses.length === 0) {
        infoMessage = 'Aucune adresse active';
      }
    }
    return (
      <div className={`columns ${classes.FullDisplay}`}>
        <div className="column">
          <NewAddress
            addAddress={this.addAddress}
            hasErrored={this.state.hasErrored}
            setEditedAddress={this.setEditedAddress}
          />
          <div className="column">
            <InfoMessage>{infoMessage}</InfoMessage>
          </div>
          {displayedAddresses.map(address => (
            <AddressDispatcher
              key={address.id}
              address={address.geocoder_address}
              coordinates={address.coordinates}
              deleteButton={() => this.deleteAddress(address.id)}
              saveAddress={this.editAddress}
              editedAddress={this.state.editedAddress}
              hasErrored={this.state.hasErrored}
              mouseOut={this.mouseOut}
              mouseOver={() => this.mouseOver(address.id)}
              setEditedAddress={this.setEditedAddress}
              status={address.status}
            />))}
          { oldAddress ? btOldAddresses : null }
        </div>
        <div className={`column ${classes.Map}`}>
          <LeafletMap
            displayedAddresses={displayedAddresses}
            editedAddress={this.state.editedAddress}
            editedCoordinates={this.state.editedCoordinates}
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
