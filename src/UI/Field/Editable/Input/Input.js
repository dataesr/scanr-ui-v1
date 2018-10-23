import React from 'react';
import PropTypes from 'prop-types';

import classes from '../../Field.css';

const Input = (props) => {
  let component = (
    <span className={props.size === 'large' ? classes.Text : ''} onClick={props.onClick}>
      {props.fieldValue || 'NA'}
    </span>);
  if (props.editMode) {
    let inputColor = null;
    if (!props.canBeNull) {
      inputColor = props.fieldValue ? 'is-primary' : 'is-danger';
    }
    component = (
      <input
        id={props.id}
        className={`input is-rounded ${inputColor}`}
        onChange={props.onChange}
        value={props.fieldValue || ''}
        type="text"
      />);
  }
  return component;
};

export default Input;

Input.propTypes = {
  canBeNull: PropTypes.bool,
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

Input.defaultProps = {
  fieldValue: '',
  editMode: false,
  canBeNull: true,
};
