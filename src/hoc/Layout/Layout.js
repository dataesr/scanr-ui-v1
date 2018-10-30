import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Aux from '../Aux';
import Menu from './Menu/Menu';
import Header from './Header/Header';
import StructuresList from '../../containers/Structures/StructuresList/StructuresList';
import Structure from '../../containers/Structures/Structure/Structure';

import classes from './Layout.scss';

class Layout extends Component {
  state = {
    searchText: '',
    n_structures: 0,
  };

  searchTextHandler = (event) => {
    this.setState({ searchText: event.target.value });
  }

  setNStructures = (nb) => {
    const newState = { ...this.state };
    newState.n_structures = nb;
    this.setState(newState);
  }

  render() {
    return (
      <Aux>
        <div className={classes.Layout}>
          <div className={classes.Menu}>
            <Menu
              focusMenu={this.focusMenuHandler}
              activeItem={this.state.focus}
            />
          </div>
          <div id="content" className={classes.Content}>
            <Header
              searchTextHandler={this.searchTextHandler}
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
          </div>
        </div>

      </Aux>
    );
  }
}

export default Layout;
