
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import axios from 'axios';

const paramsFile = require('../focus.json');

export default class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.BlockComponent = null;
    this.state = {
      // data: 'toto',
      data: null,
    };
  }

  componentWillMount() {
    axios.get('http://10.243.98.74/organizations/scanr?where=%7B%22badges.code%22:%20%22ResCurie%22%7D').then((res) => {
      this.setState({ data: res.data });
    });
  }

  render() {
    let GraphComponent = '';
    const id = Number(this.props.id);
    try {
      switch (paramsFile.elems[id].type) {
        case 'map':
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
        default:
          GraphComponent = () => (
            <p>{"Désolé, ce focus n'existe pas !"}</p>
          );
      }
      const TitleComponent = () => (
        <div>
          {paramsFile.elems[id].name}
          <br />
          {paramsFile.elems[id].subname}
        </div>
      );
      const TextComponent = () => (
        <div>
          {paramsFile.elems[id].text}
          <br />
          {paramsFile.elems[id].subtext}
        </div>
      );
      this.BlockComponent = () => (
        <div>
          <TitleComponent />
          <GraphComponent data={this.state.data}/>
          <TextComponent />
        </div>
      );
    } catch (error) {
      this.BlockComponent = () => (
        <p>{"Désolé, ce focus n'existe pas !"}</p>
      );
    }
    return (
      <div>
        {this.state.data ? <this.BlockComponent /> : <div>Chargement (loading) </div> }
      </div>
    )
  }
}
