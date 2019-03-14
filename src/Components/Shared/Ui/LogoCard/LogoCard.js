import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './LogoCard.scss';

const LogoCard = props => (
  <div className={classes.card}>
    <img
      src={`./img/logo-${props.schema}.svg`}
      alt="Logo scanR"
      className={`img-fluid ${classes.img}`}
    />
  </div>
);

export default LogoCard;

LogoCard.propTypes = {
  schema: PropTypes.string.isRequired,
};
