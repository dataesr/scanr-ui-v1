import React from 'react';
import AutoComplete from '../../../UI/Field/Editable/AutoComplete/AutoComplete';
import Bool from '../../../UI/Field/Editable/Bool/Bool';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';
import { NO_NULL_RULE, STATUS_RULE } from '../../config';

export default [
  {
    key: 'parent_id',
    displayLabel: 'Parent',
    component: <AutoComplete />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    schemaName: 'structures',
    searchInstitution: true,
  },
  {
    key: 'exclusive',
    displayLabel: 'Exclusivité',
    component: <Bool />,
    isEditable: true,
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
