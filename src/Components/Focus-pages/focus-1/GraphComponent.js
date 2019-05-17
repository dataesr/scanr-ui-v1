
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import axios from 'axios';

import classes from './GraphComponent.scss';

/**
 * GraphComponent component <br/>
 * Url : . <br/>
 * Description : Choix du graph à afficher en fonction de l'id et de focus.jspn <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>
 */

const paramsFile = require('../focus.json');

export default class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.BlockComponent = null;
    this.state = {
      // data: 'toto',
      data: null,
      isMap: false,
    };
  }

  componentWillMount() {
    axios.get('http://10.243.98.74/organizations/scanr?where=%7B%22badges.code%22:%20%22ResCurie%22%7D').then((res) => {
      this.setState({ data: res.data });
    });
  }

  createTags = () => {
    const table = [];
    const id = Number(this.props.id);
    for (let i = 0; i < paramsFile.elems[id].tags.length; i += 1) {
      table.push(<td>{paramsFile.elems[id].tags[i]}</td>);
    }
    return table;
  }

  render() {
    let GraphComponent = '';
    const id = Number(this.props.id);
    try {
      switch (paramsFile.elems[id].type) {
        case 'map':
          this.state.isMap = true;
          GraphComponent = Loadable({
            loader: () => import('./graphs/LeafletMap'),
            loading: () => <div>Chargement en cours...</div>,
          });
          break;
        case 'bar':
          GraphComponent = Loadable({
            loader: () => import('./graphs/HighChartsBar'),
            loading: () => <div>Chargement en cours...</div>,
          });
          break;
        case 'pie':
          GraphComponent = Loadable({
            loader: () => import('./graphs/HighChartsPie'),
            loading: () => <div>Chargement en cours...</div>,
          });
          break;
        case 'other':
          GraphComponent = Loadable({
            loader: () => import('./graphs/TeamPie'),
            loading: () => <div>Chargement en cours...</div>,
          });
          break;
        default:
          GraphComponent = () => (
            <p>{"Désolé, ce focus n'existe pas !"}</p>
          );
      }

      const TitleComponent = () => (
        <div>
          <p className={`${classes.Title}`}>
            {paramsFile.elems[id].name}
          </p>
          <p className={`${classes.Subtitle}`}>
            {paramsFile.elems[id].subname}
          </p>
          <p className={`${classes.Title}`}>
            {this.createTags()}
          </p>
        </div>
      );
      const TextComponent = () => (
        <div>
          <p className={`${classes.Text}`}>
            {paramsFile.elems[id].text}
          </p>
          <p>
            {paramsFile.elems[id].subtext}
          </p>
        </div>
      );
      this.BlockComponent = () => (
        <div>
          <TitleComponent />
          {this.state.isMap ? <GraphComponent filename={paramsFile.elems[id].name} data={this.state.data} language={this.props.language} /> : <GraphComponent data={paramsFile.elems[id].data} language={this.props.language} />}
          <TextComponent />
        </div>
      );
    } catch (error) {
      const txt = "Désolé, ce focus n'existe pas !";
      this.BlockComponent = () => (
        <p>{txt}</p>
      );
    }
    return (
      <div>
        {this.state.data ? <this.BlockComponent /> : <div>Chargement (loading) </div> }
      </div>
    );
  }
}

DisplayComponent.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
