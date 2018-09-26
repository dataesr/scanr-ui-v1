import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = props => (
  <button
    type="button"
    onClick={props.onClick}
    className={` button is-light  ${classes.space_5}`}
  >
    {props.children}
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any,
};
