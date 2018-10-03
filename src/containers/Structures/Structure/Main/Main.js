import React from 'react';
import PropTypes from 'prop-types';
import axios from '../../../../axios';

import FieldsList from '../Fields/MultipleFields/FieldsList';
import SingleField from '../Fields/SingleField';
import classes from './Main.css';

const main = (props) => {
  const nameAxiosCall = (names) => {
    const dataObject = {
      names,
    };
    const url = `structures/${props.structureId}`;
    axios.put(url, dataObject) // sinon mettre JSON.stringify(data)
      .then(
        (response) => {
          if (response.status === 200) {
            props.getStructures();
          }
        },
      );
  };
  const editName = (updatedNamesList) => {
    const names = updatedNamesList.reduce(
      (nameArray, name) => {
        const newName = {
          ...name,
          label: name.fieldValue,
          created_by: name.source,
        };
        delete newName.fieldValue;
        delete newName.source;
        return nameArray.concat(newName);
      }, [],
    );
    nameAxiosCall(names);
  };

  const deleteName = (nameId) => {
    const editedNameIndex = props.names.findIndex(name => name.id === nameId);
    const updatedNamesList = [...props.names];
    updatedNamesList.splice(editedNameIndex, 1);
    nameAxiosCall(updatedNamesList);
  };

  const editStructure = (fieldValue, fieldName) => {
    const url = `structures/${props.structureId}`;
    const now = new Date();
    const dataObject = {
      [fieldName]: {
        value: fieldValue,
        created_at: now.toISOString(),
        created_by: 'user',
      },
    };
    axios.put(url, dataObject) // sinon mettre JSON.stringify(data)
      .then(
        (response) => {
          if (response.status === 200) {
            props.getStructures();
          }
        },
      );
  };

  const names = props.names.reduce(
    (nameArray, name) => nameArray.concat({
      ...name,
      fieldValue: name.label,
      source: name.created_by,
    }), [],
  );
  return (
    <ul className={classes.list_fields}>
      <div className="has-text-info has-text-centered">
        <em>Cliquez directement sur un champs pour passer en mode édition</em>
      </div>
      <li>
        <FieldsList
          content={names}
          delete={deleteName}
          label="Libellés"
          save={editName}
        />
      </li>

      <li>
        <SingleField
          fieldValue={props.structureId}
          label="Id"
          readOnly
        />
      </li>

      <li>
        <SingleField
          fieldValue={props.status}
          label="Statut"
          readOnly
        />
      </li>

      <li>
        <SingleField
          allowDelete={false}
          edit={fieldValue => editStructure(fieldValue, 'phone')}
          fieldValue={props.phone}
          label="Téléphone"
          readOnly={false}
        />
      </li>

      <li>
        <SingleField
          allowDelete={false}
          edit={fieldValue => editStructure(fieldValue, 'mail')}
          fieldValue={props.mail}
          label="Email"
          readOnly={false}
        />
      </li>
    </ul>);
};

export default main;

main.propTypes = {
  getStructures: PropTypes.func.isRequired,
  names: PropTypes.array.isRequired,
  mail: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,

};
