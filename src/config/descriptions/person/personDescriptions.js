import React from 'react';

import { NO_NULL_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import TextArea from '../../../UI/Field/Editable/TextArea/TextArea';
import Meta from '../../../UI/Field/Meta';

export default [
  {
    key: 'person_description',
    displayLabel: 'Description',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '80%',
    },
  },
  {
    key: 'source',
    displayLabel: 'Source',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '15%',
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
