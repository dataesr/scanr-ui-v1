import React from 'react';
import InputDate from '../../../UI/Field/Editable/InputDate/InputDate';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';
import TextArea from '../../../UI/Field/Editable/TextArea/TextArea';
import { NO_NULL_RULE, STATUS_RULE } from '../../config';

export default [
  {
    key: 'description_fr',
    displayLabel: 'Fr',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '30%',
    },
  },
  {
    key: 'description_en',
    displayLabel: 'En',
    component: <TextArea />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '30%',
    },
  },
  {
    key: 'status',
    displayLabel: 'Statut',
    component: <Status />,
    isEditable: true,
    isShown: true,
    canBeNull: false,
    rules: [NO_NULL_RULE, STATUS_RULE],
    style: {
      width: '8%',
    },
  },
  {
    key: 'start_date',
    displayLabel: 'Début',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'end_date',
    displayLabel: 'Fin',
    component: <InputDate />,
    isEditable: false,
    isShown: true,
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
      width: '5%',
    },
  },
];
