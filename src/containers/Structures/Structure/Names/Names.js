/* Composants externes */
import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
/* Composants internes */
import FieldsList from '../FieldsList/FieldsList';

/* Config */
/* API */
import { API_END_POINT } from '../../../../config/config';

/* CSS */
// import classes from '../Structure.css';

class Names extends Component {
  editName = (nameObject) => {
    // find the name in the list
    const editedNameIndex = this.props.names.findIndex(name => name.id === nameObject.id);
    const editedName = this.props.names[editedNameIndex];
    editedName.label = nameObject.fieldValue;
    editedName.status = nameObject.status;
    editedName.created_by = 'user';
    const updatedNamesList = [...this.props.names];
    updatedNamesList[editedNameIndex] = editedName;
    const dataObject = {
      data: [{
        esr_id: this.state.structureId,
        names: updatedNamesList,
      }],
    };
    this.AxiosCall(dataObject);
  }

  addName = (nameObject) => {
    const newName = {
      label: nameObject.fieldValue,
      status: nameObject.status,
      created_by: 'user',
    }
    const updatedNamesList = this.props.names.concat([newName]);
    const dataObject = {
      data: [{
        esr_id: this.state.structureId,
        names: updatedNamesList,
      }],
    };
    this.AxiosCall(dataObject);
  }

  deleteName = (nameObject) => {
    const editedNameIndex = this.props.names.findIndex(name => name.id === nameObject.id);
    const updatedNamesList = [...this.props.names];
    updatedNamesList.splice(editedNameIndex, 1);

    const dataObject = {
      data: [{
        scanr_id: this.state.structureId,
        names: updatedNamesList,
      }],
    };

    this.AxiosCall(dataObject);
  }


  // move to Redux
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
          console.log(response)
        }
      },
    );
  }

  render() {
    const names = this.props.names.reduce(
      (nameArray, name) => nameArray.concat({
        fieldValue: name.label,
        id: name.id,
        status: name.status,
        source: name.source,
      }), [],
    );
    return (
      <FieldsList
        add={this.addName}
        content={names}
        delete={this.deleteName}
        label="Libellés"
        edit={this.editName}
      />);
  }
}

export default Names;

Names.propTypes = {
  names: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
};
