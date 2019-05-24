import React from 'react';
import PropTypes from 'prop-types';

import classes from './PersonCard.scss';

import logo from '../../svg/icon-fiche-responsable_h.svg';
import ButtonToPage from '../Buttons/ButtonToPage';

/**
 * Leaders
 * Url : ex: /entite/200711886U
 * Description : Bloc Direction visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const PersonCard = props => (
  <div className={classes.PersonCard}>
    <div className="row">
      <div className="col text-center">
        <span className={classes.Title}>Responsable</span>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        <div className={classes.Logo}>
          <img src={logo} alt="logo" />
        </div>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        <span className={classes.Name}>{props.name}</span>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        <span className={classes.Role}>{props.role}</span>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        <span className={classes.Email}>
          <a href={`"mailto:${props.email}"`}>
            Lui envoyer un email
          </a>
        </span>
      </div>
    </div>
    <div className="row">
      <div className="col text-center">
        <ButtonToPage
          className={`${classes.MarginTop} ${classes.Button} ${classes.Component_dark}`}
          url=""
        >
          Sa fiche scanR
        </ButtonToPage>
      </div>
    </div>
  </div>
);

export default PersonCard;
PersonCard.defaultProps = {
  name: 'Jérémy PEGLION',
  email: 'jeremy.peglion@gmail.com',
  role: 'Directeur',
};
PersonCard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  language: PropTypes.string,
};
