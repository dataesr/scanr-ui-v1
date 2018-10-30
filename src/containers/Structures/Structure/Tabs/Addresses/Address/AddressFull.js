/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DATE_FORMAT_API } from '../../../../../../config/config';

/* Composants internes */
import Aux from '../../../../../../hoc/Aux';
import Button from '../../../../../../UI/Button/Button';
import ErrorMessage from '../../../../../../UI/Messages/ErrorMessage';
import FieldTitle from '../../../../../../UI/Field/FieldTitle';
import Tag from '../../../../../../UI/Tag/Tag';
import Input from '../../../../../../UI/Field/Editable/Input/Input';
import InputDate from '../../../../../../UI/Field/Editable/InputDate/InputDate';
import Status from '../../../../../../UI/Field/Editable/Status/Status';
import LifeCycle from '../../../../../../UI/Field/LifeCycle';
import AddressField from './AddressField/AddressField';

/* CSS */
import classes from './Address.scss';

class AddressFull extends Component {
  state={
    address: {
      city: this.props.address.city || '',
      citycode: this.props.address.citycode || '',
      country: this.props.address.country || '',
      end_date: this.props.address.end_date || '',
      housenumber: this.props.address.housenumber || '',
      postcode: this.props.address.postcode || '',
      start_date: this.props.address.start_date || '',
      status: this.props.status,
      street: this.props.address.street || this.props.address.name || '',
    },
    editMode: this.props.editMode,
  }

  onChange = (event) => {
    event.persist();
    this.setState((prevState) => {
      const address = { ...prevState.address };
      address[event.target.id] = event.target.type === 'date'
        ? moment(event.target.value).format(DATE_FORMAT_API)
        : event.target.value;
      return { address };
    });
  }

  setDisplayMode(bool) {
    this.setState({
      editMode: bool,
    });
  }

  cancelButton = () => {
    if (this.state.editMode) {
      this.setState({ editMode: false });
    } else {
      this.props.changeDisplayMode();
    }
  }

  saveButton = () => {
    const now = moment().format(DATE_FORMAT_API);
    let meta = { created_by: 'user', created_at: now };
    if (this.props.lifecycle) {
      meta = { ...this.props.lifecycle, modified_by: 'user', modified_at: now };
    }
    const newAddress = {
      ...this.props.address,
      ...this.state.address,
      meta: { ...meta },
      input_address: this.props.inputAddress || this.prevPropsprops.address.inputAddress,
    };
    Object.keys(newAddress).forEach(key => !newAddress[key] && delete newAddress[key]);
    this.props.saveAddress(newAddress);
    this.setState({ editMode: false });
  }

