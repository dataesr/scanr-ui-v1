import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import Meta from '../../../UI/Field/Meta';
import { NO_NULL_RULE, DATE_RULE } from '../../config';

export default [
  {
    key: 'evaluator',
    displayLabel: 'Evaluateur',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '40%',
    },
  },
  {
    key: 'url',
    displayLabel: 'Url',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '30%',
    },
  },
  {
    key: 'year',
    displayLabel: 'Année',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE, DATE_RULE],
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
