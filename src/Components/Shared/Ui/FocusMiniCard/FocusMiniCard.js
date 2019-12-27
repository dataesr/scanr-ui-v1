import React from 'react';
import PropTypes from 'prop-types';

import BubbleSVG from '../../svg/icon-focus-bubble';
import BubbleTopSVG from '../../svg/icon-focus-bubbleTop';
import DonutSVG from '../../svg/icon-focus-donut';
import HistoTopSVG from '../../svg/icon-focus-histoTop';
import MapSVG from '../../svg/icon-focus-map';
import TreemapSVG from '../../svg/icon-focus-treemap';
import YoutubeSVG from '../../svg/icon-focus-youtube';
import MT180SVG from '../../svg/icon-focus-mt180';
import SoftwareHeritageSVG from '../../svg/icon-focus-software-heritage';

/* COULEURS */
import {
  ENTITY_COLOR,
  PERSON_COLOR,
  PROJECT_COLOR,
  PUBLICATION_COLOR,
} from '../../../../config/config';

/* SCSS */
import classes from './FocusMiniCard.scss';

const FocusMiniCard = (props) => {
  let color = '#ffffff';
  switch (props.schema) {
    case 'structures':
      color = ENTITY_COLOR;
      break;
    case 'persons':
      color = PERSON_COLOR;
      break;
    case 'projects':
      color = PROJECT_COLOR;
      break;
    case 'publications':
      color = PUBLICATION_COLOR;
      break;
    default:
      color = '#000000';
  }

  let componentSvg = null;
  const marginMT = { 'margin-bottom': '28px' };
  switch (props.type) {
    case 'bubble':
      componentSvg = <BubbleSVG fill={color} width="50px" />;
      break;
    case 'bubbleTop':
      componentSvg = <BubbleTopSVG fill={color} width="50px" />;
      break;
    case 'donut':
      componentSvg = <DonutSVG fill={color} width="50px" />;
      break;
    case 'histoTop':
      componentSvg = <HistoTopSVG fill={color} width="50px" />;
      break;
    case 'map':
      componentSvg = <MapSVG fill={color} width="50px" />;
      break;
    case 'youtube':
      componentSvg = <YoutubeSVG fill={color} width="50px" />;
      break;
    case 'mt180':
      componentSvg = <MT180SVG fill={color} style={marginMT} width="50px" />;
      break;
    case 'software-heritage':
      componentSvg = <SoftwareHeritageSVG fill={color} width="50px" />;
      break;
    case 'treemap':
      componentSvg = <TreemapSVG fill={color} width="50px" />;
      break;
    default:
      componentSvg = null;
  }

  return (
    <div className={classes.FocusMiniCard}>
      <div className="d-flex flex-row">
        <a href={props.url} className="align-self-left">
          {componentSvg}
        </a>
        <div className="d-flex align-items-center">
          <a href={props.url} className={classes.Title}>
            {props.title}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FocusMiniCard;

FocusMiniCard.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
