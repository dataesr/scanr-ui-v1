/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/* Composants internes */
import Supervisor from './Supervisor/Supervisor';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* CSS */
// import classes from '../Structure.css';

class Supervisors extends Component {
  state = {
    supervisors: this.props.supervisors,
    structureId: this.props.structureId,
    showAll: false,
    addMode: false,
  };

  saveButtonHandler = () => {
    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        supervisors: this.state.supervisors,
      }],
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    const newState = { ...this.state };
    newState.addMode = true;

    // Ajout d'un objet "supervisor" vide à la liste des Supervisors
    const supervisorEmpty = {
      source: '',
      status: 'new',
      value: '',
    };

    newState.labels.push(supervisorEmpty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    const supervisors = this.state.supervisors;
    supervisors.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        supervisors,
      }],
    };

    this.AxiosCall(dataObject);
  }


  AxiosCall(data) {
    axios(
      {
        method: 'POST',
        url: `${API_END_POINT}structures/supervisors`,
        responseType: 'json',
        data: JSON.stringify(data),
      },
    ).then(
      (response) => {
        if (response.status === 200) {
          const newState = { ...this.state };
          newState.addMode = false;
          this.setState(newState);
        }
      },
    );
  }// /AxiosCall()

render() {
    return (
      <ul>
        {this.state.supervisors.map((supervisor, index) => (
          <Supervisor
            key={index}
            index={index}
            showAll={this.state.showAll}
            supervisor={supervisor}
            add={this.state.addMode}
            n_supervisors={this.state.supervisors.length}
            deleteButton={this.deleteButtonHandler}
            saveButton={this.saveButtonHandler}
            addButton={this.addButtonHandler}
          />
        ))}
      </ul>);
  }
}


export default Supervisors;

Supervisors.propTypes = {
  supervisors: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
};
