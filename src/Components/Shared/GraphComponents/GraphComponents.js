
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';

import classes from './GraphComponents.scss';

/**
 * GraphComponents component <br/>
 * Url : . <br/>
 * Description : Choix du graph à afficher en fonction de l'id et de focus.jspn <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>
 */

export default class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.BlockComponent = null;
  }

  createTags = () => {
    const table = [];
    for (let i = 0; i < this.props.tags.length; i += 1) {
      table.push(<td>{this.props.tags[i]}</td>);
    }
    return table;
  }

  render() {
    let GraphComponent = '';
    const txt = "Désolé, ce focus n'existe pas !";

    try {
      switch (this.props.type) {
        case 'map':
          GraphComponent = loadable(() => import('./Graphs/LeafletMap'));
          break;
        case 'bar':
          GraphComponent = loadable(() => import('./Graphs/HighChartsBar'));
          break;
        case 'pie':
          GraphComponent = loadable(() => import('./Graphs/HighChartsDonut'));
          break;
        case 'other':
          GraphComponent = loadable(() => import('./Graphs/TeamPie'));
          break;
        default:
          GraphComponent = () => (
            <p>{txt}</p>
          );
      }

      const TitleComponent = () => (
        <div>
          <p className={`${classes.Title}`}>
            {this.props.name}
          </p>
          <p className={`${classes.Subtitle}`}>
            {this.props.subname}
          </p>
          {
          // <p className={`${classes.Title}`}>
          //   {this.createTags()}
          // </p>
        }
        </div>
      );
      // const btnShare = {
      //   paddingLeft: '5px',
      //   paddingRight: '10px',
      //   color: '#3778bb',
      //   cursor: 'not-allowed',
      // };
      // const btnExport = {
      //   color: '#3778bb',
      //   cursor: this.state.cursor,
      // };
      // const ShareComponent = () => (
      //   <div>
      //     <hr />
      //     <div style={{ display: 'inline-block', float: 'left' }}>
      //       <p className={`${classes.Subtitle}`}>Partager</p>
      //       <i style={btnShare} className="fas fa-share-alt-square fa-lg" />
      //       <p className={`${classes.Subtitle}`}>Intégrer le code</p>
      //       <i style={btnShare} className="fas fa-code fa-lg" />
      //     </div>
      //     <div style={{ display: 'inline-block', marginBottom: '20px', float: 'right' }}>
      //       <p className={`${classes.Subtitle}`}><b>Télécharger</b></p>
      //       <button type="button" onClick={this.exportPdf} className={`${classes.Button}`}><i style={btnExport} className="fas fa-file-pdf fa-lg" /></button>
      //       <p className={`${classes.Subtitle}`}>.pdf</p>
      //       <button type="button" onClick={this.exportPng} className={`${classes.Button}`}><i style={btnExport} className="fas fa-image fa-lg" /></button>
      //       <p className={`${classes.Subtitle}`}>.png</p>
      //       <button type="button" onClick={this.exportCsv} className={`${classes.Button}`}><i style={btnExport} className="fas fa-table fa-lg" /></button>
      //       <p className={`${classes.Subtitle}`}>.csv</p>
      //     </div>
      //   </div>
      // );
      this.BlockComponent = () => (
        <div>
          <TitleComponent />
          <GraphComponent filename={this.props.name} data={this.props.data} language={this.props.language} />
          {
          // <TextComponent />
          // <ShareComponent />
          // <GraphModal />
        }
        </div>
      );
    } catch (error) {
      this.BlockComponent = () => (
        <p>{txt}</p>
      );
    }
    return (
      <div>
        <this.BlockComponent />
      </div>
    );
  }
}

DisplayComponent.propTypes = {
  language: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  subname: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};
