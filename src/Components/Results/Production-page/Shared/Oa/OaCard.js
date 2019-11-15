import React from 'react';
import PropTypes from 'prop-types';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Oa.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * OaCard component
 * Url : .
 * Description : Carte avec logo open access et couleur associé au type d'open access
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const OaCard = (props) => {
  let color = (props.oa) ? 'OaOpenBg' : 'OaClose';
  if (props.oaEvidence && props.oaEvidence.hostType && props.oaEvidence.hostType === 'repository') {
    color = 'OaOpenRepository';
  } else if (props.oaEvidence && props.oaEvidence.hostType && props.oaEvidence.hostType === 'publisher') {
    color = 'OaOpenPublisher';
  }
  return (
    <div className={classes.OaCard}>
      <p className={classes.Label}>
        {
          (props.oa) ? messages[props.language]['Publication.Oa.isOa'] : messages[props.language]['Publication.Oa.isNotOa']
        }
      </p>
      <div className={`${classes.Icon} ${classes[color]}`}>
        {
          (props.oa) ? (
            <i className="fas fa-lock-open" />
          )
            : (
              <i className="fas fa-lock" />
            )
        }
      </div>
    </div>
  );
};

export default OaCard;

OaCard.propTypes = {
  language: PropTypes.string.isRequired,
  oa: PropTypes.bool.isRequired,
  oaEvidence: PropTypes.object,
};
