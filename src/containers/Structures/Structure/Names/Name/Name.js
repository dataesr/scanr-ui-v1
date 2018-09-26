/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/* Composants internes */
import Aux from '../../../../../hoc/Aux';

/* Config */
/* Statuts */
// SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
import { STATUS_ARRAY } from '../../../../../config/config';

/* CSS */
import classes from './Name.css';
// import main_classes from '../../../../../App.css';

class Name extends Component {
  state = {
    name: this.props.name,
    index: this.props.index,
    mode: 'readonly',
    add: this.props.add,
  };

  getSetStatus() {
    // STATUS_ARRAY, SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
    return (
      <div className="select is-rounded">
        <select value={this.state.name.status}>
          <option value="empty">- Empty -</option>
          {STATUS_ARRAY.map(status => (
            <option key={status} value={status}>{status}</option>))}
        </select>
      </div>
    );
  }

  changeInputHandler = (event) => {
    const name = { ...this.state.name };
    name.label = event.target.value;
    this.setState({ name });
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
    let { label, source } = this.state.name;
    let status = <span className="tag is-light is-medium is-rounded">{this.state.name.status}</span>;
    let visibility = '';
    let display = '';
    let btShowAll;
    let btAdd = null;
    let buttons = (
      <button
        type="button"
        onClick={() => this.modifyButtonHandler()}
        className={` button is-light  ${classes.space_5}`}
      >
        <i className="fas fa-pen" />
      </button>
    );

    // Si 1 seul libellé, on ne permet pas la suppression
    if (this.props.n_names === 1) {
      visibility = ' visibility_false';
    }

    // On affiche un bouton de "dépliage" des libellés sur le premier libellé si plusieurs libellés disponibles
    if (this.state.index === 0) {
      if (this.props.n_names > 1) {
        btShowAll = (
          <button
            type="button"
            onClick={this.props.toggleNamesButton}
            className={` button is-light  ${classes.space_5}`}
          >
            {this.props.showAll ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
          </button>
        );
      }

      btAdd = (
        <Aux>
          <button
            type="button"
            onClick={this.props.addButton}
            className={` button is-light  ${classes.space_5}`}
          >
            <i className="fas fa-plus" />
          </button>
        </Aux>
      );
    }

    // Si plusieurs libellés, on affiche uniquement le premier par défaut
    if (this.state.index > 0 && this.props.showAll === false) {
      display = classes.display_none;
    }

    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if (this.state.mode === 'modify') {
      btShowAll = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      label = (
        <input
          type="text"
          className="input is-rounded"
          value={this.state.name.label}
          onChange={this.changeInputHandler}
        />
      );

      status = this.getSetStatus(this.state.name.status);

      source = this.state.name.source;

      buttons = (
        <Aux>
          <button
            type="button"
            onClick={this.props.saveButton}
            className={` button is-light  ${classes.space_5}`}
          >
            <i className="fas fa-save" />
          </button>
          <button
            type="button"
            onClick={() => this.props.deleteButton(this.state)}
            className={` button is-light  ${classes.space_5} ${visibility}`}
          >
            <i className="fas fa-trash" />
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

    if (this.state.add === true) {
      label = (
        <input
          type="text"
          className="input is-rounded"
          value={this.state.name}
          onChange={this.changeInputHandler}
        />
      );
      btShowAll = null; // On masque le bouton de "dépliage" en modif car tous les libellés seront affichés

      status = this.getSetStatus(this.state.name.status);
      source = this.state.name.source;
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
            {label}
          </div>

          <div className="column is-narrow">
            {status}
          </div>

          <div className="column is-narrow">
            <span className="tag is-light is-medium is-rounded">{source}</span>
          </div>

          <div className="column is-one-fifth has-text-right">
            {btShowAll}
            {btAdd}
            {buttons}
          </div>
        </div>

      </div>
    );// return
  }// /render
}// /LabelClass

export default Name;


Name.propTypes = {
  add: PropTypes.bool.isRequired,
  showAll: PropTypes.bool,
  name: PropTypes.object.isRequired,
  n_names: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  saveButton: PropTypes.func.isRequired,
  toggleNamesButton: PropTypes.func.isRequired,
  addButton: PropTypes.func.isRequired,
  deleteButton: PropTypes.func.isRequired,
};
