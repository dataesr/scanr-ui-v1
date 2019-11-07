import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToPage2.scss';

const ButtonToPage = props => (
  <a href={props.url} target={props.target} className={`btn ${classes.ButtonToPage} ${props.className}`}>
    <p className={classes.Text}>
      {props.children}
    </p>
    <i className="fas fa-eye" aria-hidden />
  </a>
);

export default ButtonToPage;

ButtonToPage.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  url: PropTypes.string,
  target: PropTypes.string,
};
