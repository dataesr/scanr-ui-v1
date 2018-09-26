import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';
import { STATUS_ARRAY } from '../../../../../config/config';


class FieldEditMode extends Component {
  state = {
    fieldValue: this.props.fieldValue,
    status: this.props.status,
  };

  changeSelectHandler = (event) => {
    // implement two way binding for select
    console.log(event);
  }

  changeInputHandler = (event) => {
    this.setState({ fieldValue: event.target.id });
  }

  saveButtonHandler = () => {
    // doit faire appel à la methode edit en reformattant en objet
  }

  deleteButtonHandler = () => {
    // doit faire appel à la méthode delete en reformattant en objet
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

    return (
      <div className>
        <div className="columns">
          <div className="column">
            <input
              type="text"
              className="input is-rounded"
              value={this.state.fieldValue}
              onChange={this.changeInputHandler}
            />
          </div>
          <div className="column is-narrow">
            <div className="select is-rounded">
              <select value={this.state.status} onChange={this.changeSelectHandler}>
                <option value="empty">- Empty -</option>
                {STATUS_ARRAY.map(status => (
                  <option key={status} value={status}>{status}</option>))}
              </select>
            </div>
          </div>
          <div className="column is-narrow">
            <span className="tag is-light is-medium is-rounded">{this.props.source}</span>
          </div>
          <div className="column is-one-fifth has-text-right">
            <Button onClick={this.saveButtonHandler}>
              <i className="fas fa-save" />
            </Button>
            {deleteButton}
            <Button onClick={this.props.cancel}>
              <i className="fas fa-undo-alt" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default FieldEditMode;


FieldEditMode.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  cancel: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  save: PropTypes.func.isRequired,
  source: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
