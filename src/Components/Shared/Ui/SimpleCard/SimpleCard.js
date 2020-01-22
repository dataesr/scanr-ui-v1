import React from 'react';
import PropTypes from 'prop-types';

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

  if (!label) { return null; }

  return (
    <div className={classes.SimpleCard}>
      {logo}
      {title}
      {label}
    </div>
  );
};

export default SimpleCard;

SimpleCard.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.any,
};
