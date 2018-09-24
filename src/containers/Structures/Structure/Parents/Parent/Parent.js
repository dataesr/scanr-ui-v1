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

class Parent extends Component {
  state = {
    parent: this.props.parent,
    index: this.props.index,
    mode: 'readonly',
    add: this.props.add,
  };

  render() {
    const label = (
      <span>
        <i className="fa fa-chevron-circle-right hvr-icon" />
        {' '}
        {this.state.parent.label}
      </span>
    );
    let status = <span className="tag is-light is-medium is-rounded">{this.state.parent.status}</span>;
    const source = this.state.parent.source;
    let value = this.state.parent.value;
    let hierarchy_type = this.state.parent.hierarchy_type;
    const last_update = this.state.parent.last_update;
    let start_date = this.state.parent.dates[0].start_date; // this.state.parent.start_date
    let end_date = this.state.parent.dates[0].end_date; // this.state.parent.end_date

    let visibility = '';
    const display = '';
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
    if (this.props.n_parents === 1) {
      visibility = ' visibility_false';
    }

    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if (this.state.mode === 'modify') {
      bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      status = this.getSetStatus(this.state.parent.status);

      value = (
        <input
          type="text"
          className="input is-rounded"
          value={value || ''}
          id="value"
          onChange={this.changeInputHandler}
        />
      );

      hierarchy_type = (
        <input
          type="text"
          className="input is-rounded"
          value={hierarchy_type || ''}
          id="hierarchy_type"
          onChange={this.changeInputHandler}
        />
      );

      start_date = (
        <input
          type="text"
          className="input is-rounded"
          value={start_date || ''}
          id="start_date"
          onChange={this.changeInputHandler}
        />
      );

      end_date = (
        <input
          type="text"
          className="input is-rounded"
          value={end_date || ''}
          id="end_date"
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
      <li className={display}>

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
                {hierarchy_type}
              </div>
            </div>
          </div>

          <div className="column">
            <div className={`columns ${classes.separator}`}>
              <div className="column is-3 has-text-weight-semibold">
                Date de début :
              </div>
              <div className="column">
                {start_date}
              </div>
            </div>

            <div className={`columns ${classes.separator}`}>
              <div className="column is-3 has-text-weight-semibold">
                Date de fin :
              </div>
              <div className="column">
                {end_date}
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-half">
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
          if (status === this.state.parent.status) {
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
    newState.parent[event.target.id] = event.target.value;
    this.setState(newState);
  }
}// /LabelClass

export default Parent;
