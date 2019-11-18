
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import ButtonToSearch from '../Ui/Buttons/ButtonToSearch';

import classes from './GraphComponents.scss';


export default class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.BlockComponent = null;
  }

  render() {
    let GraphComponent = '';
    const txt = "Désolé, ce focus n'existe pas !";

    try {
      switch (this.props.type) {
        case 'map':
          GraphComponent = loadable(() => import('./Graphs/LeafletMap'));
          break;
        case 'timeline':
          GraphComponent = loadable(() => import('./Graphs/HighChartsTimeline'));
          break;
        case 'packedbubble':
          GraphComponent = loadable(() => import('./Graphs/HighChartsPackedbubble'));
          break;
        case 'bar':
          GraphComponent = loadable(() => import('./Graphs/HighChartsBar'));
          break;
        case 'donut':
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
        <div className="p-4">
          <div className={classes.Title}>
            {this.props.title}
          </div>
          <div className={`${classes.Subtitle}`}>
            {this.props.subtitle}
          </div>
          {
          // <p className={`${classes.Title}`}>
          //   {this.createTags()}
          // </p>
        }
        </div>
      );
      const FooterComponent = () => (
        <div className="p-4">
          {
                (this.props.href)
                  ? (
                    <ButtonToSearch
                      href={this.props.href}
                      className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                    >
                      { this.props.buttonText }
                    </ButtonToSearch>
                  )
                  : null
              }
        </div>

      );
      this.BlockComponent = () => (
        <div>
          <TitleComponent />
          <GraphComponent filename={this.props.title} data={this.props.data} language={this.props.language} style={this.props.style} />
          { (this.props.href) ? (<FooterComponent />) : null}
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
    if (this.props.data !== []) {
      return (
        <div className={`w-100 ${classes.graphCard}`}>
          <this.BlockComponent />
        </div>
      );
    }
    return null;
  }
}

DisplayComponent.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  data: PropTypes.any,
  style: PropTypes.any,
  href: PropTypes.any,
  buttonText: PropTypes.any,
};
