import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './SummaryCard.scss';

/**
 * SummaryCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SummaryCard = (props) => {
  const title = (props.title) ? <div className={classes.Title}>{props.title}</div> : null;
  const text = (props.text) ? <div className={classes.Text}>{props.text}</div> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SummaryCard}>
      {title}
      {text}
      {tooltip}
    </div>
  );
};

export default SummaryCard;

SummaryCard.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
};
