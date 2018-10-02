/* Composants externes */
import React, { Component } from 'react';

import PropTypes from 'prop-types';
/* Composants internes */
import Aux from '../../../../../hoc/Aux';

/* Config */
import { STATUS_ARRAY } from '../../../../../config/config';

/* CSS */
import classes from '../../Structure.css';

class Address extends Component {
  state = {
    address: this.props.address,
    index: this.props.index,
    mode: 'readonly',
  };

  getSetStatus() {
    return (
      <div className="select is-rounded">
        <select value={this.state.address.status}>
          <option value="empty">- Empty -</option>
          {STATUS_ARRAY.map(status => (
            <option value={status}>{status}</option>))}
        </select>
      </div>
    );
  }

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prevState) => {
      const address = { ...prevState.address };
      address.value = event.target.value;
      return { address };
    });
  }

  cancelButtonHandler = () => {
    this.setState({ mode: 'readOnly' });
  }

  modifyButtonHandler = () => {
    this.setState({ mode: 'modify' });
  }

  render() {
    let value = (
      <span>
        <i className="fa fa-chevron-circle-right hvr-icon" />
        {' '}
        {this.state.address.address_1}
      </span>
    );
    let status = <span className="tag is-light is-medium is-rounded">{this.state.address.status}</span>;
    let visibility = '';
    let display = '';
    let btShowAll;

    let buttons = (
      <button
        type="button"
        onClick={this.modifyButtonHandler}
        className={` button is-light  ${classes.space_5}`}
      >
        <i className="fas fa-pen" />
      </button>
    );

    // Si 1 seule adresse, on ne permet pas la suppression
    if (this.props.n_addresses === 1) {
      visibility = ' visibility_false';
    }

    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if (this.state.mode === 'modify') {
      btShowAll = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      value = (
        <input
          type="text"
          className="input is-rounded"
          value={this.state.address.address_1}
          onChange={this.changeInputHandler}
        />
      );

      status = this.getSetStatus(this.state.address.status);

      buttons = (
        <Aux>
          <button type="button" onClick={this.props.saveButton} className={` button is-light  ${classes.space_5}`}>
            <i className="fas fa-save" />
          </button>
          <button
            type="button"
            onClick={() => this.props.deleteButton(this.state)}
            className={` button is-light  ${classes.space_5} ${visibility}`}
          >
            <i className="fas fa-trash" />
          </button>
          <button type="button" onClick={this.cancelButtonHandler} className={` button is-light  ${classes.space_5}`}>
            <i className="fas fa-undo-alt" />
          </button>
        </Aux>
      );
    }


    if (this.props.address.status === 'new') {
      value = (
        <input
          type="text"
          className="input is-rounded"
          value={this.state.address.address_1}
          onChange={this.changeInputHandler}
        />
      );
      btShowAll = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      status = this.getSetStatus(this.state.address.status);
      buttons = (
        <Aux>
          <button
            type="button"
            onClick={this.props.saveButton}
            className={` button is-light  ${classes.space_5}`}
          >
            <i className="fas fa-save" />
          </button>
        </Aux>
      );

      display = '';
    }

    return (
      <div className={display}>
        <div className="columns">
          <div className="column">
            {value}
          </div>

          <div className="column is-narrow">
            {status}
          </div>

          <div className="column is-narrow">
            <span className="tag is-light is-medium is-rounded">{this.state.address.source}</span>
          </div>

          <div className="column is-one-fifth has-text-right">
            {btShowAll}
            <button
              type="button"
              onClick={this.props.addButton}
              className={` button is-light  ${classes.space_5}`}
            >
              <i className="fas fa-plus" />
            </button>
            {buttons}
          </div>
        </div>

      </div>
    );
  }
}

export default Address;

Address.propTypes = {
  addButton: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  deleteButton: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  n_addresses: PropTypes.number.isRequired,
  saveButton: PropTypes.func.isRequired,
};
