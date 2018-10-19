import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddressMini from './AddressMini';
import AddressFull from './AddressFull';
import AddressSearchBar from './AddressSearchBar';

class AddressDispatcher extends Component {
  state = {
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
      console.log('coucou');
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

  render() {
    let content = '';
    switch (this.state.displayMode) {
      case 'mini':
        content = (
          <AddressMini
            address={this.props.address}
            changeDisplayMode={this.changeDisplayModeHandler}
            mouseOut={this.props.mouseOut}
            mouseOver={this.props.mouseOver}
          />);
        break;
      case 'full':
        content = (
          <AddressFull
            address={this.props.address}
            changeDisplayMode={() => this.changeDisplayModeHandler('mini')}
            deleteButton={this.props.deleteButton}
            editMode={this.state.editMode}
            hasErrored={this.props.hasErrored}
            saveAddress={this.props.saveAddress}
            lifecycle={this.props.meta}
          />);
        break;
      case 'new':
        content = (
          <AddressSearchBar
            addAddress={this.props.saveAddress}
            baseInput={this.props.address.input_address}
            changeDisplayMode={() => this.changeDisplayMode('mini')}
            hasErrored={this.state.hasErrored}
            setEditedAddress={this.props.setEditedAddress}
            searchInput={this.props.address.input_address}
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
  meta: PropTypes.object,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  setEditedAddress: PropTypes.func.isRequired,
};

AddressDispatcher.defaultProps = {
  displayMode: 'mini',
  };
