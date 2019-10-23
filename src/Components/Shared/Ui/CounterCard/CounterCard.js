import React from 'react';
import PropTypes from 'prop-types';

import classes from './CounterCard.scss';

/**
 * CounterCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const CounterCard = (props) => {
  const title = (props.title) ? <h3 className={classes.Title}>{props.title}</h3> : null;
  const counter = (props.counter) ? <p className={classes.Counter}>{props.counter}</p> : null;
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;

  return (
    <div className={`${classes.CounterCard} ${classes[props.color]} ${props.className}`}>
      {title}
      {counter}
      {label}
    </div>
  );
};

export default CounterCard;

CounterCard.propTypes = {
  counter: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.object,
};
