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

import ButtonToPage from '../Buttons/ButtonToPage';

/* SCSS */
import classes from './FocusCard.scss';

const FocusCard = (props) => {
  let color = '#ffffff';
  switch (props.schema) {
    case 'structures':
      color = classes.entityColor;
      break;
    case 'persons':
      color = classes.personColor;
      break;
    case 'projects':
      color = classes.projectgreenColor;
      break;
    case 'publications':
      color = classes.productionColor;
      break;
    default:
      color = classes.scanrblueColor;
  }

  let componentSvg = null;
  const style = { 'margin-bottom': '24px', height: '100px' };
  switch (props.type) {
    case 'bubble':
      componentSvg = <BubbleSVG fill={color} width="100px" style={style} />;
      break;
    case 'bubbleTop':
      componentSvg = <BubbleTopSVG fill={color} width="100px" style={style} />;
      break;
    case 'donut':
      componentSvg = <DonutSVG fill={color} width="100px" style={style} />;
      break;
    case 'histoTop':
      componentSvg = <HistoTopSVG fill={color} width="100px" style={style} />;
      break;
    case 'map':
      componentSvg = <MapSVG fill={color} width="100px" style={style} />;
      break;
    case 'youtube':
      componentSvg = <YoutubeSVG fill={color} width="100px" style={style} />;
      break;
    case 'mt180':
      componentSvg = <MT180SVG fill={color} width="100px" style={style} />;
      break;
    case 'software-heritage':
      componentSvg = <SoftwareHeritageSVG fill={color} width="100px" style={style} />;
      break;
    case 'treemap':
      componentSvg = <TreemapSVG fill={color} width="100px" style={style} />;
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
