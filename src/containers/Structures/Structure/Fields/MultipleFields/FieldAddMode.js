import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../../../hoc/Aux';
import Button from '../../../../../UI/Button/Button';
import ErrorMessage from '../../../../../UI/Messages/ErrorMessage';
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
    const now = new Date();
    this.props.add({
      fieldValue: this.state.fieldValue,
      status: this.state.status,
      source: 'user',
      created_at: now.toISOString(),
    });
  }

  render() {
    return (
      <Aux>
        <div className="columns" onBlur={this.props.onBlur}>
          <div className="column">
            <input
              autoFocus
              className="input is-rounded"
              id="fieldValue"
              onChange={this.onChange}
              type="text"
              value={this.state.fieldValue}
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
            <Button id="save" onClick={this.addButtonHandler}>
              <i className="fas fa-save" />
            </Button>
          </div>
        </div>
        <ErrorMessage>{this.props.mainError}</ErrorMessage>
      </Aux>
    );
  }
}

export default FieldAddMode;


FieldAddMode.propTypes = {
  add: PropTypes.func.isRequired,
  mainError: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
};
