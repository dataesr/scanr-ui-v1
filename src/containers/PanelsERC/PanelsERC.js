import React, { Component, Fragment } from 'react';

import axios from '../../axios';

import NomenclatureField from '../Fields/NomenclatureField/NomenclatureField';
import Menu from '../Menu/Menu';
import Meta from '../../UI/Field/Meta';
import PanelsDescription from '../../config/descriptions/nomenclatures/panelsERC';

import classes from './PanelsERC.scss';

class PanelsERC extends Component {
  state = {
    panels: [],
    links: {},
    sort: {
      field: 'level',
      direction: 1,
    },
    total: 0,
  };

  componentDidMount() {
    this.getPanels();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort.field !== this.state.sort.field || prevState.sort.direction !== this.state.sort.direction) {
      this.getPanels();
    }
  }
  
  changeDirection = (field) => {
    this.setState( prevState => ({
      sort: {
          field,
          direction : prevState.sort.field === field ? prevState.sort.direction * (-1) : 1,
        }
      })
    )
  }

  getPanels = (
    pagination = null,
  ) => {
    let url = `panels?sort=[("${this.state.sort.field}",${this.state.sort.direction})]`;

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
          total: response.data.meta.total,
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
              changeDirection={this.changeDirection}
              data={this.state.panels}
              description={PanelsDescription}
              refreshFunction={this.getPanels}
              infoMessage="vide"
              label="Ajouter un panel ERC"
              schemaName="panels"
              url="panels"
              title="Panels ERC"
              total={this.state.total}
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
