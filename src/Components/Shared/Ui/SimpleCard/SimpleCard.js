import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './SimpleCard.scss';

/**
 * SimpleCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimpleCard = (props) => {
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} aria-hidden="true" /></div> : null;
  const title = (props.title) ? <h3 className={classes.Title}>{props.title}</h3> : null;
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SimpleCard}>
      {logo}
      {title}
      {label}
      {tooltip}
    </div>
  );
};

export default SimpleCard;

SimpleCard.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
};
