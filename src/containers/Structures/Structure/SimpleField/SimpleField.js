/*Composants externes*/
import React, {Component} from 'react';
import axios from 'axios';

/* Composants internes */
import Aux from '../../../../hoc/Aux';

/*Config*/
  /*API*/
  import {API_END_POINT} from '../../../../config/config';

/* Css */
import classes from '../Structure.css';

class Id extends Component{
  state = {
    structureId: this.props.structureId,
    name: this.props.name,
    value: this.props.fieldValue,
    mode: "readonly"
  };

  render(){
    let value = this.state.value;
    let buttons = null;

    if( !this.props.readOnly ){
      buttons = <button onClick={() => this.modifyButtonHandler()}
                          className={`button is-light ${classes.space_5}`}>
                    <i className="fas fa-pen"></i>
                  </button>;
    }


    // Transformation des libellés en champs modifiables + affichage des nouveaux boutons
    if(this.state.mode === 'modify'){
      //bt_show_all = null; // On masque le bouton de "dépliage" en modif car tous les  libellés seront affichés

      value = <input type="text"
                     className="input is-rounded"
                     value={value || ''}
                     onChange={this.changeInputHandler}/>;

      buttons = <Aux>
                  <button onClick={this.saveButtonHandler}
                          className={`button is-light  ${classes.space_5}`}>
                    <i className="fas fa-save"></i>
                  </button>
                  <button onClick={() => this.cancelButtonHandler()}
                          className={` button is-light  ${classes.space_5}`}>
                    <i className="fas fa-undo-alt"></i>
                  </button>
                </Aux>;
    }


    return (
      <div className="columns">
        <div className="column is-one-fifth">
          <span className="has-text-weight-semibold">
            {this.props.fieldName} :
          </span>
        </div>
        <div className="column">
          {value}
        </div>
        <div className="column is-one-fifth has-text-right">
          {buttons}
        </div>
      </div>
    )
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
    newState.value = event.target.value;
    this.setState(newState);
  }

  saveButtonHandler = () => {
    const obj = {};
    const key = this.state.name;

    obj['scanr_id'] = this.state.structureId;
    obj[key] = this.state.value;
    const data = {data: [obj]};

    console.log("data: ", data);

    axios(
      {
      method: 'POST',
      url: `${API_END_POINT}structures/` + key,
      responseType: 'json',
      data: JSON.stringify(data)
      }
    ).then(
      (response) => {
        console.log(response);
        if(response.status === 200){
          console.log("charger modal check OK");

          let newState = {...this.state};
          newState.mode = 'readonly';
          this.setState(newState);
        }
      }
    )

  }
}

export default Id;
