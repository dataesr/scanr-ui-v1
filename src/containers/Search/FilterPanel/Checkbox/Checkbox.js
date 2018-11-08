import React from 'react';
import PropTypes from 'prop-types';

const checkbox = props => (
  <label htmlFor={props.id} className="checkbox">
    <input
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      type="checkbox"
      checked={props.checked}
    />
    &nbsp;
    {props.label}
  </label>
);

export default checkbox;

checkbox.propTypes = {
  checked: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
