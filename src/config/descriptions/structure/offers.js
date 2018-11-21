import React from 'react';

import { NO_NULL_RULE, STATUS_RULE } from '../../config';
import Input from '../../../UI/Field/Editable/Input/Input';
import AddressMini from '../../../containers/Structures/Structure/Tabs/Addresses/Address/AddressMini';
import Meta from '../../../UI/Field/Meta';
import Status from '../../../UI/Field/Editable/Status/Status';

export default [
  {
    key: 'name',
    displayLabel: 'Nom',
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '20%',
    },
  },
  {
    key: 'kind',
    displayLabel: "Type d'offre",
    component: <Input />,
    isEditable: true,
    isShown: true,
    rules: [NO_NULL_RULE],
    style: {
      width: '10%',
    },
  },
  {
    key: 'description',
    displayLabel: 'Description',
    component: <Input />,
    isEditable: true,
    isShown: true,
    style: {
      width: '30%',
    },
  },
  {
    key: 'details',
    displayLabel: 'Détails',
    component: <Input />,
    isEditable: true,
    isShown: true,
    style: {
      width: '10%',
    },
  },
  {
    key: 'domains',
    displayLabel: 'Domaines',
    component: <Input />,
    isEditable: true,
    isShown: false,
  },
  {
    key: 'address',
    displayLabel: 'Adresse',
    component: <AddressMini />,
    isEditable: false,
    isShown: false,
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
