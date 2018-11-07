import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import Status from '../../../UI/Field/Editable/Status/Status';

export default [
  {
    key: 'phone',
    displayLabel: 'Numéro',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'status',
    displayLabel: 'Statut',
    component: <Status />,
    isEditable: true,
    isShown: true,
    canBeNull: false,
    rules: {
      canBeNull: false,
      mainStatus: false,
    },
  },
];
