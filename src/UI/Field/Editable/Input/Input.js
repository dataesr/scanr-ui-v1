import React from 'react';
import PropTypes from 'prop-types';

import classes from '../../Field.scss';

const Input = (props) => {
  let component = (
    <span className={classes.Text} onClick={props.onClick} role="presentation">
      {props.fieldValue || <i className={classes.Na}>NA</i>}
    </span>);
  if (props.editMode) {
    let inputColor = null;
    if (!props.canBeNull) {
      inputColor = props.fieldValue ? 'is-primary' : 'is-danger';
    }
    component = (
      <input
        id={props.id}
        className={`input is-rounded is-small ${inputColor} ${classes.BoxSizing}`}
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
  fieldValue: PropTypes.any,
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
