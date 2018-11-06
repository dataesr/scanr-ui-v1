import React, { Component } from 'react';

import axios from '../../axios';
import Menu from '../Menu/Menu';
import NomenclatureField from '../Fields/NomenclatureField/NomenclatureField';
import PanelsDescription from '../../config/descriptions/nomenclatures/panelsERC';
import classes from './PanelsERC.scss';

class PanelsERC extends Component {
  state = {
    panels: [],
    links: {},
  };

  componentDidMount() {
    this.getPanels();
  }

  getPanels = (pagination) => {
    let url = 'panels?sort=[("level",1)]';
    if (pagination) {
      if (this.state.links[pagination]) {
        url = this.state.links[pagination].href;
      }
    }
    axios.get(url)
      .then((response) => {
        this.setState({
          panels: response.data.data,
          links: response.data.links,
        });
      });
  }

  render() {
    if (this.state.panels.length > 0) {
      return (
        <div className={classes.Layout}>
          <div className={classes.Menu}>
            <Menu
              isLoading={this.state.isLoading}
              nStructures={this.state.nStructures}
              searchTextHandler={this.searchTextHandler}
            />
          </div>
          <div id="content" className={classes.Content}>
            <div className={classes.Bg} />
            <NomenclatureField
              data={this.state.panels}
              description={PanelsDescription}
              refreshFunction={this.getPanels}
              infoMessage="vide"
              label="panel ERC"
              schemaName="panels"
              url="panels"
              title="Panels ERC"
            />
          </div>
        </div>
      );
    }

    return 'Pas de panel ERC';
  }
}

export default PanelsERC;
