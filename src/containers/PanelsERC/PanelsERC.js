import React, { Component } from 'react';

import axios from '../../axios';
import Aux from '../../hoc/Aux';
import NomenclatureField from '../Fields/NomenclatureField/NomenclatureField';

import PanelsDescription from '../../config/descriptions/nomenclatures/panelsERC';

class PanelsERC extends Component {
  state = {
    panels: [],
  };

  componentDidMount() {
    this.getPanels();
  }

  getPanels = () => {
    const url = 'panels?sort=[("level",1)]';
    axios.get(url)
      .then((response) => {
        console.log('panels:', response);
        this.setState({ panels: response.data.data });
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
