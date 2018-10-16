import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
  let component = <span>{props.data}</span>;

  if (props.isEditable && props.editMode) {
    component = (
      <input
        className="input is-rounded"
        type="text"
        value={props.data}
        onChange={props.onChange}
      />
    );
  }

  return component;
};

export default Input;

Input.propTypes = {
  isEditable: PropTypes.boolean,
  editMode: PropTypes.boolean,
  canBeNull: PropTypes.boolean,
  data: PropTypes.string,
  onChange: PropTypes.func,
};
