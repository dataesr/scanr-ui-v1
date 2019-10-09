import React from 'react';
import PropTypes from 'prop-types';

import classes from './nbPersonsCard.scss';

import logo from '../../../../Shared/svg/icon-fiche-responsable_h.svg';

/**
 * nbPersonsCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const nbPersonsCard = props => (
  <div className={classes.nbPersonsCard}>
    <div className={classes.Logo}>
      <img src={logo} alt="logo" />
      <img src={logo} alt="logo" />
      <img src={logo} alt="logo" />
    </div>
    <div className={classes.Nb}>
      {props.nbPersons}
    </div>
    <div className={classes.Label}>
      personnes identifiées
    </div>
  </div>
);

export default nbPersonsCard;

nbPersonsCard.propTypes = {
  // language: PropTypes.string.isRequired,
  nbPersons: PropTypes.number.isRequired,
};
