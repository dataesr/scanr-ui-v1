import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

import axios from '../../../axios';

import { ERREUR_STATUT, ERREUR_NULL, ERREUR_PATCH, DATE_FORMAT_API } from '../../../config/config';
import Aux from '../../../hoc/Aux';

import BtAdd from '../../../UI/Field/btAdd';
import BtShowAll from '../../../UI/Field/BtShowAll';
import Button from '../../../UI/Button/Button';
import ErrorMessage from '../../../UI/Messages/ErrorMessage';
import InfoMessage from '../../../UI/Messages/InfoMessage';
import mainValidation from '../../../Utils/mainValidation';
import SortStatus from '../../../Utils/SortStatus';

import classes from './GridFields.scss';

class GridFields extends Component {
  state = {
    editMode: false,
    newRow: null,
    data: this.props.data,
    errorMessage: null,
    showAll: false,
    infoMessage: false,
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
    axios.patch(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              editMode: false,
              errorMessage: null,
              newRow: null,
              data,
            });
            this.props.getStructure();
          }
        },
      )
      .catch(() => this.setState({ errorMessage: ERREUR_PATCH }));
  };

  delete = (itemId) => {
    const index = this.state.data.findIndex(item => item.meta.id === itemId);
    if (index < 0 || !itemId) {
      this.setState({ newRow: null });
    } else {
      const updatedData = [...this.state.data];
      updatedData.splice(index, 1);
      this.axiosCall(updatedData);
    }
  };


  toggleEditMode = (bool) => {
    if (!bool) {
      this.setState({ data: this.props.data, newRow: null });
    }
    this.setState({ editMode: bool });
  }

  onChangeHandler = (event, id) => {
    event.persist();
    this.setState((prevState) => {
      const now = moment().format(DATE_FORMAT_API);
      const data = [...prevState.data];
      const index = data.findIndex(item => item.meta.id === id);
      if (index < 0) {
        const itemToUpdate = { ...prevState.newRow };
        itemToUpdate.meta = {
          created_by: 'user',
          created_at: now,
        };
        itemToUpdate[event.target.id] = event.target.value;
        return {
          newRow: itemToUpdate,
          showAll: event.target.value === 'old' ? true : prevState.showAll,
        };
      }
      const itemToUpdate = { ...data[index] };
      itemToUpdate[event.target.id] = event.target.type === 'date'
        ? moment(event.target.value).format(DATE_FORMAT_API)
        : event.target.value;
      const meta = {
        ...itemToUpdate.meta,
        modified_by: 'user',
        modified_at: now,
      };
      itemToUpdate.meta = meta;
      data[index] = itemToUpdate;

      return {
        data,
        showAll: event.target.value === 'old' ? true : prevState.showAll,
      };
    });
  }

  save = () => {
    const data = [...this.state.data];
    if (this.state.newRow) {
      const newRow = { ...this.state.newRow };
      Object.keys(this.state.newRow).forEach(key => !newRow[key] && delete newRow[key]);
      data.push(newRow);
    }
    if (this.validate(data)) {
      this.axiosCall(data);
    }
  }

  validate(data) {
    return this.props.description.filter(fieldDescription => fieldDescription.isShown && fieldDescription.rules)
      .reduce((validation, rulesDescription) => {
        let tempValidation = validation;
        if ('canBeNull' in rulesDescription.rules) {
          const nullValidation = data.reduce((tempNullValidation, dataRow) => {
            if (rulesDescription.key in dataRow) {
              return Boolean(dataRow[rulesDescription.key]) && tempNullValidation;
            }
            return tempNullValidation;
          }, true);
          if (!nullValidation) {
            this.setState({ errorMessage: ERREUR_NULL });
          }
          tempValidation = tempValidation && nullValidation;
        }
        if ('mainStatus' in rulesDescription.rules) {
          const mainStatusValidation = mainValidation(data);
          if (!mainStatusValidation) {
            this.setState({ errorMessage: ERREUR_STATUT });
          }
          tempValidation = tempValidation && mainStatusValidation;
        }
        return tempValidation;
      }, true);
  }

  renderHeader() {
    return this.props.description.map((field) => {
      if (field.isShown) {
        return <th key={field.key}>{field.displayLabel}</th>;
      }
      return null;
    });
  }

  renderBody(data) {
    if (!data) {
      return null;
    }

    return data.map((dataObject) => {
      let deleteButton = null;
      if (this.state.editMode) {
        deleteButton = (
          <Button onClick={() => this.delete(dataObject.meta.id)}>
            <i className="fas fa-trash" />
          </Button>
        );
      }
      return (
        <tr key={dataObject.meta.id}>
          {this.renderRow(dataObject, false)}
          <td>
            <div className={classes.LastTableColumn}>
              <p
                className={classes.P}
                data-tip={`Créé le <b>${moment(dataObject.meta.created_at).format('LL')}</b>
                par <b>${dataObject.meta.created_by}</b>
                <br/> Modifié le <b>${moment(dataObject.meta.modified_at).format('LL')}</b>
                par <b>${dataObject.meta.modified_by}</b>`}
              >
                <i className="fas fa-info-circle" />
              </p>
              {deleteButton}
            </div>
          </td>
        </tr>
      );
    });
  }

  renderRow(row, isNew) {
    return this.props.description.map((field) => {
      if (field.isShown) {
        let editMode = true;
        let id = null;
        if (!isNew) {
          editMode = this.state.editMode;
          id = row.meta.id;
        }
        editMode = field.isEditable ? editMode : false;
        return (
          <td key={`${field.key}-${id}`}>
            {React.cloneElement(
              field.component, {
                canBeNull: field.rules && field.rules.canBeNull,
                editMode,
                id: field.key,
                fieldValue: row[field.key],
                noMain: field.roles && field.rules.noMain,
                onChange: event => this.onChangeHandler(event, id),
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

    let oldStatusObject = null;
    let data = null;
    let nbData = 0;
    if (this.props.data) {
      oldStatusObject = this.props.data.find(dataObject => dataObject.status === 'old');
      data = [...this.state.data].sort(SortStatus);
      if (!this.state.showAll) {
        data = data.filter(dataObject => dataObject.status !== 'old');
        if (data.length === 0) {
          this.setState({ infoMessage: true });
        }
      }
      nbData = this.state.data.length;
    }
    return (
      <Aux className={classes.GridFields}>
        <div>
          <div className={classes.TextTitleInline}>
            {this.props.title}
            &nbsp;
            <span className="tag is-white is-rounded">{nbData}</span>
          </div>

          <BtAdd onClick={this.BtAddHandler}>
            {`Ajouter un nouveau champ ${this.props.label}`}
          </BtAdd>

          {saveAndCancelButtons}
          <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
        </div>
        {this.state.infoMessage
          ? <InfoMessage>{this.props.infoMessage}</InfoMessage>
          : (
            <div className={classes.TableContainer}>
              <table className={`table is-striped is-hoverable is-fullwidth ${classes.Table}`}>
                <thead>
                  <tr>
                    {this.renderHeader()}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {newRow}
                  {this.renderBody(data)}
                </tbody>
              </table>
            </div>)}
        {oldStatusObject && (
          <BtShowAll
            onClick={this.toggleShowAllHandler}
            showAll={this.state.showAll}
            label="anciens libellés"
          />)}

        <ReactTooltip html />
      </Aux>
    );
  }
}

export default GridFields;

GridFields.propTypes = {
  data: PropTypes.array,
  description: PropTypes.array.isRequired,
  getStructure: PropTypes.func.isRequired,
  infoMessage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
