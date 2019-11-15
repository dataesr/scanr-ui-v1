import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './DescriptionCard.scss';

/**
 * DescriptionCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const DescriptionCard = (props) => {
  const title = (props.title) ? <h3 className={classes.Title}>{props.title}</h3> : null;
  const text = (props.text) ? <p className={classes.Text}>{props.text}</p> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.DescriptionCard}>
      {title}
      {text}
      {tooltip}
    </div>
  );
};

export default DescriptionCard;

DescriptionCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
};
