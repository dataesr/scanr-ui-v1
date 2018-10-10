/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
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
      address_1: this.props.address.address_1 || '',
      postal_code: this.props.address.postal_code || '',
      city_code: this.props.address.city_code || '',
      city: this.props.address.city || '',
      country: this.props.address.country || '',
      status: this.props.address.status,
    },
    editMode: false,
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
      this.props.changeDisplayMode('mini');
    }
  }

  saveButton = () => {
    const newAddress = { ...this.props.address, ...this.state.address };
    this.props.editAddress(newAddress);
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
        <ErrorMessage visible={this.props.hasErrored}>"Erreur lors de l'envoi du formulaire"</ErrorMessage>
        <div className="columns is-gapless is-multiline is-marginless">
          <FieldTitle columnSize="10">
            Informations générales
          </FieldTitle>
          <div className="column is-2 has-text-right">
            <Button onClick={this.cancelButton}>
              <i className="fas fa-undo" />
            </Button>
            {saveButton}
          </div>
          <StatusField
            editMode={this.state.editMode}
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
            status={this.state.address.status}
          />
          <StringField
            editMode={this.state.editMode}
            fieldValue={this.state.address.address_1}
            id="address_1"
            label="Addresse"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            columnSize="3"
            editMode={this.state.editMode}
            fieldValue={this.state.address.postal_code}
            id="postal_code"
            label="Code postal"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            columnSize="3"
            editMode={this.state.editMode}
            fieldValue={this.state.address.city_code}
            id="city_code"
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
            fieldValue={this.props.address.coordinates[1] || '.'}
            label="Longitude"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <StringField
            columnSize="3"
            editMode={false}
            fieldValue={this.props.address.coordinates[0] || '.'}
            label="Latitude"
            onChange={this.onChange}
            onClick={() => this.setDisplayMode(true)}
          />
          <FieldTitle>
            Cycle de vie
          </FieldTitle>
          <LifeCycle
            created_at={this.props.address.created_at}
            created_by={this.props.address.created_by}
            modified_at={this.props.address.modified_at}
            modified_by={this.props.address.modified_by}
          />
        </div>
      </div>
    );
  }
}


export default AddressFull;

AddressFull.propTypes = {
  address: PropTypes.object.isRequired,
  changeDisplayMode: PropTypes.func,
  editAddress: PropTypes.func.isRequired,
  hasErrored: PropTypes.bool.isRequired,
};
