import React from 'react';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../../Utils/getSelectKey';
import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

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
  const logo = (props.oaEvidence.pdfurl) ? <i className="fas fa-file-pdf" aria-hidden /> : <i className="fas fa-download" aria-hidden />;
  return (
    <p className={classes.OaLink}>
      <p className={classes.Title}>
        {
          messages[props.language]['Publication.Oa.OaLink.Title']
        }
      </p>
      <a href={(props.oaEvidence.pdfurl) ? props.oaEvidence.pdfurl : props.oaEvidence.url}>
        {logo}
      </a>
    </p>
  );
};

export default OaLink;

OaLink.propTypes = {
  language: PropTypes.string.isRequired,
  oaEvidence: PropTypes.object.isRequired,
};
