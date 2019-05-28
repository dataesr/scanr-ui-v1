
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
            {this.props.title}
          </p>
          <p className={`${classes.Subtitle}`}>
            {this.props.subtitle}
          </p>
          {
          // <p className={`${classes.Title}`}>
          //   {this.createTags()}
          // </p>
        }
        </div>
      );
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
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};
