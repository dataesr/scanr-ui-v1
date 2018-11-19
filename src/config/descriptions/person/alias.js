import React from 'react';

import { NO_NULL_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import Meta from '../../../UI/Field/Meta';

export default [
  {
    key: 'last_name',
    displayLabel: 'Nom',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '20%',
    },
  },
  {
    key: 'first_name',
    displayLabel: 'Prénom',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '25%',
    },
  },
  {
    key: 'full_name',
    displayLabel: 'Nom normalisé',
    component: <Input />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '45%',
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
