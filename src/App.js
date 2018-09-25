import React, { Component } from 'react';

import Columns from 'react-bulma-components/lib/components/columns';
import { version } from './config/config';

import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Structures from './containers/Structures/Structures';


import classes from './App.css';

class App extends Component {
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
      <div>
        <nav className="navbar is-light">
          <div className="navbar-menu">
            <a className="navbar-item">
              <span className={classes.data}>#data</span>
              <span className={classes.esr}>ESR</span>
              BO
              <span className={classes.version}>{version}</span>
            </a>
          </div>
        </nav>

        <Columns gapless>
          <Columns.Column size="one-fifth">
            <Menu />
          </Columns.Column>
          <Columns.Column>

            <Header
              searchText={this.searchTextHandler}
              nStructures={this.state.n_structures}
            />

            <Structures
              searchText={this.state.searchText}
              nStructures={this.setNStructures}
            />

          </Columns.Column>
        </Columns>

      </div>
    );
  }
}

export default App;
