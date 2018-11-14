import React from 'react';

import { NO_NULL_RULE, STATUS_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import LeaderField from '../../../containers/Structures/Structure/Tabs/Leaders/LeaderField'
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';

export default [
  {
    key: 'leader_id',
    displayLabel: 'Dirigeant',
    component: <LeaderField />,
    isEditable: false,
    isShown: true,
  },
  {
    key: 'rank',
    displayLabel: 'Rôle',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
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
