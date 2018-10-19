import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Status from '../../../UI/Field/Editable/Status/Status';

const NAMES_DESCRIPTION = [
  {
    key: 'name_fr',
    displayLabel: 'Nom français',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'name_en',
    displayLabel: 'Nom anglais',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'acronym',
    displayLabel: 'Acronym',
    component: <Input />,
    isEditable: true,
    isShown: true,
    canBeNull: true,
  },
  {
    key: 'start_date',
    displayLabel: 'Date de début',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
  },
  {
    key: 'end_date',
    displayLabel: 'Date de fin',
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

export default NAMES_DESCRIPTION;
