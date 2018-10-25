import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Status from '../../../UI/Field/Editable/Status/Status';

export default [
  {
    key: 'description_fr',
    displayLabel: 'Fr',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'description_en',
    displayLabel: 'En',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'start_date',
    displayLabel: 'Début',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
  },
  {
    key: 'end_date',
    displayLabel: 'Fin',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
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
