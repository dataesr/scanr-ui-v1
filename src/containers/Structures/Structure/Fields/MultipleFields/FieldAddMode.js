import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';
import { STATUS_ARRAY } from '../../../../../config/config';


class FieldAddMode extends Component {
  state = {
    fieldValue: '',
    status: 'main',
  };

  onChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  }

  addButtonHandler = () => {
    this.props.add({
      fieldValue: this.state.fieldValue,
      status: this.state.status,
    });
  }

  render() {
    return (
      <div className="columns">
        <div className="column">
          <input
            id="fieldValue"
            type="text"
            className="input is-rounded"
            value={this.state.fieldValue}
            onChange={this.onChange}
          />
        </div>
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
        </div>
        <div className="column is-narrow">
          <span className="tag is-light is-medium is-rounded">user</span>
        </div>
        <div className="column is-one-fifth has-text-right">
          <Button onClick={this.addButtonHandler}>
            <i className="fas fa-save" />
          </Button>
          <Button onClick={this.props.cancel}>
            <i className="fas fa-undo-alt" />
          </Button>
        </div>
      </div>
    );
  }
}

export default FieldAddMode;


FieldAddMode.propTypes = {
  cancel: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
};
