/*Composants externes*/
import React, { Component } from 'react';
import axios from 'axios';

/*Composants internes*/
import Supervisor from './Supervisor/Supervisor';

/*Config*/
  /*API*/
  import {API_END_POINT} from '../../../../config/config';

/*CSS*/
//import classes from '../Structure.css';

class Supervisors extends Component{
  state = {
      supervisors: this.props.supervisors,
      structureId: this.props.structureId,
      showAll: false,
      addMode: false
  };

  render(){


    return (
        <ul>
          {
            this.state.supervisors.map((supervisor, index) => {
              return (
                <Supervisor key={index}
                  index={index}
                  showAll={this.state.showAll}
                  supervisor={supervisor}
                  add={this.state.addMode}
                  n_supervisors={this.state.supervisors.length}
                  deleteButton={this.deleteButtonHandler}
                  saveButton={this.saveButtonHandler}
                  addButton={this.addButtonHandler} />
              )
            })// /map
          }
        </ul>
    );// /return()
  }// /render

  AxiosCall(data){
    axios(
      {
      method: 'POST',
      url: `${API_END_POINT}structures/supervisors`,
      responseType: 'json',
      data: JSON.stringify(data)
      }
    ).then(
      (response) => {
        console.log(response);
        if(response.status === 200){
          console.log("charger modal check OK");

          let newState = {...this.state};
          newState.addMode = false;
          this.setState(newState);
        }
      }
    )

  }// /AxiosCall()


  saveButtonHandler = () => {
    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        addresses: this.state.addresses
      }]
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    let newState = {...this.state};
    newState.addMode = true;

    // Ajout d'un objet "supervisor" vide à la liste des Supervisors
    const supervisor_empty = {
                          source: '',
                          status: 'new',
                          value: ''
                        };

    newState.labels.push(supervisor_empty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    let supervisors = this.state.supervisors
    supervisors.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        supervisors: supervisors
      }]
    };

    this.AxiosCall(dataObject);
  }


}// AddressesClass

export default Supervisors;
