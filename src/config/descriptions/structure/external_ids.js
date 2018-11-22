import React from 'react';

import { NO_NULL_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import Select from '../../../UI/Field/Editable/Select/Select';
import Meta from '../../../UI/Field/Meta';

export default [
  {
    key: 'id_external',
    displayLabel: 'Identifiant',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '50%',
    },
  },
  {
    key: 'id_type',
    displayLabel: 'Type',
    component: <Select />,
    isEditable: true,
    isShown: true,
    style: {
      width: '30%',
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
