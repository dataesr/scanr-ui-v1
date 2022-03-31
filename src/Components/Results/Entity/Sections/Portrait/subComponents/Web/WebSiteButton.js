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
      logo = <img src="./img/logos/logo-hal.png" alt="logo HAL" />;
      UsedClasse = classes.HalLogo;
      style = { backgroundColor: '#003259' };
      break;
    case 'wikipedia':
      logo = <img src="./img/logos/logo-wikipedia.png" alt="logo wikipedia" />;
      UsedClasse = classes.WikipediaLogo;
      label = <FormattedHTMLMessage id="Entity.Portrait.Web.WebSiteButton.wikipedia" />;
      break;
    case 'Hypothese':
      logo = <img src="./img/logos/logo-hypotheses.png" alt="logo Hypothese" />;
      UsedClasse = classes.HypotheseLogo;
      break;
    case 'Hceres':
      logo = <img src="./img/logos/logo-hceres.png" alt="logo HCERES" />;
      UsedClasse = classes.HceresLogo;
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
