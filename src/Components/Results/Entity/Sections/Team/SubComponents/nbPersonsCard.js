import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import ButtonWithModal from '../../../../../Shared/Ui/Buttons/ButtonWithModal';
import classes from './nbPersonsCard.scss';

import logo from '../../../../../Shared/svg/icon-fiche-responsable_h.svg';

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
        title={<FormattedHTMLMessage id="Entity.Team.NbPersonsCard.allTeamLabel" />}
        buttonLabel={<FormattedHTMLMessage id="Entity.Team.NbPersonsCard.showAll" />}
        dataHtml={props.personsModalList}
      />
    </div>
  </div>
);

export default nbPersonsCard;

nbPersonsCard.propTypes = {
  nbPersons: PropTypes.number.isRequired,
  personsModalList: PropTypes.any,
};
