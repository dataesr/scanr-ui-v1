import React, { Component } from 'react';

import axios from 'axios';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import {
  API_END_POINT,
  ERREUR_PATCH,
  DATE_FORMAT_API,
}
  from '../../../config/config';

import BtAdd from '../../../UI/Field/btAdd';
import Button from '../../../UI/Button/Button';
import ErrorMessage from '../../../UI/Messages/ErrorMessage';
import InfoMessage from '../../../UI/Messages/InfoMessage';

import classes from './NomenclatureField.scss';

class NomenclatureField extends Component {
  state = {
    newRow: null,
    data: this.props.data,
    errorMessage: null,
    infoMessage: false,
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: this.props.data })
    }
  }

  BtAddHandler = () => {
    // Ajout d'une ligne vide
    const emptyRow = {};
    for (let i = 0; i < this.props.description.length; i += 1) {
      emptyRow[this.props.description[i].key] = null;
    }
    this.setState({ newRow: emptyRow });
  }

  axiosCall = (data, itemId, itemIndex) => {
    // Objet en fonction des props description
    const dataObject = {
      level: data[itemIndex].level || null,
      name_en: data[itemIndex].name_en || null,
      name_fr: data[itemIndex].name_fr || null,
      subname_en: data[itemIndex].subname_en || null,
      subname_fr: data[itemIndex].subname_fr || null,
    };
    const url = `${API_END_POINT}${this.props.url}/${itemId}`;

    axios.patch(url, dataObject, {
      headers: { 'If-Match': data[itemIndex].etag },
    }).then(
      (response) => {
        if (response.status === 200) {
          this.setState({
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

  toggleEditModeRow = (itemId) => {
    const index = this.state.data.findIndex(item => item.id === itemId);
    const updatedData = [...this.state.data];
    // Suppression de la clé EditMode si elle existe pour passer en mode lecture
    if (this.state.data[index].editMode) {
      delete updatedData[index].editMode;
    } else { // Sinon ajout de la clé EditMode
      updatedData[index].editMode = true;
    }
    this.setState({ data: updatedData });
  }

  onChangeHandler = (event, id) => {
    event.persist();
    this.setState((prevState) => {
      const data = [...prevState.data];
      const index = data.findIndex(item => item.id === id);
      if (index < 0) {
        const itemToUpdate = { ...prevState.newRow };
        itemToUpdate[event.target.id] = event.target.value;
        return {
          newRow: itemToUpdate,
        };
      }
      const itemToUpdate = { ...data[index] };
      itemToUpdate[event.target.id] = event.target.value;
      data[index] = itemToUpdate;

      return { data };
    });
  }

  paginationNext = () => {
    this.props.refreshFunction('next');
  }

  paginationPrevious = () => {
    this.props.refreshFunction('prev');
  }

  save = (itemId) => {
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

    // Suppression de la clé editMode
    this.toggleEditModeRow(itemId);

    // Enregistrement API
    const index = this.state.data.findIndex(item => item.id === itemId);
    this.axiosCall(data, itemId, index);
  }

  renderHeader() {
    return this.props.description.map((field) => {
      if (field.isShown) {
        const direction = this.props.sortDirection === 1 ? 'down' : 'up';
        const sortIcon = (
          <span className={classes.SortIcon}>
            <i className={`fas fa-sort-alpha-${direction} ${classes.SortIcon}`} />
          </span>
        );

        return (
          <th
            key={field.key}
            style={field.style}
            onClick={() => this.props.changeDirection(field.key)}
            className={classes.Th}
          >
            {field.displayLabel}
            {field.key === this.props.sortField && sortIcon}
          </th>
        );
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
      let undoButton = null;
      let saveButton = null;
      if (dataObject.editMode) {
        deleteButton = (
          <Button onClick={() => this.delete(dataObject.id)}>
            <i className="fas fa-trash" />
          </Button>
        );
        undoButton = (
          <Button onClick={() => this.toggleEditModeRow(dataObject.id)}>
            <i className="fas fa-undo" />
          </Button>
        );
        saveButton = (
          <Button onClick={() => this.save(dataObject.id)}>
            <i className="fas fa-save" />
          </Button>
        );
      }
      return (
        <tr key={dataObject.id}>
          {this.renderRow(dataObject, false)}
          <td>
            <div className={classes.LastTableColumn}>
              <ul>
                <li>
                  <p
                    className={`${classes.InfoMeta}`}
                    data-tip={`Créé le <b>${moment(dataObject.created_at).format('LL')}</b>
                    <br/> Modifié le <b>${moment(dataObject.modified_at).format('LL')}</b>`}
                    data-place="left"
                  >
                    <i className="fas fa-info-circle" />
                  </p>
                </li>
                <li>
                  {deleteButton}
                </li>
                <li>
                  {undoButton}
                </li>
                <li>
                  {saveButton}
                </li>
              </ul>
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
          editMode = row.editMode;
          id = row.id;
        }
        return (
          <td key={`${field.key}-${id}`}>
            {React.cloneElement(
              field.component, {
                canBeNull: field.rules && field.rules.canBeNull,
                editMode: editMode && field.isEditable,
                id: field.key,
                fieldValue: row[field.key],
                noMain: field.rules && field.rules.noMain,
                schemaName: this.props.schemaName,
                // onChange: () => console.log('coucou'),
                onChange: event => this.onChangeHandler(event, id),
                onClick: () => this.toggleEditModeRow(id),
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
    return (
      <div className={classes.NomenclatureField}>
        <div className="columns is-marginless">
          <div className="column">
            <div className={classes.TextTitleInline}>
              {this.props.title}
              <span className={`tag is-white is-rounded ${classes.SpaceTag}`}>{this.props.total}</span>
            </div>
            <BtAdd onClick={this.BtAddHandler}>
              {this.props.label}
            </BtAdd>
          </div>
          <div className="column">
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
          </div>
          <div className="column is-2">
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
              <button
                type="button"
                className="pagination-previous"
                onClick={this.paginationPrevious}
              >
                Précédent
              </button>
              <button
                type="button"
                className="pagination-next"
                onClick={this.paginationNext}
              >
                Suivant
              </button>
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
                  {this.renderBody(this.state.data)}
                </tbody>
              </table>
            </div>)}

        <div className="columns is-marginless">
          <div className="column is-10" />
          <div className="column is-2">
            <nav className="pagination is-rounded" role="navigation" aria-label="pagination">
              <button
                type="button"
                className="pagination-previous"
                onClick={this.paginationPrevious}
              >
                Précédent
              </button>
              <button
                type="button"
                className="pagination-next"
                onClick={this.paginationNext}
              >
                Suivant
              </button>
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
  changeDirection: PropTypes.func.isRequired,
  data: PropTypes.array,
  description: PropTypes.array.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  infoMessage: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  schemaName: PropTypes.string.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
};
