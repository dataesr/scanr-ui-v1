import React from 'react';
import PropTypes from 'prop-types';

import classes from '../../Field.scss';

const TextArea = (props) => {
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
      <textarea
        id={props.id}
        className={`textarea is-small ${inputColor} ${classes.BoxSizing}`}
        onChange={props.onChange}
        value={props.fieldValue || ''}
        type="text"
      >
        {props.fieldValue || ''}
      </textarea>
    );
  }
  return component;
};

export default TextArea;

TextArea.propTypes = {
  canBeNull: PropTypes.bool,
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

TextArea.defaultProps = {
  fieldValue: '',
  editMode: false,
  canBeNull: true,
};
