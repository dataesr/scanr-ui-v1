import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';

export default [
  {
    key: 'url',
    displayLabel: 'Url',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'link_type',
    displayLabel: 'Type de lien',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },

];
