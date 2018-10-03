import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';
import Aux from '../../../../../hoc/Aux';
import { STATUS_ARRAY } from '../../../../../config/config';


const FieldEditMode = (props) => {
  let deleteButton = null;
  if (props.allowDelete && props.fieldValue) {
    deleteButton = (
      <Button id="save" onClick={props.deleteButton}>
        <i className="fas fa-trash" />
      </Button>);
  }
  let fullEdition = null;
  if (props.fullEdition) {
    fullEdition = (
      <div className="column is-narrow">
        <div className="select is-rounded">
          <select
            id="status"
            value={props.status}
            onChange={props.onChange}
          >
            <option value="empty">- Empty -</option>
            {STATUS_ARRAY.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </div>
      </div>);
  }
  return (
    <Aux>
      <div className="column is-two-fifth" onBlur={(props.onBlur)}>
        <input
          autoFocus
          id="fieldValue"
          className="input is-rounded"
          onChange={props.onChange}
          value={props.fieldValue || ''}
          type="text"
        />
      </div>
      {fullEdition}
      <div className="column is-one-fifth has-text-right">
        {deleteButton}
      </div>
    </Aux>
  );
};

export default FieldEditMode;


FieldEditMode.propTypes = {
  allowDelete: PropTypes.bool.isRequired,
  deleteButton: PropTypes.func,
  fieldValue: PropTypes.string,
  fullEdition: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string,
};

FieldEditMode.defaultProps = {
  status: 'empty',
};
