/* Composants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from '../../../../axios';
/* Composants internes */
import FieldsList from '../Fields/MultipleFields/FieldsList';
import SingleField from '../Fields/SingleField';
import classes from './Names.css';

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
    this.nameAxiosCall(dataObject);
  }

  addName = (nameObject) => {
    const newName = {
      label: nameObject.fieldValue,
      status: nameObject.status,
      created_by: 'user',
    };
    const updatedNamesList = this.props.names.concat([newName]);
    const dataObject = {
      data: [{
        esr_id: this.props.structureId,
        names: updatedNamesList,
      }],
    };
    this.nameAxiosCall(dataObject);
  }

  deleteName = (nameObject) => {
    const editedNameIndex = this.props.names.findIndex(name => name.id === nameObject.id);
    const updatedNamesList = [...this.props.names];
    updatedNamesList.splice(editedNameIndex, 1);

    const dataObject = {
      data: [{
        scanr_id: this.props.structureId,
        names: updatedNamesList,
      }],
    };

    this.nameAxiosCall(dataObject);
  }


  // move to Redux
  nameAxiosCall(data) {
    const url = `structures/${this.props.structureId}/label`;
    axios.post(url, data) // sinon mettre JSON.stringify(data)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.getStructures();
          }
        },
      );
  }

  editStructure(fieldValue, fieldName) {
    const url = `structures/${this.props.structureId}`;
    const dataObject = {
      data: [{
        scanr_id: this.props.structureId,
        [fieldName]: fieldValue,
      }],
    };
    axios.post(url, dataObject) // sinon mettre JSON.stringify(data)
      .then(
        (response) => {
          if (response.status === 200) {
            this.props.getStructures();
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
        source: name.created_by,
      }), [],
    );
    return (

      <ul className={classes.list_fields}>
        <li>
          <FieldsList
            add={this.addName}
            content={names}
            delete={this.deleteName}
            label="Libellés"
            edit={this.editName}
          />
        </li>

        <li>
          <SingleField
            fieldValue={this.props.id}
            label="Id"
            readOnly
          />
        </li>

        <li>
          <SingleField
            fieldValue={this.props.status}
            label="Statut"
            readOnly
          />
        </li>

        <li>
          <SingleField
            allowDelete={false}
            edit={fieldValue => this.editStructure(fieldValue, 'phone')}
            fieldValue={this.props.phone}
            label="Téléphone"
            readOnly={false}
          />
        </li>

        <li>
          <SingleField
            allowDelete={false}
            edit={fieldValue => this.editStructure(fieldValue, 'email')}
            fieldValue={this.props.mail}
            label="Email"
            readOnly={false}
          />
        </li>
      </ul>);
  }
}

export default Names;

Names.propTypes = {
  getStructures: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  names: PropTypes.array.isRequired,
  mail: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,

};
