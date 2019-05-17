import React from 'react';
import PropTypes from 'prop-types';

import classes from './Web.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/**
 * MainWebSiteButton
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

const MainWebSiteButton = props => (
  <a href={props.url} className={classes.MainWebSiteButton}>
    <div>
      <i className="fas fa-mouse-pointer" />
    </div>
    <div>
      {messages[props.language]['Entity.portrait.web.mainWebSiteButton.label']}
    </div>
  </a>
);

export default MainWebSiteButton;

MainWebSiteButton.propTypes = {
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
