import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddressMini from './AddressMini';
import AddressFull from './AddressFull';

class AddressDispatcher extends Component {
  state = {
    displayMode: this.props.displayMode,
  };

  componentDidMount() {
    if (this.state.mode === 'full') {
      this.props.setEditedAddress(this.props.address, this.props.coordinates);
    } else {
      this.props.setEditedAddress(null);
    }
  }

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
      this.props.setEditedAddress(this.props.address, this.props.coordinates);
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
            geocoded={!!this.props.coordinates}
            mouseOut={this.props.mouseOut}
            mouseOver={this.props.mouseOver}
            status={this.props.status}
          />);
        break;
      case 'full':
        content = (
          <AddressFull
            address={this.props.address}
            coordinates={this.props.coordinates}
            changeDisplayMode={() => this.changeDisplayModeHandler('mini')}
            deleteButton={this.props.deleteButton}
            editMode={this.props.editMode}
            hasErrored={this.props.hasErrored}
            saveAddress={this.props.saveAddress}
            status={this.props.status}
            lifecycle={this.props.meta}
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
  editMode: PropTypes.bool,
  hasErrored: PropTypes.bool.isRequired,
  meta: PropTypes.object,
  mouseOut: PropTypes.func.isRequired,
  mouseOver: PropTypes.func.isRequired,
  setEditedAddress: PropTypes.func.isRequired,
  status: PropTypes.string,
};

AddressDispatcher.defaultProps = {
  displayMode: 'mini',
  editMode: false,
};
