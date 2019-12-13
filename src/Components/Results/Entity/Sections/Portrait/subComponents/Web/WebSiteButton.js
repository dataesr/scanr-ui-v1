import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import classes from './Web.scss';


/**
 * WebSiteButton
 * Url : ex: /entite/200711886U
 * Description : Bouton allant vers le site web principal de l'entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const WebSiteButton = (props) => {
  let logo = null;
  let UsedClasse = null;
  let label = null;
  let style = null;
  switch (props.type) {
    case 'HAL':
      logo = <img src="./img/hal.logo.png" alt="logo HAL" />;
      UsedClasse = classes.HalLogo;
      style = { backgroundColor: '#003259' };
      break;
    case 'wikipedia':
      logo = <img src="./img/Wikipedia-logo.png" alt="logo wikipedia" />;
      UsedClasse = classes.WikipediaLogo;
      label = <FormattedHTMLMessage id="Entity.Portrait.Web.WebSiteButton.wikipedia" />;
      break;
    case 'Hypothese':
      logo = <img src="./img/hypotheses_baselineEN.png" alt="logo Hypothese" />;
      UsedClasse = classes.HypotheseLogo;
      break;
    default:
      logo = null;
  }


  return (
    <a href={props.url} className={classes.WebSiteButton} target="_blank" rel="noopener noreferrer" style={style}>
      <div className={UsedClasse}>
        {logo}
        <div>{label}</div>
      </div>
    </a>
  );
};

export default WebSiteButton;

WebSiteButton.propTypes = {
  url: PropTypes.string.isRequired,
  type: PropTypes.string,
};
