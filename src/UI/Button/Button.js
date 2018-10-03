import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = props => (
  <button
    className={` button is-light  ${classes.space_5}`}
    id={props.id}
    onClick={props.onClick}
    type="button"
  >
    {props.children}
  </button>
);

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
};