  render() {
    // when no geoloc is available, it should display only the input address (other component?)
    let saveButton = null;
    if (this.state.editMode) {
      saveButton = (
        <Button id="save" onClick={this.saveButton}>
          <i className="fas fa-save" />
        </Button>);
    }
    const { coordinates } = this.props.address;
    return (
      <div className={classes.Address}>
        <ErrorMessage visible={this.props.hasErrored}>Erreur lors de l&#39;envoi du formulaire</ErrorMessage>

        <div className="columns is-marginless is-gapless">
          <div className="column">
            <FieldTitle>Informations générales</FieldTitle>
          </div>
          <div className="column has-text-right">
            <Button onClick={this.cancelButton}>
              <i className="fas fa-undo" />
            </Button>
          </div>
        </div>

        <div className="columns is-marginless">
          <AddressField
            label="Statut"
            onClick={() => this.setDisplayMode(true)}
          >
            <Status
              editMode={this.state.editMode}
              onChange={this.onChange}
              onClick={() => this.setDisplayMode(true)}
              fieldValue={this.state.address.status}
            />
          </AddressField>
        </div>
        <div className="columns is-marginless">
          <AddressField
            label="Début"
            onClick={() => this.setDisplayMode(true)}
          >
            <InputDate
              editMode={this.state.editMode}
              id="start_date"
              fieldValue={this.state.address.start_date}
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
          <AddressField
            label="Fin"
            onClick={() => this.setDisplayMode(true)}
          >
            <InputDate
              editMode={this.state.editMode}
              fieldValue={this.state.address.end_date}
              id="end_date"
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
        </div>
        <div className="columns is-marginless">
          <AddressField
            label="Adresse brute"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={false}
              fieldValue={this.props.address.input_address}
              size="large"
            />
          </AddressField>
        </div>
        <div className="columns is-marginless">
          <AddressField
            label="Numéro"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={this.state.editMode}
              fieldValue={this.state.address.housenumber}
              id="housenumber"
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
        </div>
        <div className="columns is-marginless">
          <AddressField
            label="Rue"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={this.state.editMode}
              fieldValue={this.state.address.street}
              id="street"
              onChange={this.onChange}
              onClick={() => this.setDisplayMode(true)}
              size="large"
            />
          </AddressField>
        </div>
        <div className="columns is-marginless">
          <AddressField
            label="Code postal"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={this.state.editMode}
              fieldValue={this.state.address.postcode}
              id="postcode"
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
          <AddressField
            label="Code commune"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={this.state.editMode}
              fieldValue={this.state.address.citycode}
              id="citycode"
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
        </div>
        <div className="columns is-marginless">
          <AddressField
            label="Ville"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={this.state.editMode}
              fieldValue={this.state.address.city}
              id="city"
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
          <AddressField
            label="Pays"
            onClick={() => this.setDisplayMode(true)}
          >
            <Input
              editMode={this.state.editMode}
              fieldValue={this.state.address.country}
              id="country"
              onChange={this.onChange}
              size="large"
            />
          </AddressField>
        </div>
        <FieldTitle>
          Coordonnées GPS
        </FieldTitle>
        <div className={classes.ContentLines}>
          {coordinates ? (
            <div className="columns is-marginless">
              <AddressField
                label="Longitude"
                onClick={() => this.setDisplayMode(true)}
              >
                <Input
                  editMode={false}
                  fieldValue={coordinates.coordinates[1].toFixed(5)}
                  onChange={this.onChange}
                  size="large"
                />
              </AddressField>
              <AddressField
                label="Latitude"
                editMode={false}
                onClick={() => this.setDisplayMode(true)}
              >
                <Input
                  fieldValue={coordinates.coordinates[0].toFixed(5)}
                  onChange={this.onChange}
                  size="large"
                />
              </AddressField>
              <AddressField
                label="Score"
                editMode={false}
                onClick={() => this.setDisplayMode(true)}
              >
                <Tag
                  color={this.props.address.score > 0.5 ? 'has-background-info' : 'has-background-warning'}
                  tagValue={this.props.address.score.toFixed(2)}
                />
              </AddressField>
            </div>) : 'Non géolocalisé'}
          </div>
        {this.props.lifecycle ? (
          <Aux>
            <FieldTitle>
              Cycle de vie
            </FieldTitle>
            <div className="column">
              <LifeCycle
                created_at={this.props.lifecycle.created_at}
                created_by={this.props.lifecycle.created_by}
                modified_at={this.props.lifecycle.modified_at}
                modified_by={this.props.lifecycle.modified_by}
              />
            </div>
          </Aux>) : null}
        <div className="columns is-marginless">
          <div className="column" />
          <div className="column has-text-right">
            <Button onClick={this.props.deleteButton}>
              <i className="fas fa-trash-alt" />
            </Button>
          </div>
          <div className="column has-text-right">
            {saveButton}
          </div>
        </div>
      </div>
    );
  }
}


export default AddressFull;

AddressFull.propTypes = {
  address: PropTypes.object.isRequired,
  changeDisplayMode: PropTypes.func,
  deleteButton: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  inputAddress: PropTypes.string,
  lifecycle: PropTypes.object,
  saveAddress: PropTypes.func.isRequired,
  status: PropTypes.string,
};
