import React from 'react';
import Input from '../../../UI/Field/Editable/Input/Input';
import Meta from '../../../UI/Field/Meta';
import SocialMedias from '../../../UI/Field/Editable/SocialMedias/SocialMedias';
import { NO_NULL_RULE } from '../../config';

export default [
  {
    key: 'account',
    displayLabel: 'Compte',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '40%',
    },
  },
  {
    key: 'social_media',
    displayLabel: 'Média',
    component: <SocialMedias />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '30%',
    },
  },
  {
    key: 'url',
    displayLabel: 'Url',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '10%',
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
