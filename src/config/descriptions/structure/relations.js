import React from 'react';
import AutoComplete from '../../../UI/Field/Editable/AutoComplete/AutoComplete';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Select from '../../../UI/Field/Editable/Select/Select';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';
import { NO_NULL_RULE, STATUS_RULE } from '../../config';

export default [
  {
    key: 'relation_id',
    displayLabel: 'Relation',
    component: (
      <AutoComplete
        schemaName="companies"
        autoCompleteKeys={['id', 'names.name_fr']}
        labelKey="name_fr"
        searchInstitution
      />),
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    schemaName: 'structures',
    style: {
      width: '40%',
    },
  },
  {
    key: 'relation_type',
    displayLabel: 'Type',
    component: <Select />,
    isEditable: true,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'status',
    displayLabel: 'Statut',
    component: <Status />,
    isEditable: true,
    isShown: true,
    canBeNull: false,
    rules: [NO_NULL_RULE, STATUS_RULE],
    style: {
      width: '10%',
    },
  },
  {
    key: 'start_date',
    displayLabel: 'Début',
    component: <InputDate />,
    isEditable: true,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'end_date',
    displayLabel: 'Fin',
    component: <InputDate />,
    isEditable: true,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'meta',
    displayLabel: '',
    component: <Meta />,
    isEditable: false,
    isShown: true,
    style: {
      width: '10%',
    },
  },
];
