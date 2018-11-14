import React from 'react';

import Main from './Main/Main';
import Resume from './Resume/Resume';

export default [
  {
    id: 'resume',
    label: 'Résumé',
    component: <Resume />,
  },
  {
    id: 'main',
    label: 'Général',
    component: <Main />,
  },
];
