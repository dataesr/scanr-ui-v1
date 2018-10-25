import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import SocialMedias from '../../../UI/Field/Editable/SocialMedias/SocialMedias';

export default [
  {
    key: 'account',
    displayLabel: 'Compte',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
  {
    key: 'social_media',
    displayLabel: 'Média',
    component: <SocialMedias />,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
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
];
