import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { version } from '../../config/config';

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
    height: '100%'
  };

  componentDidMount() {
    const height = document.getElementById('content').clientHeight
    this.setState({ height });
  }

  componentDidUpdate(prevProps, prevState) {
    const height = document.getElementById('content').clientHeight
    if (height !== prevState.height) {
      this.setState({ height });
    }
  }

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
    const minHeight = document.documentElement.clientHeight;
    return (
      <Aux>
        <div className="is-light">
          <a className="navbar-item">
            <span className={classes.data}>#data</span>
            <span className={classes.esr}>ESR</span>
            BO
            <span className={classes.Version}>{version}</span>
          </a>
        </div>

        <div className={classes.Layout}>
          <div className={classes.Menu} style={{ height: this.state.height, minHeight }}>
            <Menu
              focusMenu={this.focusMenuHandler}
              activeItem={this.state.focus}
            />
          </div>
          <div id="content" className={classes.Content} style={{ minHeight }}>
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
          </div>
        </div>

      </Aux>
    );
  }
}

export default Layout;
