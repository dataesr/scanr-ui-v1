import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = props => (
  <button
    className={`button is-light is-rounded is-small ${classes.space_5} ${props.className}`}
    id={props.id}
    onClick={props.onClick}
    type="button"
  >
    {props.children}
  </button>
);

export default Button;

Button.propTypes = {
  children: PropTypes.any,
  id: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
