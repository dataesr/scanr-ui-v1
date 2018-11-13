import React from 'react';
import AutoComplete from '../../../UI/Field/Editable/AutoComplete/AutoComplete';
import SingleCheckBox from '../../../UI/Field/Editable/SingleCheckBox/SingleCheckBox';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';
import { NO_NULL_RULE, STATUS_RULE } from '../../config';

export default [
  {
    key: 'parent_id',
    displayLabel: 'Parent',
    component: (
      <AutoComplete
        schemaName="structures"
        autoCompleteKeys={['id', 'names.name_fr']}
        labelKey="name_fr"
        searchInstitution
      />),
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    schemaName: 'structures',
  },
  {
    key: 'exclusive',
    displayLabel: 'Exclusivité',
    component: <SingleCheckBox />,
    isEditable: true,
    isShown: true,
  },
  {
    key: 'status',
    displayLabel: 'Statut',
    component: <Status />,
    isEditable: true,
    isShown: true,
    canBeNull: false,
    rules: [NO_NULL_RULE, STATUS_RULE],
  },
  {
    key: 'start_date',
    displayLabel: 'Début',
    component: <InputDate />,
    isEditable: true,
    isShown: true,
  },
  {
    key: 'end_date',
    displayLabel: 'Fin',
    component: <InputDate />,
    isEditable: true,
    isShown: true,
  },
  {
    key: 'meta',
    displayLabel: '',
    component: <Meta />,
    isEditable: false,
    isShown: true,
  },
];
