/* Composants externes */
import React, { Component } from 'react';
import axios from '../../../../axios';
import PropTypes from 'prop-types';
/* Composants internes */
import FieldsList from '../FieldsList/FieldsList';

class Names extends Component {
  state = {
    names: this.props.names,
  };

  editName = (nameObject) => {
    // find the name in the list
    const editedNameIndex = this.state.names.findIndex(name => name.id === nameObject.id);
    const editedName = this.state.names[editedNameIndex];
    editedName.label = nameObject.fieldValue;
    editedName.status = nameObject.status;
    editedName.created_by = 'user';
    const updatedNamesList = [...this.state.names];
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
    };
    const updatedNamesList = this.state.names.concat([newName]);
    const dataObject = {
      data: [{
        esr_id: this.props.structureId,
        names: updatedNamesList,
      }],
    };
    this.AxiosCall(dataObject);
  }

  deleteName = (nameObject) => {
    const editedNameIndex = this.state.names.findIndex(name => name.id === nameObject.id);
    const updatedNamesList = [...this.props.names];
    updatedNamesList.splice(editedNameIndex, 1);

    const dataObject = {
      data: [{
        scanr_id: this.props.structureId,
        names: updatedNamesList,
      }],
    };

    this.AxiosCall(dataObject);
  }


  // move to Redux
  AxiosCall(data) {
    const url = `structures/${this.props.structureId}/label`;
    axios.post(url, data) // sinon mettre JSON.stringify(data)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({ names: data[0].names })
            console.log(response);
          }
        },
      );
  }

  render() {
    const names = this.state.names.reduce(
      (nameArray, name) => nameArray.concat({
        fieldValue: name.label,
        id: name.id,
        status: name.status,
        source: name.created_by,
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
