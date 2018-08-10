/*Composants externes*/
import React, { Component } from 'react';
import axios from 'axios';

/*Composants internes*/
import Label from './Label/Label';

/*Config*/
  /*API*/
  import {API_END_POINT} from '../../../../config/config';

/*CSS*/
//import classes from '../Structure.css';

class Labels extends Component{
  state = {
      labels: this.props.labels,
      structureId: this.props.structureId,
      showAll: false,
      addMode: false
  };

  render(){


    return (
      <div className="columns">
        <div className="column is-narrow is-one-fifth">
          <span className="has-text-weight-semibold">
            Libellés :
          </span>
        </div>
        <div className="column">
          {
            this.state.labels.map((label, index) => {
              return (
                <Label key={index}
                  index={index}
                  showAll={this.state.showAll}
                  label={label}
                  add={this.state.addMode}
                  n_labels={this.state.labels.length}
                  deleteButton={this.deleteButtonHandler}
                  saveButton={this.saveButtonHandler}
                  addButton={this.addButtonHandler}
                  toggleLabelsButton={this.toggleLabelsButtonHandler} />
              )
            })// /map
          }
        </div>

      </div>
    );// /return()
  }// /render

  AxiosCall(data){
    axios(
      {
      method: 'POST',
      url: `${API_END_POINT}structures/label`,
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
        label: this.state.labels
      }]
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    let newState = {...this.state};
    newState.addMode = true;

    // Ajout d'un objet "label" vide à la liste des Labels
    const label_empty = {
                          source: '',
                          status: 'new',
                          value: ''
                        };

    newState.labels.push(label_empty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    let labels = this.state.labels
    labels.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        label: labels
      }]
    };

    this.AxiosCall(dataObject);
  }


  toggleLabelsButtonHandler = () => {
    let newState = {...this.state};
    newState.showAll = !newState.showAll;
    this.setState(newState);
  }


}// LabelsClass

export default Labels;
