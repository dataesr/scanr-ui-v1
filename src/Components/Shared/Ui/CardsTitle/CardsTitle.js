import React from 'react';
import PropTypes from 'prop-types';

import classes from './CardsTitle.scss';

/**
 * CardsTitle
 * Url : ex: /entite/200711886U
 * Description : Correspond au titre d'une card
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const CardsTitle = props => (
  <div className={classes.CardsTitle}>
    {props.title}
  </div>
);

export default CardsTitle;

CardsTitle.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
