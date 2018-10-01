import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../../UI/Button/Button';
import { STATUS_ARRAY } from '../../../../../../config/config';


class FieldEditMode extends Component {
  state = {
    fieldValue: this.props.fieldValue,
    status: this.props.status,
  };

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  editButtonHandler = () => {
    let editedFields = this.props.fieldValue
    if (this.props.fullEdition) {
      editedFields = {
        fieldValue: this.state.fieldValue,
        status: this.state.status,
        id: this.props.id,
      };
    }
    this.props.edit(editedFields);
  }

  deleteButtonHandler = () => {
    this.props.delete({
      fieldValue: this.state.fieldValue,
      status: this.state.status,
      id: this.props.id,
    });
  }

  render() {
    // Si 1 seul libellé, on ne permet pas la suppression
    let deleteButton = null;
    if (this.props.allowDelete) {
      deleteButton = (
        <Button onClick={this.deleteButtonHandler}>
          <i className="fas fa-trash" />
        </Button>);
    }

    let fullEdition = null;
    if (this.props.fullEdition) {
      fullEdition = (
        <div className="column is-narrow">
          <div className="select is-rounded">
            <select
              id="status"
              value={this.state.status}
              onChange={this.onChange}
            >
              <option value="empty">- Empty -</option>
              {STATUS_ARRAY.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
        </div>);
    }
    return (
      <div className="columns">
        <div className="column is-two-fifth">
          <input
            id="fieldValue"
            type="text"
            className="input is-rounded"
            value={this.state.fieldValue}
            onChange={this.onChange}
          />
        </div>
        {fullEdition}
        <div className="column is-one-fifth has-text-right">
          <Button onClick={this.editButtonHandler}>
            <i className="fas fa-save" />
          </Button>
          {deleteButton}
          <Button onClick={this.props.cancel}>
            <i className="fas fa-undo-alt" />
          </Button>
        </div>
      </div>
    );
  }
}

export default FieldEditMode;


FieldEditMode.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  delete: PropTypes.func,
  edit: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  fullEdition: PropTypes.bool.isRequired,
  id: PropTypes.string,
  source: PropTypes.string.isRequired,
  status: PropTypes.string,
};

FieldEditMode.defaultProps = {
  status: 'empty',
};
