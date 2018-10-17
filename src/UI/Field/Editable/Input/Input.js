import React from 'react';
import PropTypes from 'prop-types';

import classes from '../../Field.css';

const Input = (props) => {
  let component = (
    <span className={classes.Text} onClick={props.onClick}>
      {props.fieldValue || '.'}
    </span>);
  if (props.editMode) {
    component = (
      <input
        id={props.id}
        className="input is-rounded"
        onChange={props.onChange}
        value={props.fieldValue}
        type="text"
      />);
  }
  return component;
};

export default Input;

Input.propTypes = {
  canBeNull: PropTypes.boolean,
  editMode: PropTypes.boolean,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
