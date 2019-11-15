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
 * OaLink component
 * Url : .
 * Description : Carte avec logo open access et couleur associé au type d'open access
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const OaLink = (props) => {
  const logo = (props.oaEvidence.pdfUrl) ? <i className="fas fa-file-pdf" aria-hidden /> : <i className="fas fa-download" aria-hidden />;
  return (
    <p className={`${classes.OaLink} ${props.className}`}>
      <p className={classes.Title}>
        {
          messages[props.language]['Publication.Oa.OaLink.Title']
        }
      </p>
      <a href={(props.oaEvidence.pdfUrl) ? props.oaEvidence.pdfUrl : props.oaEvidence.url} target="_blank" rel="noopener noreferrer">
        {logo}
      </a>
    </p>
  );
};

export default OaLink;

OaLink.propTypes = {
  language: PropTypes.string.isRequired,
  oaEvidence: PropTypes.object.isRequired,
  className: PropTypes.string,
};
