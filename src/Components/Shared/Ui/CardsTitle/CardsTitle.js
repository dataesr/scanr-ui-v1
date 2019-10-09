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
  <h2 className={classes.CardsTitle}>
    {props.title}
  </h2>
);

export default CardsTitle;

CardsTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
