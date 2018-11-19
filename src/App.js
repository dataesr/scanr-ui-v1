import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Search from './containers/Search/Search';

// Structures
import Structure from './containers/Structures/Structure/Structure';
import StructureFilters from './config/descriptions/structure/filters';
import StructuresGridItems from './containers/Structures/StructuresGridItems/StructuresGridItems';

// Personnes
import Person from './containers/Persons/Person/Person';
import PersonFilters from './config/descriptions/person/filters';
import PersonsGridItems from './containers/Persons/PersonsGridItems/PersonsGridItems';

// Nomenclatures descriptions
import Nomenclatures from './containers/Nomenclatures/Nomenclatures';
import BadgesDescription from './config/descriptions/nomenclatures/badges';
import PanelsDescription from './config/descriptions/nomenclatures/panelsERC';

/* eslint-disable */
const App = () => (
  <BrowserRouter basename={process.env.REACT_APP_PUBLIC_URL}>
    <Switch>
    {console.log('PUBLIC_URL', process.env.REACT_APP_PUBLIC_URL)}
      <Route
        path="/badges"
        render={props => (
          <Nomenclatures
            {...props}
            description={BadgesDescription}
            defaulSortfield="name_fr"
            infoMessage="vide"
            labelAdd="Ajouter un badge"
            schemaName="badges"
            title="Badges"
            urlAPI="badges"
          />)}
      />

      <Route
        path="/panelsERC"
        render={props => (
          <Nomenclatures
            {...props}
            description={PanelsDescription}
            defaulSortfield="level"
            infoMessage="vide"
            labelAdd="Ajouter un panel ERC"
            schemaName="panels"
            title="Panel ERC"
            urlAPI="panels"
          />)}
      />

      <Route
        path={['/structures/:id', '/structures']}
        render={props => (
          <Search
            {...props}
            entity="structures"
            entityComponent={Structure}
            filtersConfig={StructureFilters}
            gridComponent={<StructuresGridItems />}
            label="structure"
          />)}
      />
      <Route
        path={['/entreprises/:id', '/entreprises']}
        render={props => (
          <Search
            {...props}
            entity="entreprises"
            filtersConfig={StructureFilters}
            entityComponent={Structure}
            gridComponent={<StructuresGridItems />}
            label="structure"
          />)}
      />
      <Route
        path={['/institutions/:id', '/institutions']}
        render={props => (
          <Search
            {...props}
            entity="institutions"
            filtersConfig={StructureFilters}
            entityComponent={Structure}
            gridComponent={<StructuresGridItems />}
            label="structure"
          />)}
      />
      <Route
        path="/persons"
        render={props => (
          <Search
            {...props}
            entity="persons"
            filtersConfig={PersonFilters}
            entityComponent={Person}
            gridComponent={<PersonsGridItems />}
            label="personnes"
          />)}
      />
      <Redirect from="/" to="structures" />
    </Switch>
  </BrowserRouter>
);
/* eslint-enable */

export default App;
