
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
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
    this.childRef = React.createRef();
    this.state = {
      name: paramsFile.elems[this.props.id].name,
      data: null,
      isMap: false,
    };
    this.exportPdf = this.exportPdf.bind(this);
    this.exportPng = this.exportPng.bind(this);
  }

  componentDidMount() {
    axios.get('http://185.161.45.213/organizations/scanr?where={%22badges.code%22:%20%22PoleCompetitivite%22}', {
      headers: {
        Authorization: 'Basic YWRtaW46ZGF0YUVTUjIwMTk=',
      },
    })
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch((error) => {
        alert(error);
        console.log(error.config);
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

  exportPdf() {
    this.childRef.current.exportChartPdf();
  }

  exportPng() {
    this.childRef.current.exportChartPng();
  }

  render() {
    let GraphComponent = '';
    const id = Number(this.props.id);
    const txt = "Désolé, ce focus n'existe pas !";

    try {
      switch (paramsFile.elems[id].type) {
        case 'map':
          this.state.isMap = true;
          GraphComponent = loadable(() => import('./graphs/LeafletMap'));
          break;
        case 'bar':
          GraphComponent = loadable(() => import('./graphs/HighChartsBar'));
          break;
        case 'pie':
          GraphComponent = loadable(() => import('./graphs/HighChartsPie'));
          break;
        case 'other':
          GraphComponent = loadable(() => import('./graphs/TeamPie'));
          break;
        default:
          GraphComponent = () => (
            <p>{txt}</p>
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
      const btnShare = {
        paddingLeft: '5px',
        paddingRight: '10px',
        color: '#3778bb',
        cursor: 'not-allowed',
      };
      const btnExport = {
        paddingLeft: '5px',
        paddingRight: '5px',
        color: '#3778bb',
        cursor: 'pointer',
      };
      const ShareComponent = () => (
        <div>
          <hr />
          <div style={{ display: 'inline-block', float: 'left' }}>
            <p className={`${classes.Subtitle}`}>Partager</p>
            <i style={btnShare} className="fas fa-share-alt-square fa-lg" />
            <p className={`${classes.Subtitle}`}>Intégrer le code</p>
            <i style={btnShare} className="fas fa-code fa-lg" />
          </div>
          <div style={{ display: 'inline-block', marginBottom: '20px', float: 'right' }}>
            <p className={`${classes.Subtitle}`}><b>Télécharger</b></p>
            <button type="button" onClick={this.exportPdf} className={`${classes.Button}`}><i style={btnExport} className="fas fa-file-pdf fa-lg" /></button>
            <p className={`${classes.Subtitle}`}>.pdf</p>
            <button type="button" onClick={this.exportPng} className={`${classes.Button}`}><i style={btnExport} className="fas fa-image fa-lg" /></button>
            <p className={`${classes.Subtitle}`}>.png</p>
            <i style={btnExport} className="fas fa-table fa-lg" />
            <p className={`${classes.Subtitle}`}>.csv</p>
          </div>
        </div>
      );
      this.BlockComponent = () => (
        <div>
          <TitleComponent />
          {this.state.isMap ? <GraphComponent filename={this.state.name} data={this.state.data} language={this.props.language} ref={this.childRef} /> : <GraphComponent filename={this.state.name} data={paramsFile.elems[id].data} language={this.props.language} ref={this.childRef} />}
          <TextComponent />
          <ShareComponent />
        </div>
      );
    } catch (error) {
      this.BlockComponent = () => (
        <p>{txt}</p>
      );
    }
    return (
      <div>
        {this.state.data ? <this.BlockComponent /> : <div>Loading...</div>}
      </div>
    );
  }
}

DisplayComponent.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
