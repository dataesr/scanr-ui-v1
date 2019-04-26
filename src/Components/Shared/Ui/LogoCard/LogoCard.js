import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './LogoCard.scss';

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
      <img
        src={src}
        alt={props.label}
        className={`img-fluid ${classes.img}`}
      />
    </div>
  );
};


export default LogoCard;

LogoCard.propTypes = {
  label: PropTypes.string,
  src: PropTypes.string,
  cssClass: PropTypes.string,
};
