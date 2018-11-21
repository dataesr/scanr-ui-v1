import React from 'react';

import { NO_NULL_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Meta from '../../../UI/Field/Meta';

export default [
  {
    key: 'start_date',
    displayLabel: 'Début',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '10%',
    },
  },
  {
    key: 'end_date',
    displayLabel: 'Fin',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '10%',
    },
  },
  {
    key: 'institution_name',
    displayLabel: 'Institution',
    component: <Input />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '20%',
    },
  },
  {
    key: 'structure_name',
    displayLabel: 'Structure',
    component: <Input />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '20%',
    },
  },
  {
    key: 'role',
    displayLabel: 'Role',
    component: <Input />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '15%',
    },
  },
  {
    key: 'source',
    displayLabel: 'Source',
    component: <Input />,
    isEditable: false,
    isShown: true,
    activeUrl: true,
    rules: [NO_NULL_RULE],
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
