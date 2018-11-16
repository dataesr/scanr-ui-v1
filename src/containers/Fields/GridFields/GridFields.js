import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import axios from '../../../axios';

import {
  ERREUR_PATCH,
  DATE_FORMAT_API,
  NO_NULL_RULE,
  STATUS_RULE,
  USER,
}
  from '../../../config/config';

import BtAdd from '../../../UI/Field/btAdd';
import BtShowAll from '../../../UI/Field/BtShowAll';
import Button from '../../../UI/Button/Button';
import ErrorMessage from '../../../UI/Messages/ErrorMessage';
import InfoMessage from '../../../UI/Messages/InfoMessage';
import SortStatus from '../../../Utils/SortStatus';
import validate from '../../../Utils/validations';

import classes from './GridFields.scss';

class GridFields extends Component {
  state = {
    editMode: false,
    newRow: null,
    data: this.props.data || [],
    errorMessage: null,
    showAll: false,
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({ data: this.props.data });
    }
  }

  toggleShowAllHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  BtAddHandler = () => {
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
    const index = this.state.data.findIndex(item => (
      typeof item === 'object' ? item.meta.id === itemId : item === itemId));
    if (index < 0 || !itemId) {
      this.setState({ newRow: null });
    } else {
      const data = [...this.state.data];
      data.splice(index, 1);
      data.forEach((dataRow) => {
        if (typeof dataRow.code === 'object') {
          dataRow.code = dataRow.code.id;
        }
        if (typeof dataRow.parent_id === 'object') {
          dataRow.parent_id = dataRow.parent_id.id;
        }
        if (typeof dataRow.predecessor_id === 'object') {
          dataRow.predecessor_id = dataRow.predecessor_id.id;
        }
      });
      this.axiosCall(data);
    }
  }


  toggleEditMode = (bool) => {
    if (!bool) {
      this.setState({ data: this.props.data, newRow: null });
    }
    this.setState({ editMode: bool });
  }

  onChangeStringHandler = (event, index) => {
    event.persist();
    const value = event.target.value || event.target.getAttribute('data-value');
    this.setState((prevState) => {
      const data = prevState.data ? [...prevState.data] : [];
      if (index < 0) {
        return {
          newRow: {
            key: value,
          },
        };
      }
      data[index] = value;
      return {
        data,
      };
    });
  }

  onChangeObjectHandler = (event, id) => {
    event.persist();
    const value = event.target.value || event.target.getAttribute('data-value');
    this.setState((prevState) => {
      const now = moment().format(DATE_FORMAT_API);
      const data = prevState.data ? [...prevState.data] : [];
      const index = data.findIndex(item => item.meta.id === id);
      if (index < 0) {
        const itemToUpdate = { ...prevState.newRow };
        itemToUpdate.meta = {
          created_by: USER,
          created_at: now,
        };
        itemToUpdate[event.target.id] = event.target.type === 'date'
          ? moment(value).format(DATE_FORMAT_API) : value;
        return {
          newRow: itemToUpdate,
          showAll: value === 'old' ? true : prevState.showAll,
        };
      }
      const itemToUpdate = { ...data[index] };
      itemToUpdate[event.target.id] = event.target.type === 'date'
        ? moment(value).format(DATE_FORMAT_API) : value;
      const meta = {
        ...itemToUpdate.meta,
        modified_by: USER,
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
    const data = this.state.data ? [...this.state.data] : [];
    data.forEach((dataRow) => {
      if (typeof dataRow.code === 'object') {
        dataRow.code = dataRow.code.id;
      }
      if (typeof dataRow.parent_id === 'object') {
        dataRow.parent_id = dataRow.parent_id.id;
      }
      if (typeof dataRow.predecessor_id === 'object') {
        dataRow.predecessor_id = dataRow.predecessor_id.id;
      }
    });
    if (this.state.newRow) {
      const newRow = { ...this.state.newRow };
      Object.keys(this.state.newRow).forEach(key => !newRow[key] && delete newRow[key]);
      if (newRow.key) {
        data.push(newRow.key);
        return this.axiosCall(data);
      }
      data.push(newRow);
    }
    const validation = validate(data, this.props.description);
    if (validation === true) {
      return this.axiosCall(data);
    }
    this.setState({ errorMessage: validation });
    return null;
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
    if (!data || data.length === 0) {
      return <InfoMessage>{this.state.newRow ? '' : this.props.infoMessage}</InfoMessage>;
    }

    return data.map((dataItem) => {
      let deleteButton = null;
      const itemId = typeof dataItem === 'object' ? dataItem.meta.id : dataItem;
      if (this.state.editMode) {
        deleteButton = (
          <Button onClick={() => this.delete(itemId)}>
            <i className="fas fa-trash" />
          </Button>
        );
      }
      return (
        <tr key={itemId}>
          {this.renderRow(dataItem, false)}
          <td>
            {deleteButton}
          </td>
        </tr>
      );
    });
  }

  renderRow(row, isNew) {
    return this.props.description.map((field, index) => {
      if (field.isShown) {
        let editMode = true;
        let id = -1;
        if (!isNew) {
          ({ editMode } = this.state);
          id = this.props.description.length === 1 ? index : row.meta.id;
        }
        editMode = field.isEditable ? editMode : false;
        const onChange = this.props.description.length === 1 ? this.onChangeStringHandler : this.onChangeObjectHandler;
        return (
          <td key={`${field.key}-${id}`}>
            {React.cloneElement(
              field.component, {
                ...field.component.props,
                canBeNull: field.rules && field.rules.includes(NO_NULL_RULE),
                editMode,
                id: field.key,
                fieldValue: typeof row === 'object' ? row[field.key] : row,
                noMain: field.rules && field.rules.includes(STATUS_RULE),
                onChange: event => onChange(event, id),
                onClick: () => this.toggleEditMode(true),
                typesList: this.props.typesList,
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
        <Fragment>
          <Button onClick={this.save}>
            <i className="fas fa-save" />
          </Button>
          <Button onClick={() => this.toggleEditMode(false)}>
            <i className="fas fa-undo" />
          </Button>
        </Fragment>
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
      }
      nbData = this.state.data.length;
    }
    return (
      <div className={classes.GridFields}>
        <div>
          <div className={classes.TextTitleInline}>
            {this.props.title}
            &nbsp;
            <span className="tag is-white is-rounded">{nbData}</span>
          </div>

          {this.props.newField && (
            <BtAdd onClick={this.BtAddHandler}>
              {this.props.newField}
            </BtAdd>)}
          {saveAndCancelButtons}
          <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
        </div>
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
        </div>
        {oldStatusObject && (
          <BtShowAll
            onClick={this.toggleShowAllHandler}
            showAll={this.state.showAll}
            label="anciens champs"
          />)}

      </div>
    );
  }
}

export default GridFields;

GridFields.propTypes = {
  data: PropTypes.array,
  description: PropTypes.array.isRequired,
  refreshFunction: PropTypes.func.isRequired,
  infoMessage: PropTypes.string.isRequired,
  newField: PropTypes.string,
  schemaName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  typesList: PropTypes.array,
  url: PropTypes.string.isRequired,
};
