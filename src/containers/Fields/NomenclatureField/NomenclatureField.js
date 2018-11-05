import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

import axios from '../../../axios';

import {
  ERREUR_STATUT,
  ERREUR_NULL,
  ERREUR_PATCH,
  DATE_FORMAT_API,
}
  from '../../../config/config';
import Aux from '../../../hoc/Aux';

import BtAdd from '../../../UI/Field/btAdd';
import BtShowAll from '../../../UI/Field/BtShowAll';
import Button from '../../../UI/Button/Button';
import ErrorMessage from '../../../UI/Messages/ErrorMessage';
import InfoMessage from '../../../UI/Messages/InfoMessage';
import SortStatus from '../../../Utils/SortStatus';

import classes from './NomenclatureField.scss';

class NomenclatureField extends Component {
  state = {
    editMode: false,
    newRow: null,
    data: this.props.data,
    errorMessage: null,
    showAll: false,
    infoMessage: false,
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: this.props.data })
    }
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
    axios.patch(this.props.url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              editMode: false,
              errorMessage: null,
              newRow: null,
              data,
            });
            this.props.refreshFunction();
          }
        },
      )
      .catch(() => this.setState({ errorMessage: ERREUR_PATCH }));
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
      const index = data.findIndex(item => item.id === id);
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

  paginationNext = () => {
    this.props.refreshFunction('next');
  }

  paginationPrevious = () => {
    this.props.refreshFunction('prev');
  }

  save = () => {
    const data = [...this.state.data];
    data.forEach((dataRow) => {
      if (typeof dataRow.code === 'object') {
        dataRow.code = dataRow.code.code;
      }
    });
    if (this.state.newRow) {
      const newRow = { ...this.state.newRow };
      Object.keys(this.state.newRow).forEach(key => !newRow[key] && delete newRow[key]);
      data.push(newRow);
    }

    this.axiosCall(data);
  }


  renderHeader() {
    return this.props.description.map((field) => {
      if (field.isShown) {
        return <th key={field.key} style={field.style}>{field.displayLabel}</th>;
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
          <Button onClick={() => this.delete(dataObject.id)}>
            <i className="fas fa-trash" />
          </Button>
        );
      }
      return (
        <tr key={dataObject.id}>
          {this.renderRow(dataObject, false)}
          <td>
            <div className={classes.LastTableColumn}>
              <p
                className={classes.P}
                data-tip={`Créé le <b>${moment(dataObject.created_at).format('LL')}</b>
                <br/> Modifié le <b>${moment(dataObject.modified_at).format('LL')}</b>`}
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
          id = row.id;
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
                noMain: field.rules && field.rules.noMain,
                schemaName: this.props.schemaName,
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
      <div className={classes.NomenclatureField}>
        <div className="columns is-marginless">
          <div className="column">
            <div className={classes.TextTitleInline}>
              {this.props.title}
              <span className={`tag is-white is-rounded ${classes.SpaceTag}`}>{nbData}</span>
            </div>
            <BtAdd onClick={this.BtAddHandler}>
              {`Ajouter un nouveau champ ${this.props.label}`}
            </BtAdd>
            {saveAndCancelButtons}
          </div>
          <div className="column">
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
          </div>
          <div className="column is-2">
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
              <button type="button" className="pagination-previous" onClick={this.paginationPrevious}>Précédent</button>
              <button type="button" className="pagination-next" onClick={this.paginationNext}>Suivant</button>
            </nav>
          </div>
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

        <div className="columns is-marginless">
          <div className="column is-10" />
          <div className="column is-2">
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
              <button type="button" className="pagination-previous" onClick={this.paginationPrevious}>Précédent</button>
              <button type="button" className="pagination-next" onClick={this.paginationNext}>Suivant</button>
            </nav>
          </div>
        </div>

        <ReactTooltip html />
      </div>
    );
  }
}

export default NomenclatureField;

NomenclatureField.propTypes = {
  data: PropTypes.array,
  description: PropTypes.array.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  infoMessage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
