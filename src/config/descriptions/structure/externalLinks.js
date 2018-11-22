import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import Meta from '../../../UI/Field/Meta';
import { NO_NULL_RULE } from '../../config';

export default [
  {
    key: 'url',
    displayLabel: 'Url',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '50%',
    },
  },
  {
    key: 'link_type',
    displayLabel: 'Type de lien',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
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
