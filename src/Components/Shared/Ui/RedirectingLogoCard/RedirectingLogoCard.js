import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './RedirectingLogoCard.scss';

/**
 * RedirectingLogoCard
 * Url : ui
 * Description : Composant affichant un logo soit à partir d'une URL distante, soit à partir du répertoire ./img
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const RedirectingLogoCard = (props) => {
  const src = (props.src) ? props.src : `../img/${props.imageName}`;
  const url = `./ressources/${props.labelKey}`;
  let cssClass = '';
  if (props.cssClass) {
    cssClass = classes[`${props.cssClass}`];
  }
  return (
    <a href={url}>
      <div className={`${classes.card} ${cssClass}`}>
        <img
          src={src}
          alt={props.labelKey}
          className={`img-fluid ${classes.img}`}
        />
      </div>
    </a>
  );
};


export default RedirectingLogoCard;

RedirectingLogoCard.propTypes = {
  labelKey: PropTypes.string,
  imageName: PropTypes.string,
  src: PropTypes.string,
  cssClass: PropTypes.string,
};
