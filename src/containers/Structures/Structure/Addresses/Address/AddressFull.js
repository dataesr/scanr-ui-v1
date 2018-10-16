/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import Aux from '../../../../../hoc/Aux';
import Button from '../../../../../UI/Button/Button';
import ErrorMessage from '../../../../../UI/Messages/ErrorMessage';
import FieldTitle from '../../../../../UI/Field/FieldTitle';
import LifeCycle from '../../../../../UI/Field/LifeCycle';
import StatusField from '../../../../../UI/Field/StatusField';
import StringField from '../../../../../UI/Field/StringField';
/* CSS */
import classes from './Address.scss';

class AddressFull extends Component {
  state={
    address: {
      housenumber: this.props.address.housenumber || this.props.address.house_number || '',
      street: this.props.address.street || '',
      postcode: this.props.address.postcode || this.props.address.post_code || '',
      citycode: this.props.address.citycode || this.props.address.city_code || '',
      city: this.props.address.city || '',
      country: this.props.address.country || '',
      status: this.props.status,
    },
    editMode: this.props.editMode,
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.address) !== JSON.stringify(this.props.address)) {
      this.setState({ editMode: false });
    }
  }

  onChange = (event) => {
    event.persist();
    this.setState((prevState) => {
      const address = { ...prevState.address };
      address[event.target.id] = event.target.value;
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
    const newAddress = { ...this.props.address, ...this.state.address };
    this.props.saveAddress(newAddress);
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
    return (
      <div className={classes.Address}>
        <ErrorMessage visible={this.props.hasErrored}>Erreur lors de l&#39;envoi du formulaire</ErrorMessage>
        <div className={`columns is-multiline is-marginless ${this.state.editMode ? null : 'is-gapless'}`}>
          <FieldTitle columnSize="10">
            Informations générales
          </FieldTitle>
          <div className="column is-2 has-text-right">
            <Button onClick={this.cancelButton}>
              <i className="fas fa-undo" />
            </Button>
          </div>
          <StatusField
            editMode={this.state.editMode}
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
            status={this.state.address.status}
          />
          <StringField
            editMode={this.state.editMode}
            fieldValue={this.state.address.housenumber}
            id="housenumber"
            label="Numéro"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            editMode={this.state.editMode}
            fieldValue={this.state.address.street}
            id="rue"
            label="Rue"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            columnSize="3"
            editMode={this.state.editMode}
            fieldValue={this.state.address.postcode}
            id="postcode"
            label="Code postal"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            columnSize="3"
            editMode={this.state.editMode}
            fieldValue={this.state.address.citycode}
            id="citycode"
            label="Code commune"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            editMode={this.state.editMode}
            fieldValue={this.state.address.city}
            id="city"
            label="Ville"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            editMode={this.state.editMode}
            fieldValue={this.state.address.country}
            id="country"
            label="Pays"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <FieldTitle>
            Coordonnées GPS
          </FieldTitle>
          <StringField
            columnSize="3"
            editMode={false}
            fieldValue={this.props.coordinates ? this.props.coordinates[1].toFixed(5) : '.'}
            label="Longitude"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            columnSize="3"
            editMode={false}
            fieldValue={this.props.coordinates ? this.props.coordinates[0].toFixed(5) : '.'}
            label="Latitude"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          {this.props.lifecycle ? (
            <Aux>
              <FieldTitle>
                Cycle de vie
              </FieldTitle>
              <LifeCycle
                created_at={this.props.lifecycle.created_at}
                created_by={this.props.lifecycle.created_by}
                modified_at={this.props.lifecycle.modified_at}
                modified_by={this.props.lifecycle.modified_by}
              />
            </Aux>) : null}
          <div className="column is-8" />
          <div className="column is-2 has-text-right">
            <Button onClick={this.props.deleteButton}>
              <i className="fas fa-trash-alt" />
            </Button>
          </div>
          <div className="column is-2 has-text-right">
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
  coordinates: PropTypes.array,
  deleteButton: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  hasErrored: PropTypes.bool.isRequired,
  lifecycle: PropTypes.object,
  saveAddress: PropTypes.func.isRequired,
  status: PropTypes.string,
};
