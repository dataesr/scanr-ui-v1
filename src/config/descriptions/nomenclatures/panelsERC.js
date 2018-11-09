import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import TextArea from '../../../UI/Field/Editable/TextArea/TextArea';

// Attention : Si la largeur des colonnes est fixe, il faut garder 5% pour le bouton de suppression

export default [
  {
    key: 'id',
    displayLabel: 'Code',
    component: <Input />,
    isEditable: false,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'level',
    displayLabel: 'Level',
    component: <Input />,
    isEditable: true,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'name_fr',
    displayLabel: 'Nom français',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    style: {
      width: '20%',
    },
  },
  {
    key: 'name_en',
    displayLabel: 'Nom anglais',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    style: {
      width: '20%',
    },
  },
  {
    key: 'subname_fr',
    displayLabel: 'subname_fr',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    style: {
      width: '20%',
    },
  },
  {
    key: 'subname_en',
    displayLabel: 'subname_en',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    style: {
      width: '20%',
    },
  },
];
