/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';

/* Composants internes */
import Predecessor from './Predecessor/Predecessor';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* CSS */
// import classes from '../Structure.css';

class Predecessors extends Component {
  state = {
    predecessors: this.props.predecessors,
    structureId: this.props.structureId,
    showAll: false,
    addMode: false,
  };

  render() {
    return (
      <ul>
        {
            this.state.predecessors.map((predecessor, index) => (
              <Predecessor
                key={index}
                index={index}
                showAll={this.state.showAll}
                predecessor={predecessor}
                add={this.state.addMode}
                n_predecessors={this.state.predecessors.length}
                deleteButton={this.deleteButtonHandler}
                saveButton={this.saveButtonHandler}
                addButton={this.addButtonHandler}
              />
            ))// /map
          }
      </ul>
    );// /return()
  }// /render

  AxiosCall(data) {
    axios(
      {
        method: 'POST',
        url: `${API_END_POINT}structures/predecessors`,
        responseType: 'json',
        data: JSON.stringify(data),
      },
    ).then(
      (response) => {
        console.log(response);
        if (response.status === 200) {
          console.log('charger modal check OK');

          const newState = { ...this.state };
          newState.addMode = false;
          this.setState(newState);
        }
      },
    );
  }// /AxiosCall()


  saveButtonHandler = () => {
    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        addresses: this.state.addresses,
      }],
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    const newState = { ...this.state };
    newState.addMode = true;

    // Ajout d'un objet "predecessor" vide à la liste des Predecessors
    const predecessor_empty = {
      source: '',
      status: 'new',
      value: '',
    };

    newState.labels.push(predecessor_empty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    const predecessors = this.state.predecessors;
    predecessors.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        predecessors,
      }],
    };

    this.AxiosCall(dataObject);
  }
}// AddressesClass

export default Predecessors;
