import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './LogoCard.scss';

const LogoCard = props => (
  <div className={classes.card}>
    <img
      src={`./img/logo-${props.label}.svg`}
      alt={props.label}
      className={`img-fluid ${classes.img}`}
    />
  </div>
);

export default LogoCard;

LogoCard.propTypes = {
  label: PropTypes.string.isRequired,
};
