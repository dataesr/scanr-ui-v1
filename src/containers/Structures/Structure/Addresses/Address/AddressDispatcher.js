import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AddressMini from './AddressMini';
import AddressFull from './AddressFull';
import AddressFullEdit from './AddressFullEdit';

class AddressDispatcher extends Component {
  state = {
    displayMode: 'mini ',
  };

  changeDisplayModeHandler = (mode) => {
    this.setState({ displayMode: mode });
  }

  render() {
    let content = '';
    switch (this.state.displayMode) {
      case 'mini':
        content = <AddressMini address={this.props.address} changeDisplayMode={this.changeDisplayModeHandler} />;
        break;
      case 'full':
        content = <AddressFull address={this.props.address} changeDisplayMode={this.changeDisplayModeHandler} />;
        break;
      case 'fullEdit':
        content = <AddressFullEdit address={this.props.address} changeDisplayMode={this.changeDisplayModeHandler} />;
        break;
      default:
        content = <AddressMini address={this.props.address} changeDisplayMode={this.changeDisplayModeHandler} />;
    }

    return content;
  }
}

export default AddressDispatcher;

AddressDispatcher.propTypes = {
  address: PropTypes.object.isRequired,
};
