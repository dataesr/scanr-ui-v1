import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from '../../Field.css';

const InputDate = (props) => {
  let fieldValue = '- vide -';

  if (props.fieldValue) {
    fieldValue = moment(props.fieldValue).format('LL');
  }

  let component = <span className={classes.Text} onClick={props.onClick}>{fieldValue}</span>;
  if (props.editMode) {
    component = (
      <input
        id={props.id}
        className="input is-rounded"
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
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

InputDate.defaultProps = {
  editMode: false,
};
