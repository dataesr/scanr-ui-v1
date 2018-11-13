import React from 'react';
import PropTypes from 'prop-types';


const singleCheckBox = (props) => {
  const booleanValue = props.fieldValue === true || props.fieldValue === 'true';
  let content = <span className="tag is-info">{booleanValue ? 'oui' : 'non'}</span>;
  if (props.editMode) {
    content = (
      <label htmlFor={props.id} className="checkbox">
        <input
          className="is-rounded is-small"
          id={props.id}
          checked={booleanValue}
          onChange={props.onChange}
          type="checkbox"
          value={!booleanValue}
        />
        &nbsp;
        {booleanValue ? 'oui' : 'non'}
      </label>);
  }

  return content;
};

export default singleCheckBox;

singleCheckBox.propTypes = {
  editMode: PropTypes.bool,
  fieldValue: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

singleCheckBox.defaultProps = {
  editMode: false,
};
