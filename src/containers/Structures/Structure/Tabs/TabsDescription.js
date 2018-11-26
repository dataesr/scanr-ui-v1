import React from 'react';

import Addresses from './Addresses/Addresses';
import Deals from './Deals/Deals';
import Leaders from './Leaders/Leaders';
import Main from './Main/Main';
import Relationship from './Relationship/Relationship';
import Supervisors from './Supervisors/Supervisors';
import Themes from './Themes/Themes';
import WebAndContacts from './WebAndContacts/WebAndContacts';


export default [
  {
    id: 'main',
    label: 'Général',
    component: <Main />,
  },
  {
    id: 'webAndContacts',
    label: 'Web & Contacts',
    component: <WebAndContacts />,
  },
  {
    id: 'addresses',
    label: 'Adresses',
    component: <Addresses />,
  },
  {
    id: 'supervisors',
    label: 'Tutelles',
    component: <Supervisors />,
  },
  {
    id: 'themes',
    label: 'Thématiques',
    component: <Themes />,
  },
  {
    id: 'relationship',
    label: 'Relations',
    component: <Relationship />,
  },
  {
    id: 'leaders',
    label: 'Dirigeants',
    component: <Leaders />,
  },
  {
    id: 'deals',
    label: 'Offres',
    component: <Deals />,
  },
];
