import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToSearch.scss';

const ButtonToSearch = props => (
  <a href="#">
    <span className={classes.ButtonToSearch}>
      <span className={classes.Label}>
        {props.children}
      </span>
      <span className={classes.Arrow}>
        <i className="fas fa-arrow-right" />
      </span>
    </span>
  </a>
);

export default ButtonToSearch;

ButtonToSearch.propTypes = {
  children: PropTypes.string.isRequired,
};
