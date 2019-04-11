import React from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';

import NameCard from '../../../../Shared/Ui/SimpleCard/SimpleCard'

import classes from './Identity.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * Identity
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Identity = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  // nom
  let name = 'no name';
  if (props.name[props.language]) {
    name = props.name[props.language];
  } else if (props.name.fr) {
    name = props.name.fr;
  } else {
    name = 'no name';
  }

  // acronym
  let acronym = '';
  if (props.acronym[props.language]) {
    acronym = ` (${props.acronym[props.language]})`;
  } else if (props.acronym.fr) {
    acronym = ` (${props.acronym.fr})`;
  } else {
    acronym = '';
  }

  // Logo

  // Type

  // ids

  return (
    <div className={classes.Identity}>
      <CardsTitle title={messages[props.language]['Entity.portrait.identity.title']} />

      <div className="row">
        <div className="col-6">
          <NameCard
            logo="fas fa-id-card"
            title={messages[props.language]['Entity.portrait.identity.name']}
            label={`${name}${acronym}`}
            tooltip=""
          />
        </div>
      </div>
    </div>
  );
};

export default Identity;

Identity.propTypes = {
  language: PropTypes.string.isRequired,
  acronym: PropTypes.array,
  externalIds: PropTypes.array,
  id: PropTypes.string,
  name: PropTypes.object,
  nature: PropTypes.string,
};
