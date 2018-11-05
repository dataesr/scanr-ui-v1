import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Aux from '../Aux';
import Menu from './Menu/Menu';
import Header from './Header/Header';
import PanelsERC from '../../containers/PanelsERC/PanelsERC';
import StructuresList from '../../containers/Structures/StructuresList/StructuresList';
import Structure from '../../containers/Structures/Structure/Structure';

import classes from './Layout.scss';

class Layout extends Component {
  state = {
    isLoading: false,
    searchText: '',
    nStructures: 0,
    renderList: false,
  };

  searchTextHandler = (event) => {
    this.setState({ searchText: event.target.value, renderList: true });
  }

  setNStructures = (nb) => {
    this.setState({ nStructures: nb });
  }

  setIsLoading = (bool) => {
    this.setState({ isLoading: bool });
  }

  render() {
    return (
      <Aux>
        <div className={classes.Layout}>
          <div className={classes.Menu}>
            <Menu />
          </div>
          <div id="content" className={classes.Content}>
            <Header
              isLoading={this.state.isLoading}
              nStructures={this.state.nStructures}
              searchTextHandler={this.searchTextHandler}
            />
            <Switch>
              <Route path="/panelsERC" component={PanelsERC} />
              <Route
                path="/structures/:esr_id"
                render={props => (<Structure {...props} renderList={this.state.renderList} />)}
              />
              <Route
                exact
                path="/structures"
                render={props => (
                  <StructuresList
                    {...props}
                    searchText={this.state.searchText}
                    nStructures={this.setNStructures}
                    setIsLoading={this.setIsLoading}
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
