import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from '../../Field.css';

const InputDate = (props) => {
  let fieldValue = <i className={classes.Na}>NA</i>;

  if (props.fieldValue) {
    fieldValue = moment(props.fieldValue).format('LL');
  }

  let component = (
    <span
      className={props.size === 'large' ? classes.Text : ''}
      onClick={props.onClick}>{fieldValue}</span
    >);
  if (props.editMode) {
    let inputColor = null;
    if (!props.canBeNull) {
      inputColor = props.fieldValue ? 'is-primary' : 'is-danger';
    }
    component = (
      <input
        id={props.id}
        className={`input is-rounded ${inputColor} ${classes.BoxSizing}`}
        type="date"
        value={props.fieldValue ? moment(props.fieldValue).format('YYYY-MM-DD') : ''}
        onChange={props.onChange}
      />
    );
  }

  return component;
};

export default InputDate;

InputDate.propTypes = {
  canBeNull: PropTypes.bool,
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

InputDate.defaultProps = {
  editMode: false,
  canBeNull: true,
};
