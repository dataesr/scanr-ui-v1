import React from 'react';
import PropTypes from 'prop-types';

import ButtonWithModal from '../../../../Shared/Ui/Buttons/ButtonWithModal';
import classes from './nbPersonsCard.scss';

import logo from '../../../../Shared/svg/icon-fiche-responsable_h.svg';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * nbPersonsCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const nbPersonsCard = props => (
  <div className={`d-flex flex-column ${classes.nbPersonsCard}`}>
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
    <div className="mt-auto" style={{ marginBottom: '8px' }}>
      <ButtonWithModal
        logo="fas fa-expand"
        title={messages[props.language].allTeamLabel}
        buttonLabel={messages[props.language].showAll}
        dataHtml={props.personsModalList}
      />
    </div>
  </div>
);

export default nbPersonsCard;

nbPersonsCard.propTypes = {
  language: PropTypes.string.isRequired,
  nbPersons: PropTypes.number.isRequired,
  personsModalList: PropTypes.any,
};
