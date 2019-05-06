import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';


/* SCSS */
import classes from './IdentityCard.scss';

const IdentityCard = (props) => {
  const logo = `../img/logo-${props.labelKey}.svg`;
  return (
    <div className={classes.IdentityCard}>
      <div className={classes.Logo}>
        <img
          src={logo}
          alt={props.labelKey}
          className={`img-fluid ${classes.img}`}
        />
      </div>
      <hr className={classes.Demarcation} />
    </div>
  );
};


export default IdentityCard;

IdentityCard.propTypes = {
  labelKey: PropTypes.string,
};
