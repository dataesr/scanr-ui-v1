/*Composants externes*/
import React, { Component } from 'react';

/*Composants internes*/
  import Aux from '../../../../../hoc/Aux';

/*Config*/
  /*Statuts*/
  //SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
  import {STATUS_ARRAY} from '../../../../../config/config';

/*CSS*/
import classes from  '../../Structure.css';
//import main_classes from '../../../../../App.css';

class Address extends Component{
  state = {
    address: this.props.address,
    index: this.props.index,
    mode: "readonly",
    add: this.props.add
  };

  render(){
    let value = <span><i className="fa fa-chevron-circle-right hvr-icon"></i> {this.state.address.value}</span>;
    let source = this.state.address.source;
    let status = <span className="tag is-light is-medium is-rounded">{this.state.address.status}</span>;
    let visibility = '';
    let display = '';
    let bt_show_all,bt_add = <Aux>
                <button onClick={this.props.addButton}
                        className={` button is-light  ${classes.space_5}`}>
                  <i className="fas fa-plus"></i>
                </button>
              </Aux>;

    let buttons = <Aux>
                    <button onClick={() => this.modifyButtonHandler()}
                            className={` button is-light  ${classes.space_5}`}>
                      <i className="fas fa-pen"></i>
                    </button>
                  </Aux>;

    // Si 1 seule adresse, on ne permet pas la suppression
    if(this.props.n_addresses === 1){
      visibility = ' visibility_false';
    }

    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if(this.state.mode === 'modify'){
      bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      value = <input type="text"
                     className="input is-rounded"
                     value={value || ''}
                     onChange={this.changeInputHandler}/>;

      status = this.getSetStatus(this.state.address.status);

      source = this.state.address.source;

      buttons = <Aux>
                  <button onClick={this.props.saveButton} className={` button is-light  ${classes.space_5}`}><i className="fas fa-save"></i></button>
                  <button onClick={() => this.props.deleteButton(this.state)} className={` button is-light  ${classes.space_5} ${visibility}`}><i className="fas fa-trash"></i></button>
                  <button onClick={() => this.cancelButtonHandler()} className={` button is-light  ${classes.space_5}`}><i className="fas fa-undo-alt"></i></button>
                </Aux>;
    }


    if(this.state.add === true){
      value = <input type="text"
                     className="input is-rounded"
                     value={value || ''}
                     onChange={this.changeInputHandler}/>;
        bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

        status = this.getSetStatus(this.state.address.status);
        source = this.state.address.source;
        buttons = <Aux>
                    <button onClick={this.props.saveButton} className={` button is-light  ${classes.space_5}`}><i className="fas fa-save"></i></button>
                  </Aux>;

        display = '';
    }

    return(
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
            {bt_show_all}{bt_add}{buttons}
          </div>
        </div>

      </div>
    );// return
  }// /render


  getSetStatus(){
    //STATUS_ARRAY, SATUS_MAIN, SATUS_VALID, SATUS_INVALID, SATUS_OLD
    return (
      <div className="select is-rounded">
      <select>
        <option value="empty">- Empty -</option>
      {
        STATUS_ARRAY.map((status, index) => {
          let selected = '';
          if(status === this.state.address.status){
            selected = 'selected';
          }
          return(
            <option key={index} value={status} selected={selected}>{status}</option>
          );
        })
      }
      </select>
      </div>
    );
  }

  modifyButtonHandler(){
    let newState = {...this.state};
    newState.mode = 'modify';
    this.setState(newState);
  }


  cancelButtonHandler(){
    let newState = {...this.state};
    newState.mode = 'readonly';
    this.setState(newState);
  }


  changeInputHandler = (event) => {
    let newState = {...this.state};
    newState.address.value = event.target.value;
    this.setState(newState);
  }


}// /LabelClass

export default Address;
