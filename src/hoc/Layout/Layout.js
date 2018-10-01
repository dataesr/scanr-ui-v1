import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Columns from 'react-bulma-components/lib/components/columns';
import { version } from '../../config/config';

import Menu from './Menu/Menu';
import Header from './Header/Header';
import StructuresList from '../../containers/Structures/StructuresList/StructuresList';
import Structure from '../../containers/Structures/Structure/Structure';
import Aux from '../Aux';

import classes from './Layout.scss';

class Layout extends Component {
  state = {
    searchText: '',
    n_structures: 0,
  };

  searchTextHandler = (event) => {
    const newState = { ...this.state };
    newState.searchText = event.target.value;
    this.setState(newState);
  }

  setNStructures = (nb) => {
    const newState = { ...this.state };
    newState.n_structures = nb;
    this.setState(newState);
  }

  render() {
    return (
      <Aux>
        <nav className="navbar is-light">
          <div className="navbar-menu">
            <a className="navbar-item">
              <span className={classes.data}>#data</span>
              <span className={classes.esr}>ESR</span>
              BO
              <span className={classes.Version}>{version}</span>
            </a>
          </div>
        </nav>

        <Columns gapless className={classes.Layout}>
          <Columns.Column size="one-fifth" className={classes.Menu}>
            <Menu
              focusMenu={this.focusMenuHandler}
              activeItem={this.state.focus}
            />
          </Columns.Column>
          <Columns.Column>
            <Header
              searchText={this.searchTextHandler}
              nStructures={this.state.n_structures}
            />
            <Switch>
              <Route path="/structures/:esr_id" component={Structure} />
              <Route
                exact
                path="/structures"
                render={props => (
                  <StructuresList
                    {...props}
                    searchText={this.state.searchText}
                    nStructures={this.setNStructures}
                  />)}
              />
              <Route path="/entreprises" render={() => (<h3>Entreprises</h3>)} />
              <Route path="/institutions" render={() => (<h3>Institutions</h3>)} />
              <Redirect from="/" to="structures" />
            </Switch>
          </Columns.Column>
        </Columns>

      </Aux>
    );
  }
}

export default Layout;
