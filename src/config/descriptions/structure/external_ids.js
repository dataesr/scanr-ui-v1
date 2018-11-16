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
  },
  {
    key: 'id_type',
    displayLabel: 'Type',
    component: <Select />,
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
