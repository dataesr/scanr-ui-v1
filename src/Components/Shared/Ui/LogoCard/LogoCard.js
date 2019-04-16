import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './LogoCard.scss';

const LogoCard = (props) => {
  const src = (props.src) ? props.src : `./img/logo-${props.label}.svg`;
  return (
    <div className={classes.card}>
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
};
