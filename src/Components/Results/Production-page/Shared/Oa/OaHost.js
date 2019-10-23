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
 * OaHost component
 * Url : .
 * Description : Carte avec type d'hote pour open access
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

// eslint-disable-next-line
const OaHost = (props) => {
  const hostType = (props.oaEvidence && props.oaEvidence.hostType) ? props.oaEvidence.hostType : null;

  if (!hostType) {
    return null;
  }

  return (
    <p className={classes.OaHost}>
      <p className={classes.Title}>
        {
          messages[props.language]['Publication.Oa.OaHost.Title']
        }
      </p>
      <p className={classes.Label}>
        {
          messages[props.language][`Publication.Oa.OaHost.${hostType}`]
        }
      </p>
    </p>
  );
};

export default OaHost;

OaHost.propTypes = {
  language: PropTypes.string.isRequired,
  oaEvidence: PropTypes.object.isRequired,
};
