/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';

/* Composants internes */
import Parent from './Parent/Parent';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* CSS */
import classes from '../Structure.css';

class Parents extends Component {
  state = {
    parents: this.props.parents,
    structureId: this.props.structureId,
    showAll: false,
    addMode: false,
  };

  render() {
    return (
      <ul>
        {
            this.state.parents.map((parent, index) => (
              <Parent
                key={index}
                index={index}
                showAll={this.state.showAll}
                parent={parent}
                add={this.state.addMode}
                n_parents={this.state.parents.length}
                deleteButton={this.deleteButtonHandler}
                saveButton={this.saveButtonHandler}
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
        url: `${API_END_POINT}structures/parents`,
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


  deleteButtonHandler = (obj) => {
    const parents = this.state.parents;
    parents.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        parents,
      }],
    };

    this.AxiosCall(dataObject);
  }
}// AddressesClass

export default Parents;
