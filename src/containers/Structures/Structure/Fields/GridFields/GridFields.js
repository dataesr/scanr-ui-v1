import React, { Component } from 'react';
import PropTypes from 'prop-types';

import axios from '../../../../../axios';

import { ERREUR_STATUT } from '../../../../../config/config';
import Aux from '../../../../../hoc/Aux';
import BtAdd from '../../../../../UI/Field/btAdd';
import BtShowAll from '../../../../../UI/Field/BtShowAll';
import Button from '../../../../../UI/Button/Button';
import ErrorMessage from '../../../../../UI/Messages/ErrorMessage';
import mainValidation from '../../../../../Utils/mainValidation';
import SortStatus from '../../../../../Utils/SortStatus';

import classes from './GridFields.scss';

class GridFields extends Component {
  state = {
    editMode: false,
    newRow: null,
    data: this.props.data,
    errorMessage: null,
    showAll: false,
  }

  toggleShowAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  BtAddHandler = () => {
    // Ajout d'une ligne vide
    const emptyRow = {};
    for (let i = 0; i < this.props.description.length; i += 1) {
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

  toggleEditMode = (bool) => {
    if (!bool) {
      this.setState({ data: this.props.data });
    }
    this.setState({ editMode: bool });
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

  renderHeader() {
    return this.props.description.map((field) => {
      if (field.isShown) {
        return <th key={field.key}>{field.displayLabel}</th>;
      }
      return null;
    });
  }

  renderBody() {
    let data = [...this.state.data].sort(SortStatus);
    if (!this.state.showAll) {
      data = data.filter(dataObject => dataObject.status !== 'old');
    }
    return data.map((dataObject) => {
      let deleteButton = null;
      if (this.state.editMode) {
        deleteButton = (
          <td>
            <Button onClick={() => this.delete(dataObject.id)}>
              <i className="fas fa-trash" />
            </Button>
          </td>
        );
      }
      return (
        <tr key={dataObject.id}>
          {this.renderRow(dataObject, false)}
          {deleteButton}
        </tr>
      );
    });
  }

  renderRow(row, forceEditable) {
    return this.props.description.map((field) => {
      if (field.isShown) {
        let editMode = forceEditable ? true : this.state.editMode;
        editMode = field.isEditable ? editMode : false;
        return (
          <td key={`${field.key}-${row.id}`}>
            {React.cloneElement(
              field.component, {
                editMode,
                id: field.key,
                fieldValue: row[field.key],
                onChange: event => this.onChangeHandler(event, row.id),
                onClick: () => this.toggleEditMode(true),
              },
            )}
          </td>
        );
      }
      return null;
    });
  }

  render() {
    let deleteHeader = null;
    if (this.state.editMode) {
      deleteHeader = <th />;
    }

    let newRow = null;
    if (this.state.newRow) {
      newRow = (
        <tr>
          {this.renderRow(this.state.newRow, true)}
        </tr>);
    }

    let saveAndCancelButtons = null;
    if (this.state.editMode) {
      saveAndCancelButtons = (
        <Aux>
          <Button onClick={this.save}>
            <i className="fas fa-save" />
          </Button>
          <Button onClick={() => this.toggleEditMode(false)}>
            <i className="fas fa-undo" />
          </Button>
        </Aux>
      );
    }

    const oldStatusObject = this.props.data.find(dataObject => dataObject.status === 'old');

    return (
      <Aux className={classes.GridFields}>
        <div>
          <div className={classes.TextTitleInline}>
            {this.props.title}
          </div>

          <BtAdd onClick={this.BtAddHandler}>
            {`Ajouter un nouveau champ ${this.props.label}`}
          </BtAdd>

          {saveAndCancelButtons}
          <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
        </div>
        <table className="table is-striped is-narrow is-hoverable is-fullwidth">
          <thead>
            <tr>
              {this.renderHeader()}
              {deleteHeader}
            </tr>
          </thead>
          <tbody>
            {newRow}
            {this.renderBody()}
          </tbody>
        </table>
        {oldStatusObject ? (
          <BtShowAll
            onClick={this.toggleShowAllHandler}
            showAll={this.state.showAll}
            label="anciens libellés"
          />) : null}
      </Aux>
    );
  }
}

export default GridFields;

GridFields.propTypes = {
  data: PropTypes.array.isRequired,
  description: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
