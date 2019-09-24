import React from 'react';
import PropTypes from 'prop-types';

import classes from './Web.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * WebSiteButton
 * Url : ex: /entite/200711886U
 * Description : Bouton allant vers le site web principal de l'entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const WebSiteButton = (props) => {
  let logo = null;
  let UsedClasse = null;
  let label = null;
  switch (props.type) {
    case 'HAL':
      logo = <img src="./img/hal.logo.png" alt="logo HAL" />;
      UsedClasse = classes.HalLogo;
      break;
    case 'wikipedia':
      logo = <img src="./img/Wikipedia-logo.png" alt="logo wikipedia" />;
      UsedClasse = classes.WikipediaLogo;
      label = messages[props.language]['Entity.portrait.web.wikipedia.label'];
      break;
    case 'Hypothese':
      logo = <img src="./img/hypotheses_baselineEN.png" alt="logo Hypothese" />;
      UsedClasse = classes.HypotheseLogo;
      break;
    default:
      logo = null;
  }

  return (
    <a href={props.url} className={classes.WebSiteButton} target="_blank" rel="noopener noreferrer">
      <div className={UsedClasse}>
        {logo}
        <div>{label}</div>
      </div>
    </a>
  );
};

export default WebSiteButton;

WebSiteButton.propTypes = {
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  type: PropTypes.string,
};
