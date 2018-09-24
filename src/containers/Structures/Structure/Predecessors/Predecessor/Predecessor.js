/* Composants externes */
import React, { Component } from 'react';

/* Composants internes */
import Aux from '../../../../../hoc/Aux';

/* Config */
/* Statuts */
// SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
import { STATUS_ARRAY } from '../../../../../config/config';

/* CSS */
import classes from '../../Structure.css';
// import main_classes from '../../../../../App.css';

class Predecessor extends Component {
  state = {
    predecessor: this.props.predecessor,
    index: this.props.index,
    mode: 'readonly',
    add: this.props.add,
  };

  render() {
    const label = (
      <span>
        <i className="fa fa-chevron-circle-right hvr-icon" />
        {' '}
        {this.state.predecessor.label}
      </span>
    );
    let status = <span className="tag is-light is-medium is-rounded">{this.state.predecessor.status}</span>;
    const source = this.state.predecessor.source;
    let value = this.state.predecessor.value;
    let succession_type = this.state.predecessor.succession_type;
    const last_update = this.state.predecessor.last_update;
    let date_effect = this.state.predecessor.dates[0].date_effect; // this.state.predecessor.date_effect

    let visibility = '';

    let bt_show_all; const bt_add = (
      <Aux>
        <button
          onClick={this.props.addButton}
          className={` button is-light  ${classes.space_5}`}
        >
          <i className="fas fa-plus" />
        </button>
      </Aux>
    );

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

    // Si 1 seule adresse, on ne permet pas la suppression
    if (this.props.n_predecessors === 1) {
      visibility = ' visibility_false';
    }

    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if (this.state.mode === 'modify') {
      bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      status = this.getSetStatus(this.state.predecessor.status);

      value = (
        <input
          type="text"
          className="input is-rounded"
          value={value || ''}
          id="value"
          onChange={this.changeInputHandler}
        />
      );

      succession_type = (
        <input
          type="text"
          className="input is-rounded"
          value={succession_type || ''}
          id="succession_type"
          onChange={this.changeInputHandler}
        />
      );

      date_effect = (
        <input
          type="text"
          className="input is-rounded"
          value={date_effect || ''}
          id="date_effect"
          onChange={this.changeInputHandler}
        />
      );

      buttons = (
        <Aux>
          <button onClick={this.props.saveButton} className={` button is-light  ${classes.space_5}`}><i className="fas fa-save" /></button>
          <button onClick={() => this.props.deleteButton(this.state)} className={` button is-light  ${classes.space_5} ${visibility}`}><i className="fas fa-trash" /></button>
          <button onClick={() => this.cancelButtonHandler()} className={` button is-light  ${classes.space_5}`}><i className="fas fa-undo-alt" /></button>
        </Aux>
      );
    }

    return (
      <li>
        <div className="columns">
          <div className="column has-text-weight-semibold">
            {label}
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

        <div className="columns">
          <div className="column">
            <div className={`columns ${classes.separator}`}>
              <div className="column is-3 has-text-weight-semibold">
                Identifiant :
              </div>
              <div className="column">
                {value}
              </div>
            </div>

            <div className={`columns ${classes.separator}`}>
              <div className="column is-3 has-text-weight-semibold">
                Type :
              </div>
              <div className="column">
                {succession_type}
              </div>
            </div>
          </div>

          <div className="column">
            <div className="columns">
              <div className="column is-3 has-text-weight-semibold">
                {"Date d'effet :"}
              </div>
              <div className="column">
                {date_effect}
              </div>
            </div>

            <div className="columns">
              <div className="column is-3 has-text-weight-semibold">
                Modifié :
              </div>
              <div className="column">
                {last_update}
              </div>
            </div>

          </div>
        </div>

      </li>
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
          if (status === this.state.predecessor.status) {
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
    newState.predecessor[event.target.id] = event.target.value;
    this.setState(newState);
  }
}// /LabelClass

export default Predecessor;
