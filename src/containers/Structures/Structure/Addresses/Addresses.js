/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/* Composants internes */
import LeafletMap from './LeafletMap';
import AddressDispatcher from './Address/AddressDispatcher';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* CSS */
import classes from './Addresses.scss';

class Addresses extends Component {
  state = {
    addresses: this.props.addresses,
    structureId: this.props.structureId,
    showAll: false,
    addMode: false,
  };

  saveButtonHandler = () => {
    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        addresses: this.state.addresses,
      }],
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    const newState = { ...this.state };
    newState.addMode = true;

    // Ajout d'un objet "address" vide à la liste des Labels
    const addressEmpty = {
      source: '',
      status: 'new',
      value: '',
    };

    newState.addresses.push(addressEmpty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    const addresses = [...this.state.addresses];
    addresses.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        label: addresses,
      }],
    };

    this.AxiosCall(dataObject);
  }

  toggleShowAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  AxiosCall(data) {
    axios(
      {
        method: 'POST',
        url: `${API_END_POINT}structures/addresses`,
        responseType: 'json',
        data: JSON.stringify(data),
      },
    ).then(
      (response) => {
        if (response.status === 200) {
          const newState = { ...this.state };
          newState.addMode = false;
          this.setState(newState);
        }
      },
    );
  }// /AxiosCall()

  render() {
    const mainAddress = this.state.addresses.find(address => address.status === 'main');
    const oldAddress = this.state.addresses.find(address => address.status === 'old');
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

    return (
      <div className="columns">
        <div className="column">
          <div className={classes.bt_add}>
            <button
              className="button is-primary is-outlined is-small is-rounded"
              type="button"
            >
              <i className="fa fa-plus" />
              &nbsp;
              Ajouter une nouvelle adresse
            </button>
          </div>
          {
            this.state.addresses.map((address, index) => {
              if (address.status !== 'old' || this.state.showAll) {
                return (
                  <AddressDispatcher
                    key={address.id}
                    index={index}
                    address={address}
                    n_addresses={this.state.addresses.length}
                    deleteButton={this.deleteButtonHandler}
                    saveButton={this.saveButtonHandler}
                    addButton={this.addButtonHandler}
                  />
                );
              }
            })// /map
          }
          <div className={classes.bt_showAll}>
            { oldAddress ? btOldAddresses : null }
          </div>
        </div>
        <div className={`column ${classes.Map}`}>
          <LeafletMap
            formattedAddress={(
              <p>
                {mainAddress.address_1}
                {mainAddress.address_2 ? <br /> : <span />}
                {mainAddress.address_2}
                <br />
                {`${mainAddress.postal_code}, ${mainAddress.city}`}
                <br />
                {mainAddress.country}
              </p>)}
            longitude={2.333101}
            latitude={48.853932}
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
};
