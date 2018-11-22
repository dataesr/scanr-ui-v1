import React from 'react';
import AutoComplete from '../../../UI/Field/Editable/AutoComplete/AutoComplete';
import Input from '../../../UI/Field/Editable/Input/Input';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Select from '../../../UI/Field/Editable/Select/Select';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';
import { NO_NULL_RULE, STATUS_RULE } from '../../config';

export default [
  {
    key: 'supervisor_id',
    displayLabel: 'Superviseur',
    component: (
      <AutoComplete
        schemaName="institutions"
        autoCompleteKeys={['id', 'names.name_fr']}
        labelKey="name_fr"
        searchInstitution
      />),
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    schemaName: 'structures',
    style: {
      width: '15%',
    },
  },
  {
    key: 'supervision_type',
    displayLabel: 'Type',
    component: <Select />,
    isEditable: true,
    isShown: true,
    style: {
      width: '15%',
    },
  },
  {
    key: 'rnsr_key',
    displayLabel: 'Clé rnsr',
    component: <Input />,
    isEditable: false,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'rnsr_name',
    displayLabel: 'Nom rnsr',
    component: <Input />,
    isEditable: false,
    isShown: true,
    style: {
      width: '20%',
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
      width: '8%',
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
      width: '5%',
    },
  },
];
