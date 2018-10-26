import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddressMini from './AddressMini';
import AddressFull from './AddressFull';
import AddressSearchBar from './AddressSearchBar';

class AddressDispatcher extends Component {
  state = {
    address: this.props.address,
    displayMode: this.props.displayMode,
    editMode: this.props.displayMode === 'full',
  };

  componentDidMount() {
    if (this.state.displayMode === 'full') {
      this.props.setEditedAddress(this.props.address, this.props.coordinates);
    } else {
      this.props.setEditedAddress(null);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.editedAddress && this.props.editedAddress
        && prevProps.editedAddress !== this.props.editedAddress
        && this.props.editedAddress.meta.id !== this.props.address.meta.id) {
      this.setState({ displayMode: 'mini' });
    }
    if (prevProps.editedAddress && !this.props.editedAddress) {
      this.setState({ editMode: false })
    }
  }

  changeDisplayModeHandler = (mode) => {
    this.setState({ displayMode: mode });
    if (mode === 'full') {
      this.props.setEditedAddress(this.props.address, this.props.coordinates);
    } else {
      this.props.setEditedAddress(null);
    }
  }

  geocodeAddress = (address) => {
    this.setState({ address, displayMode: 'full', editMode: true });
  }

  render() {
    let content = '';
    switch (this.state.displayMode) {
      case 'mini':
        content = (
          <AddressMini
            address={this.state.address}
            changeDisplayMode={this.changeDisplayModeHandler}
            mouseOut={this.props.mouseOut}
            mouseOver={this.props.mouseOver}
            status={this.props.status}
          />);
        break;
      case 'full':
        content = (
          <AddressFull
            address={this.state.address}
            inputAddress={this.props.address.input_address}
            changeDisplayMode={() => this.changeDisplayModeHandler('mini')}
            deleteButton={this.props.deleteButton}
            editMode={this.state.editMode}
            hasErrored={this.props.hasErrored}
            saveAddress={this.props.saveAddress}
            status={this.props.status}
            lifecycle={this.props.address.meta}
          />);
        break;
      case 'new':
        content = (
          <AddressSearchBar
            validateAddress={this.geocodeAddress}
            cancel={() => this.changeDisplayMode('mini')}
            searchInput={this.state.address.input_address}
          />);
        break;
      default:
        content = null;
    }

    return content;
  }
}

export default AddressDispatcher;

AddressDispatcher.propTypes = {
  address: PropTypes.object.isRequired,
  coordinates: PropTypes.array,
  deleteButton: PropTypes.func.isRequired,
  displayMode: PropTypes.string,
  saveAddress: PropTypes.func.isRequired,
  editedAddress: PropTypes.object,
  hasErrored: PropTypes.bool.isRequired,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  setEditedAddress: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};

AddressDispatcher.defaultProps = {
  displayMode: 'mini',
};
