import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToSearch.scss';

const ButtonToSearch = props => (
  <a href={props.href} className={`${classes.ButtonToSearch} ${props.className}`}>
    <p className={classes.Label}>
      {props.children}
      <i className="fas fa-arrow-right" />
    </p>
  </a>
);

export default ButtonToSearch;
ButtonToSearch.defaultProps = {
  href: '/',
};

ButtonToSearch.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};
