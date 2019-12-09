import React from 'react';
import PropTypes from 'prop-types';

import BubbleSVG from '../../svg/icon-focus-bubble';
import BubbleTopSVG from '../../svg/icon-focus-bubbleTop';
import DonutSVG from '../../svg/icon-focus-donut';
import HistoTopSVG from '../../svg/icon-focus-histoTop';
import MapSVG from '../../svg/icon-focus-map';
import TreemapSVG from '../../svg/icon-focus-treemap';
import YoutubeSVG from '../../svg/icon-focus-youtube';
import SoftwareHeritageSVG from '../../svg/icon-focus-software-heritage';

import ButtonToPage from '../Buttons/ButtonToPage';

/* COULEURS */
import {
  ENTITY_COLOR,
  PERSON_COLOR,
  PROJECT_COLOR,
  PUBLICATION_COLOR,
} from '../../../../config/config';

/* SCSS */
import classes from './FocusCard.scss';

const FocusCard = (props) => {
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
  switch (props.type) {
    case 'bubble':
      componentSvg = <BubbleSVG fill={color} />;
      break;
    case 'bubbleTop':
      componentSvg = <BubbleTopSVG fill={color} />;
      break;
    case 'donut':
      componentSvg = <DonutSVG fill={color} />;
      break;
    case 'histoTop':
      componentSvg = <HistoTopSVG fill={color} />;
      break;
    case 'map':
      componentSvg = <MapSVG fill={color} />;
      break;
    case 'youtube':
      componentSvg = <YoutubeSVG fill={color} />;
      break;
    case 'software-heritage':
      componentSvg = <SoftwareHeritageSVG fill={color} />;
      break;
    case 'treemap':
      componentSvg = <TreemapSVG fill={color} />;
      break;
    default:
      componentSvg = null;
  }

  return (
    <div className={`d-flex flex-column ${classes.FocusCard}`}>
      <a href={props.url} className="align-self-center">
        {componentSvg}
      </a>
      <a href={props.url} className={classes.Title}>
        {props.title}
      </a>
      <div className={`d-flex align-items-center mt-auto ${classes.TagsAndButton}`}>
        <div className="d-flex flex-wrap mr-auto">
          {props.tags.map(tag => (<div className={classes.Tag} key={tag}>{tag}</div>))}
        </div>
        <ButtonToPage
          className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
          target="_blank"
          url={props.url}
        >
          Lire
        </ButtonToPage>
      </div>
    </div>
  );
};

export default FocusCard;

FocusCard.propTypes = {
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
