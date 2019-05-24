import React from 'react';
import PropTypes from 'prop-types';

import classes from './FocusList.scss';

/**
 * FocusList
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const FocusList = props => (
  <div className={classes.FocusList}>
    FocusList
  </div>
);

export default FocusList;

FocusList.propTypes = {
  language: PropTypes.string.isRequired,
};
