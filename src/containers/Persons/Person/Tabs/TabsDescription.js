import React from 'react';

import Affiliations from './Affiliations/Affiliations';
import Main from './Main/Main';

export default [
  {
    id: 'main',
    label: 'Général',
    component: <Main />,
  },
  {
    id: 'affiliations',
    label: 'Affiliations',
    component: <Affiliations />,
  },
];
