import React from 'react';

import { NO_NULL_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import Meta from '../../../UI/Field/Meta';

export default [
  {
    key: 'link_type',
    displayLabel: 'Type',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '40%',
    },
  },
  {
    key: 'link_value',
    displayLabel: 'Value',
    component: <Input />,
    isEditable: false,
    isShown: true,
    rules: [NO_NULL_RULE],
    activeUrl: true,
    style: {
      width: '50%',
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
