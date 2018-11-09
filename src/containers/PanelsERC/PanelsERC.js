import React, { Component, Fragment } from 'react';

import axios from '../../axios';
import NomenclatureField from '../Fields/NomenclatureField/NomenclatureField';

import PanelsDescription from '../../config/descriptions/nomenclatures/panelsERC';
import classes from './PanelsERC.scss';
class PanelsERC extends Component {
  state = {
    panels: [],
    links: {},
    sort: {
      field: 'level',
      direction: -1,
    },
  };

  componentDidMount() {
    this.getPanels();
  }

  getPanels = (
    pagination = null,
    sortTh = this.state.sort.field,
  ) => {
    let sortDirection = this.state.sort.direction;
    if (this.state.sort.field === sortTh) {
      sortDirection *= -1;
    }

    let url = `panels?sort=[("${sortTh}",${sortDirection})]`;

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
          sort: { field: sortTh, direction: sortDirection },
        });
      });
  }

  render() {
    if (this.state.panels.length > 0) {
      return (
        <div className={classes.Layout}>
          <div className={classes.Menu}>
            <Menu />
          </div>
          <div id="content" className={classes.Content}>
            <div className={classes.Bg} />
            <NomenclatureField
              data={this.state.panels}
              description={PanelsDescription}
              refreshFunction={this.getPanels}
              infoMessage="vide"
              label="Ajouter un panel ERC"
              schemaName="panels"
              url="panels"
              title="Panels ERC"
              sortField={this.state.sort.field}
              sortDirection={this.state.sort.direction}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={classes.NoResult}>
        Pas de panel ERC
      </div>
    );
  }
}

export default PanelsERC;
