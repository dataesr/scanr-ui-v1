/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';
import AddressDispatcher from './AddressDispatcher';
import AddressSearchBar from './AddressSearchBar';
/* CSS */

class NewAddress extends Component {
  state = {
    newAddress: null,
    searchBar: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.editedAddress && !this.props.editedAddress) {
      this.setState({ searchBar: false, newAddress: null });
    }
  }

  toggleSearchBar = (bool) => {
    this.setState({ searchBar: bool });
  }

  validateAddress = (address) => {
    this.setState({ newAddress: address, searchBar: false });
  }

  deleteAddress = () => {
    this.setState({ newAddress: null });
  }

  render() {
    let content = (
      <div className="column">
        <Button className="is-primary is-outlined is-small" onClick={() => this.toggleSearchBar(true)}>
          <i className="fa fa-plus" />
          &nbsp;
          Ajouter une nouvelle adresse
        </Button>
      </div>);
    if (this.state.searchBar) {
      content = (
        <AddressSearchBar
          cancel={() => this.toggleSearchBar(false)}
          validateAddress={this.validateAddress}
        />);
    }
    if (this.state.newAddress) {
      const { newAddress } = this.state;
      content = (
        <AddressDispatcher
          address={newAddress}
          deleteButton={this.deleteAddress}
          displayMode="full"
          editedAddress={this.props.editedAddress}
          meta={newAddress.meta}
          saveAddress={this.props.addAddress}
          hasErrored={this.props.hasErrored}
          setEditedAddress={this.props.setEditedAddress}
        />);
    }

    return (
      <div className="column">
        {content}
      </div>
    );
  }
}

export default NewAddress;

NewAddress.propTypes = {
  addAddress: PropTypes.func.isRequired,
  editedAddress: PropTypes.object,
  hasErrored: PropTypes.bool.isRequired,
  setEditedAddress: PropTypes.func.isRequired,
};
