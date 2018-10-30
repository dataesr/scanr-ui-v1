/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../../axios';
import SortStatus from '../../../../../Utils/SortStatus';
import InfoMessage from '../../../../../UI/Messages/InfoMessage';
import BtShowAll from '../../../../../UI/Field/BtShowAll';
/* Composants internes */
import AddressDispatcher from './Address/AddressDispatcher';
import LeafletMap from './Map/LeafletMap';
import NewAddress from './Address/NewAddress';

/* CSS */
import classes from './Addresses.scss';

class Addresses extends Component {
  state = {
    editedAddress: null,
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

  setEditedAddress = (address) => {
    this.setState({ editedAddress: address });
  }

  addressAxiosCall = (addresses) => {
    const dataObject = {
      addresses,
    };
    const url = `structures/${this.props.structureId}`;
    this.setState({ hasErrored: false });
    axios.patch(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.getStructure();
            this.setState({ editedAddress: null, hasErrored: false });
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
    const addressIndex = updatedAddressesList.findIndex(address => address.meta.id === updatedAddress.meta.id);
    if (addressIndex < 0) {
      this.setState({ hasErrored: true });
    } else {
      updatedAddressesList[addressIndex] = updatedAddress;
      this.addressAxiosCall(updatedAddressesList);
    }
  }

  deleteAddress = (addressId) => {
    const addressIndex = this.props.addresses.findIndex(address => address.meta.id === addressId);
    if (addressIndex < 0) {
      this.setState({ hasErrored: true });
    } else {
      const updatedAddressesList = [...this.props.addresses];
      updatedAddressesList.splice(addressIndex, 1);
      this.addressAxiosCall(updatedAddressesList);
    }
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
      <div className={`columns is-marginless ${classes.Height}`}>
        <div className={`column ${classes.Scroll}`}>
          <div className="columns is-marginless is-gapless">
            <div className="column">
              <NewAddress
                addAddress={this.addAddress}
                editedAddress={this.state.editedAddress}
                hasErrored={this.state.hasErrored}
                setEditedAddress={this.setEditedAddress}
              />
            </div>
            <div className="column">
              <InfoMessage>{infoMessage}</InfoMessage>
            </div>
          </div>
          {displayedAddresses.map(address => (
            <AddressDispatcher
              key={address.meta.id}
              address={address}
              coordinates={address.coordinates ? address.coordinates.coordinates : null}
              deleteButton={() => this.deleteAddress(address.meta.id)}
              saveAddress={this.editAddress}
              editedAddress={this.state.editedAddress}
              hasErrored={this.state.hasErrored}
              mouseOut={this.mouseOut}
              mouseOver={() => this.mouseOver(address.meta.id)}
              setEditedAddress={this.setEditedAddress}
              status={address.status}
            />))}
          { oldAddress ? btOldAddresses : null }
        </div>
        <div className={`column ${classes.Map}`}>
          <LeafletMap
            displayedAddresses={displayedAddresses}
            editAddress={this.editAddress}
            editedAddress={this.state.editedAddress}
            hoveredAddress={this.state.hoveredAddress}
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
  getStructure: PropTypes.func.isRequired,
};
