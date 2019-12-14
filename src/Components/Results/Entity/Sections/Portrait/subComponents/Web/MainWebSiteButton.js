import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import classes from './Web.scss';

/**
 * MainWebSiteButton
 * Url : ex: /entite/200711886U
 * Description : Bouton allant vers le site web principal de l'entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const MainWebSiteButton = props => (
  <a href={props.url} className={classes.MainWebSiteButton} target="_blank" rel="noopener noreferrer">
    <div>
      <i className="fas fa-mouse-pointer" />
    </div>
    <div>
      <FormattedHTMLMessage id="Entity.Portrait.Web.MainWebSiteButton.label" />
    </div>
  </a>
);

export default MainWebSiteButton;

MainWebSiteButton.propTypes = {
  url: PropTypes.string.isRequired,
};
