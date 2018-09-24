/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
/* Composants internes */
import Aux from '../../../../hoc/Aux';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* Css */
import classes from '../Structure.css';

class SimpleField extends Component {
  state = {
    structureId: this.props.structureId,
    name: this.props.name,
    value: this.props.fieldValue,
    mode: 'readonly',
  };

  changeInputHandler = (event) => {
    const newState = { ...this.state };
    newState.value = event.target.value;
    this.setState(newState);
  }

  saveButtonHandler = () => {
    const obj = {};
    const key = this.state.name;

    obj.scanr_id = this.state.structureId;
    obj[key] = this.state.value;
    const data = { data: [obj] };

    axios(
      {
        method: 'POST',
        url: `${API_END_POINT}structures/${key}`,
        responseType: 'json',
        data: JSON.stringify(data),
      },
    ).then(
      (response) => {
        if (response.status === 200) {
          const newState = { ...this.state };
          newState.mode = 'readonly';
          this.setState(newState);
        }
      },
    );
  }

  cancelButtonHandler() {
    const newState = { ...this.state };
    newState.mode = 'readonly';
    this.setState(newState);
  }

  modifyButtonHandler() {
    const newState = { ...this.state };
    newState.mode = 'modify';
    this.setState(newState);
  }

  render() {
    let value = this.state.value;
    let buttons = null;

    if (!this.props.readOnly) {
      buttons = (
        <button
          type="button"
          onClick={() => this.modifyButtonHandler()}
          className={`button is-light ${classes.space_5}`}
        >
          <i className="fas fa-pen" />
        </button>
      );
    }


    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if (this.state.mode === 'modify') {
      // bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      value = (
        <input
          type="text"
          className="input is-rounded"
          value={value || ''}
          onChange={this.changeInputHandler}
        />
      );

      buttons = (
        <Aux>
          <button
            type="button"
            onClick={this.saveButtonHandler}
            className={`button is-light  ${classes.space_5}`}
          >
            <i className="fas fa-save" />
          </button>
          <button
            type="button"
            onClick={() => this.cancelButtonHandler()}
            className={` button is-light  ${classes.space_5}`}
          >
            <i className="fas fa-undo-alt" />
          </button>
        </Aux>
      );
    }


    return (
      <div className="columns">
        <div className="column is-one-fifth">
          <span className="has-text-weight-semibold">
            {this.props.fieldName}
            {' '}
:
          </span>
        </div>
        <div className="column">
          {value}
        </div>
        <div className="column is-one-fifth has-text-right">
          {buttons}
        </div>
      </div>
    );
  }
}

SimpleField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  structureId: PropTypes.string.isRequired,
};

export default SimpleField;
