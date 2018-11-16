import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import StructureFilters from './config/descriptions/structure/filters';
import Nomenclatures from './containers/Nomenclatures/Nomenclatures';
import Search from './containers/Search/Search';
import StructuresGridItems from './containers/Structures/StructuresGridItems/StructuresGridItems';
import Structure from './containers/Structures/Structure/Structure';

// Nomenclatures descriptions
import BadgesDescription from './config/descriptions/nomenclatures/badges';
import PanelsDescription from './config/descriptions/nomenclatures/panelsERC';

/* eslint-disable */
const App = () => (
  <BrowserRouter>
    <Switch>
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
      <Redirect from="/" to="structures" />
    </Switch>
  </BrowserRouter>
);
/* eslint-enable */

export default App;
