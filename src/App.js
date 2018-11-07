import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import StructureFilters from './config/descriptions/structure/filters'
import PanelsERC from './containers/PanelsERC/PanelsERC';
import Search from './containers/Search/Search';
import StructuresGridItems from './containers/Structures/StructuresGridItems/StructuresGridItems';
import Structure from './containers/Structures/Structure/Structure';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/panelsERC" component={PanelsERC} />
      <Route
        path="/structures"
        render={props => (
          <Search
            {...props}
            entity="structures"
            filtersConfig={StructureFilters}
            entityComponent={Structure}
            gridComponent={<StructuresGridItems />}
            label="structure"
          />)}
      />
      <Route path="/entreprises" render={() => (<h3>Entreprises</h3>)} />
      <Route path="/institutions" component={() => (<h3>Institutions</h3>)} />
      <Redirect from="/" to="structures" />
    </Switch>
  </BrowserRouter>
);

export default App;
