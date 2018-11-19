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
  },
  {
    key: 'supervision_type',
    displayLabel: 'Type',
    component: <Select />,
    isEditable: true,
    isShown: true,
  },
  {
    key: 'rnsr_key',
    displayLabel: 'Clé rnsr',
    component: <Input />,
    isEditable: false,
    isShown: true,
  },
  {
    key: 'rnsr_name',
    displayLabel: 'Nom rnsr',
    component: <Input />,
    isEditable: false,
    isShown: true,
  },
  {
    key: 'status',
    displayLabel: 'Statut',
    component: <Status />,
    isEditable: true,
    isShown: true,
    canBeNull: false,
    rules: [NO_NULL_RULE, STATUS_RULE],
  },
  {
    key: 'start_date',
    displayLabel: 'Début',
    component: <InputDate />,
    isEditable: true,
    isShown: true,
  },
  {
    key: 'end_date',
    displayLabel: 'Fin',
    component: <InputDate />,
    isEditable: true,
    isShown: true,
  },
  {
    key: 'meta',
    displayLabel: '',
    component: <Meta />,
    isEditable: false,
    isShown: true,
  },
];
