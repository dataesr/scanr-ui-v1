import React from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

import classes from './ExpertiseField.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * ExpertiseField
 * Url : ex: /entite/200711886U
 * Description : Bloc Domaines d'expertise visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const ExpertiseField = (props) => {
  let styleCss = null;
  if (props.data.length === 0) {
    styleCss = {
      display: 'none',
    };
  }

  return (
    <div className="col-6" style={styleCss}>
      <div className={classes.ExpertiseField}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle
              title={messages[props.language]['Entity.portrait.expertiseField.title']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseField;
ExpertiseField.defaultProps = {
  data: [],
};
ExpertiseField.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
