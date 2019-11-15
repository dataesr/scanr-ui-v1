import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './SimpleCard2.scss';

/**
 * SimpleCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimpleCard2 = (props) => {
  if (!props.label) {
    return null;
  }
  const style = { backgroundColor: props.bgColor || 'white' };
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} aria-hidden="true" /></div> : null;
  const title = (props.title) ? <h1 className={classes.Title}>{props.title}</h1> : null;
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SimpleCard} style={style}>
      {logo}
      {title}
      {label}
      {tooltip}
    </div>
  );
};

export default SimpleCard2;

SimpleCard2.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  bgColor: PropTypes.string,
};
