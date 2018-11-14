import React from 'react';
import AutoComplete from '../../../UI/Field/Editable/AutoComplete/AutoComplete';
import { NO_NULL_RULE } from '../../config';

export default [
  {
    key: 'key',
    displayLabel: 'Badges',
    component: (
      <AutoComplete
        schemaName="badges"
        autoCompleteKeys="name_fr"
        labelKey="name_fr"
      />),
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
  },
];
