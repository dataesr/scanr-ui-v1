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
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} /></div> : null;
  const title = (props.title) ? <div className={classes.Title}>{props.title}</div> : null;
  const label = (props.label) ? <div className={classes.Label}>{props.label}</div> : null;

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
  label: PropTypes.string,
  tooltip: PropTypes.string,
};
