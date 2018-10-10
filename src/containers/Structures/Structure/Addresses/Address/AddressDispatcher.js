import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddressMini from './AddressMini';
import AddressFull from './AddressFull';

class AddressDispatcher extends Component {
  state = {
    displayMode: 'mini',
  };

  componentDidUpdate(prevProps) {
    if (prevProps.editedAddress && this.props.editedAddress
        && prevProps.editedAddress !== this.props.editedAddress
        && this.props.editedAddress.id !== this.props.address.id) {
      this.setState({ displayMode: 'mini' });
    }
  }

  changeDisplayModeHandler = (mode) => {
    this.setState({ displayMode: mode });
    if (mode === 'full') {
      this.props.setEditedAddress(this.props.address);
    } else {
      this.props.setEditedAddress(null);
    }
  }

  render() {
    let content = '';
    switch (this.state.displayMode) {
      case 'mini':
        content = (
          <AddressMini
            address={this.props.address}
            changeDisplayMode={() => this.changeDisplayModeHandler('full')}
            mouseOut={this.props.mouseOut}
            mouseOver={this.props.mouseOver}
          />);
        break;
      case 'full':
        content = (
          <AddressFull
            address={this.props.address}
            changeDisplayMode={() => this.changeDisplayModeHandler('mini')}
            editAddress={this.props.editAddress}
            deleteButton={this.props.deleteButton}
            hasErrored={this.props.hasErrored}
          />);
        break;
      default:
        content = (
          <AddressMini
            address={this.props.address}
            changeDisplayMode={() => this.changeDisplayModeHandler('full')}
            mouseOut={this.props.mouseOut}
            mouseOver={this.props.mouseOver}
          />);
    }

    return content;
  }
}

export default AddressDispatcher;

AddressDispatcher.propTypes = {
  address: PropTypes.object.isRequired,
  deleteButton: PropTypes.func.isRequired,
  editAddress: PropTypes.func.isRequired,
  editedAddress: PropTypes.object,
  hasErrored: PropTypes.bool.isRequired,
  mouseOut: PropTypes.func.isRequired,
  mouseOver: PropTypes.func.isRequired,
  setEditedAddress: PropTypes.func.isRequired,
};
