import React, { Component } from 'react';

import axios from '../../axios';
import Aux from '../../hoc/Aux';
import NomenclatureField from '../Fields/NomenclatureField/NomenclatureField';

import PanelsDescription from '../../config/descriptions/nomenclatures/panelsERC';

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
        <Aux>
          <NomenclatureField
            data={this.state.panels}
            description={PanelsDescription}
            refreshFunction={this.getPanels}
            infoMessage="vide"
            label="panel ERC"
            schemaName="panels"
            url="panels"
            title="Panels ERC"
            sortField={this.state.sort.field}
            sortDirection={this.state.sort.direction}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        Pas de panel ERC
      </Aux>
    );
  }
}

export default PanelsERC;
