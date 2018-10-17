import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../../axios';

import { ERREUR_STATUT } from '../../../../../config/config';
import Aux from '../../../../../hoc/Aux';
import BtAdd from '../../../../../UI/Field/btAdd';
import Button from '../../../../../UI/Button/Button';
import ErrorMessage from '../../../../../UI/Messages/ErrorMessage';
import mainValidation from '../../../../../Utils/mainValidation';

import classes from './GridFields.scss';

class GridFields extends Component {
  state = {
    editMode: false,
    newRow: null,
    data: this.props.data,
    errorMessage: null,
  }

  newHandler = () => {
    // Ajout d'une ligne vide
    const emptyRow = {};
    for (let i = 0; i < this.props.description.length; i++) { // REDUCE ?
      emptyRow[this.props.description[i].key] = null;
    }
    this.setState({ newRow: emptyRow, editMode: true });
  }

  axiosCall = (data) => {
    const dataObject = {
      [this.props.schemaName]: data,
    };
    const url = `structures/${this.props.structureId}`;
    axios.put(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              editMode: false,
              errorMessage: null,
              newRow: null,
              data,
            });
          }
        },
      )
      .catch(() => this.setState({ errorMessage: 'erreur' }));
  };

  delete = (itemId) => {
    const index = this.state.data.findIndex(item => item.id === itemId);
    if (index < 0 || !itemId) {
      this.setState({ newRow: null });
    } else {
      const updatedData = [...this.state.data];
      updatedData.splice(index, 1);
      this.axiosCall(updatedData);
    }
  };

  save = () => {
    const data = [...this.state.data];
    if (this.state.newRow) {
      data.push(this.state.newRow);
    }
    if (mainValidation(data)) {
      this.axiosCall(data);
    } else {
      this.setState({ errorMessage: ERREUR_STATUT });
    }
  }

  onClickHandler = () => {
    this.setState({ editMode: true });
  }

  onChangeHandler = (event, id) => {
    event.persist();
    this.setState((prevState) => {
      const now = new Date();
      const data = [...prevState.data];
      const index = data.findIndex(item => item.id === id);
      if (index < 0) {
        const itemToUpdate = { ...prevState.newRow };
        itemToUpdate.created_by = 'user';
        itemToUpdate.created_at = now.toISOString();
        itemToUpdate[event.target.id] = event.target.value;
        return { newRow: itemToUpdate };
      }
      const itemToUpdate = { ...data[index] };
      itemToUpdate[event.target.id] = event.target.value;
      itemToUpdate.modified_by = 'user';
      itemToUpdate.modified_at = now.toISOString();
      data[index] = itemToUpdate;
      return { data };
    });
  }

  createLine(row, forceEditable) {
    let tDDelete = null;
    const tD = this.props.description.map((field) => {
      if (field.isShown) {
        let editMode = forceEditable ? true : this.state.editMode;
        editMode = field.isEditable ? editMode : false;
        return (
          <td>
            {React.cloneElement(
              field.component,
              {
                editMode,
                id: field.key,
                fieldValue: row[field.key],
                onChange: event => this.onChangeHandler(event, row.id),
                onClick: this.onClickHandler
              }
            )}
          </td>
        );
      }
      return null;
    });

    if (this.state.editMode) {
      tDDelete = (
        <td>
          <Button onClick={() => this.delete(row.id)}>
            <i className="fas fa-trash" />
          </Button>
        </td>
      );
    }

    return (
      <tr>
        {tD}
        {tDDelete}
      </tr>
    );
  }

  render() {
    let tHDelete = null;
    // Parcours de la description
    // Récupération des libellés d'entete pour le tHead
    const tH = this.props.description.map((field) => {
      if (field.isShown) {
        return <th key={field.key}>{field.displayLabel}</th>;
      }
      return null;
    });

    if (this.state.editMode) {
      tHDelete = <th />;
    }
    const tHead = (
      <thead>
        {tH}
        {tHDelete}
      </thead>
    );

    // Pour chaque ligne de l'objet de données,
    const tBody = this.state.data.map(row => (
      this.createLine(row, false)
    ));

    // Ajout de la nouvelle ligne si le bouton a été cliqué
    let newRow = null;
    if (this.state.newRow) {
      newRow = this.createLine(this.state.newRow, true);
    }

    let btSave = null;
    if (this.state.editMode) {
      btSave = (
        <Button onClick={this.save}>
          <i className="fas fa-save" />
        </Button>
      );
    }

    return (
      <Aux className={classes.GridFields}>
        <div>
          <div className={classes.TextTitleInline}>
            {this.props.title}
          </div>

          <BtAdd onClick={this.newHandler}>
            {this.props.addNewLabel}
          </BtAdd>

          {btSave}
          <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
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
  addNewLabel: PropTypes.string,
  data: PropTypes.array.isRequired,
  description: PropTypes.array,
  schemaName: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
