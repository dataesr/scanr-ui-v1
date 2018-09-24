/* Composants externes */
import React, { Component } from 'react';

/* Composants internes */
import Aux from '../../../../../hoc/Aux';

/* Config */
/* Statuts */
// SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
import { STATUS_ARRAY } from '../../../../../config/config';

/* CSS */
import classes from './Label.css';
// import main_classes from '../../../../../App.css';

class Label extends Component {
  state = {
    label: this.props.label,
    index: this.props.index,
    mode: 'readonly',
    add: this.props.add,
  };

  render() {
    let { value, source } = this.state.label;
    let status = <span className="tag is-light is-medium is-rounded">{this.state.label.status}</span>;
    let visibility = '';
    let display = '';
    let bt_show_all; let bt_add = null;
    let buttons = (
      <Aux>
        <button
          onClick={() => this.modifyButtonHandler()}
          className={` button is-light  ${classes.space_5}`}
        >
          <i className="fas fa-pen" />
        </button>
      </Aux>
    );

    // Si 1 seul libellé, on ne permet pas la suppression
    if (this.props.n_labels === 1) {
      visibility = ' visibility_false';
    }

    // On affiche un bouton de "dépliage" des libellés sur le premier libellé si plusieurs libellés disponibles
    if (this.state.index === 0) {
      if (this.props.n_labels > 1) {
        bt_show_all = (
          <button
            onClick={this.props.toggleLabelsButton}
            className={` button is-light  ${classes.space_5}`}
          >
            {this.props.showAll ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
          </button>
        );
      }

      bt_add = (
        <Aux>
          <button
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
      bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      value = (
        <input
          type="text"
          className="input is-rounded"
          value={value || ''}
          onChange={this.changeInputHandler}
        />
      );

      status = this.getSetStatus(this.state.label.status);

      source = this.state.label.source;

      buttons = (
        <Aux>
          <button onClick={this.props.saveButton} className={` button is-light  ${classes.space_5}`}><i className="fas fa-save" /></button>
          <button onClick={() => this.props.deleteButton(this.state)} className={` button is-light  ${classes.space_5} ${visibility}`}><i className="fas fa-trash" /></button>
          <button onClick={() => this.cancelButtonHandler()} className={` button is-light  ${classes.space_5}`}><i className="fas fa-undo-alt" /></button>
        </Aux>
      );
    }


    if (this.state.add === true) {
      value = (
        <input
          type="text"
          className="input is-rounded"
          value={value || ''}
          onChange={this.changeInputHandler}
        />
      );
      bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      status = this.getSetStatus(this.state.label.status);
      source = this.state.label.source;
      buttons = (
        <Aux>
          <button onClick={this.props.saveButton} className={` button is-light  ${classes.space_5}`}><i className="fas fa-save" /></button>
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
            <span className="tag is-light is-medium is-rounded">{source}</span>
          </div>

          <div className="column is-one-fifth has-text-right">
            {bt_show_all}
            {bt_add}
            {buttons}
          </div>
        </div>

      </div>
    );// return
  }// /render


  getSetStatus() {
    // STATUS_ARRAY, SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
    return (
      <div className="select is-rounded">
        <select>
          <option value="empty">- Empty -</option>
          {
        STATUS_ARRAY.map((status, index) => {
          let selected = '';
          if (status === this.state.label.status) {
            selected = 'selected';
          }
          return (
            <option key={index} value={status} selected={selected}>{status}</option>
          );
        })
      }
        </select>
      </div>
    );
  }

  modifyButtonHandler() {
    const newState = { ...this.state };
    newState.mode = 'modify';
    this.setState(newState);
  }


  cancelButtonHandler() {
    const newState = { ...this.state };
    newState.mode = 'readonly';
    this.setState(newState);
  }


  changeInputHandler = (event) => {
    const newState = { ...this.state };
    newState.label.value = event.target.value;
    this.setState(newState);
  }
}// /LabelClass

export default Label;
