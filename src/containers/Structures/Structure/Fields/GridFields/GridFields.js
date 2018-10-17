import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../../axios';

import Aux from '../../../../../hoc/Aux';
import BtAdd from '../../../../../UI/Field/btAdd';
import Button from '../../../../../UI/Button/Button';

import classes from './GridFields.scss';

class GridFields extends Component {
  state = {
    editMode: false,
    newRow: null,
  }

  namesEditModeHandler = () => {
    this.setState(prevState => ({ editMode: !prevState.editMode }));
  }

  namesNewHandler = () => {
    // Ajout d'une ligne vide
    let emptyRow = {};
    for (let i = 0; i < this.props.description.length; i++) {
      emptyRow[this.props.description[i]] = null;
    }
    this.setState({ newRow: emptyRow });
  }

  axiosCall = (dataObject) => {
    const url = `structures/${this.props.structureId}`;
    axios.put(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            console.log('envoi axios ok');
          }
        },
      );
  };

  edit = (updatedAddress) => {
    const updatedAddressesList = [...this.props.addresses];
    const addressIndex = updatedAddressesList.findIndex(address => address.id === updatedAddress.id);
    updatedAddressesList[addressIndex] = updatedAddress;
    this.addressAxiosCall(updatedAddressesList);
  }

  delete = (addressId) => {
    const editedAddressIndex = this.props.addresses.findIndex(name => name.id === addressId);
    const updatedAddressesList = [...this.props.addresses];
    updatedAddressesList.splice(editedAddressIndex, 1);
    this.addressAxiosCall(updatedAddressesList);
  };

  createLine(row, forceEditable) {
    let editMode = forceEditable ? true : this.state.editMode;
    const tD = this.props.description.map((field) => {
      if (field.isShown) {
        editMode = field.isEditable ? editMode : false;
        return (
          <td>
            {React.cloneElement(
              field.component,
              { editMode, fieldValue: row[field.key] },
            )}
          </td>
        );
      }
      return null;
    });
    return <tr>{tD}</tr>;
  }

  render() {
    // Parcours de la description
    // Récupération des libellés d'entete pour le tHead
    const tH = this.props.description.map((field) => {
      if (field.isShown) {
        return <th key={field.key}>{field.displayLabel}</th>;
      }
      return null;
    });
    const tHead = <thead>{tH}</thead>;

    // Pour chaque ligne de l'objet de données,
    const tBody = this.props.data.map(row => (
      this.createLine(row, false)
    ));

    // Ajout de la nouvelle ligne si le bouton a été cliqué
    let newRow = null;
    if (this.state.newRow) {
      newRow = this.createLine(this.state.newRow, true);
    }

    return (
      <Aux className={classes.GridFields}>
        <div>
          <div className={classes.TextTitleInline}>{this.props.title}</div>
          <Button onClick={this.namesEditModeHandler}>
            {this.state.editMode ? <i className="fas fa-undo-alt" /> : <i className="fas fa-pen" />}
          </Button>
          <BtAdd onClick={this.namesNewHandler}>
            {this.props.addNewLabel}
          </BtAdd>
        </div>
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          {tHead}
          {newRow}
          {tBody}
        </table>
      </Aux>
    );
  }
}

export default GridFields;

GridFields.propTypes = {
  structureId: PropTypes.string,
  addNewLabel: PropTypes.string,
  description: PropTypes.array,
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};
