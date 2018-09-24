import React from 'react';

import PropTypes from 'prop-types';
import Labels from '../Labels/Labels';
import SimpleField from '../SimpleField/SimpleField';

import classes from './Main.css';


const main = props => (
  <ul className={classes.list_fields}>
    <li>
      <Labels
        labels={props.label}
        structureId={props.id}
      />
    </li>

    <li>
      <SimpleField
        fieldName="Id"
        fieldValue={props.id}
        name="id"
        readOnly
        structureId={props.id}
      />
    </li>

    <li>
      <SimpleField
        fieldName="Statut"
        fieldValue={props.status}
        name="status"
        readOnly
        structureId={props.id}
      />
    </li>

    <li>
      <SimpleField
        fieldName="Téléphone"
        fieldValue={props.phone}
        name="phone"
        readOnly={false}
        structureId={props.id}
      />
    </li>

    <li>
      <SimpleField
        fieldName="Email"
        fieldValue={props.mail}
        name="mail"
        readOnly={false}
        structureId={props.id}
      />
    </li>
  </ul>);

export default main;

main.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.array.isRequired,
  mail: PropTypes.string,
  phone: PropTypes.string,
  status: PropTypes.string.isRequired,
};
