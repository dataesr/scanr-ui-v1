import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const InputDate = (props) => {
  if (!props.data) {
    return '- vide -';
  }

  let component = <span>{moment(props.data).format('LL')}</span>;

  if (props.isEditable && props.editMode) {
    component = (
      <input
        className="input is-rounded"
        type="text"
        value={moment(props.data).format('LL')}
        onChange={props.onChange}
      />
    );
  }

  return component;
};

export default InputDate;

InputDate.propTypes = {
  isEditable: PropTypes.boolean,
  editMode: PropTypes.boolean,
  canBeNull: PropTypes.boolean,
  data: PropTypes.string,
  onChange: PropTypes.func,
};
