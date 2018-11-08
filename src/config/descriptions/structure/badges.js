import React from 'react';
import AutoComplete from '../../../UI/Field/Editable/AutoComplete/AutoComplete';

export default [
  {
    key: 'key',
    displayLabel: 'Badges',
    component: <AutoComplete />,
    requireCategoryList: true,
    isEditable: true,
    isShown: true,
    rules: {
      canBeNull: false,
    },
  },
];
