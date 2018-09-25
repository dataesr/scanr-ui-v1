/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
/* Composants internes */
import Name from './Name/Name';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* CSS */
// import classes from '../Structure.css';

class Names extends Component {
  state = {
    names: this.props.names,
    structureId: this.props.structureId,
    showAll: false,
    addMode: false,
  };

  saveButtonHandler = () => {
    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        names: this.state.names,
      }],
    };

    this.AxiosCall(dataObject);
  }

  addButtonHandler = () => {
    const newState = { ...this.state };
    newState.addMode = true;

    // Ajout d'un objet "label" vide à la liste des Labels
    const namesEmpty = {
      source: '',
      status: 'new',
      value: '',
    };

    newState.labels.push(namesEmpty);
    this.setState(newState);
  }


  deleteButtonHandler = (obj) => {
    const names = [...this.state.names];
    names.splice(obj.index, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        names: names,
      }],
    };

    this.AxiosCall(dataObject);
  }


  toggleNamesButtonHandler = () => {
    this.setState(prevState => ({ showAll: !prevState.showAll }));
  }

  AxiosCall(data) {
    axios(
      {
        method: 'POST',
        url: `${API_END_POINT}structures/label`,
        responseType: 'json',
        data: JSON.stringify(data),
      },
    ).then(
      (response) => {
        if (response.status === 200) {
          this.setState({ addMode: false });
        }
      },
    );
  }

  render() {
    return (
      <div className="columns">
        <div className="column is-narrow is-one-fifth">
          <span className="has-text-weight-semibold">
            Libellés :
          </span>
        </div>
        <div className="column">
          {
            this.state.names.map((name, index) => (
              <Name
                key={name.id}
                index={index}
                showAll={this.state.showAll}
                name={name}
                add={this.state.addMode}
                n_names={this.state.names.length}
                deleteButton={this.deleteButtonHandler}
                saveButton={this.saveButtonHandler}
                addButton={this.addButtonHandler}
                toggleNamesButton={this.toggleNamesButtonHandler}
              />
            ))// /map
          }
        </div>

      </div>
    );
  }
}

export default Names;

Names.propTypes = {
  names: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
};
