import React from 'react';

import Affiliations from './Affiliations/Affiliations';
import Contributors from './Contributors/Contributors';
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
  {
    id: 'contributors',
    label: 'Contributeurs',
    component: <Contributors />,
  },
];
