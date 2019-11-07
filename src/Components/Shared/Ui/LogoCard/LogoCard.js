import React from 'react';
import PropTypes from 'prop-types';
import ReactImageFallback from 'react-image-fallback';

import getSelectKey from '../../../../Utils/getSelectKey';
import SubmitBox from '../../SubmitBox/SubmitBox';

/* SCSS */
import classes from './LogoCard.scss';

// import fallbackImage from '../../images/not_found_image.png';
import initialImage from '../../images/Spinner-1s-70px.gif';

/**
 * LogoCard
 * Url : ui
 * Description : Composant affichant un logo soit à partir d'une URL distante, soit à partir du répertoire ./img
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const LogoCard = (props) => {
  const src = (props.src) ? props.src : `./img/logo-${props.label}.svg`;
  let cssClass = '';
  if (props.cssClass) {
    cssClass = classes[`${props.cssClass}`];
  }

  return (
    <div className={`${classes.card} ${cssClass}`}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
      <a href={props.targetUrl} target="_blank" rel="noopener noreferrer">
        <ReactImageFallback
          src={src}
          fallbackImage={props.url}
          initialImage={initialImage}
          alt={props.label}
          className={`img-fluid ${classes.img}`}
        />
      </a>
    </div>
  );
};

export default LogoCard;

LogoCard.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string,
  src: PropTypes.string,
  url: PropTypes.string,
  cssClass: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
  targetUrl: PropTypes.string,
};
