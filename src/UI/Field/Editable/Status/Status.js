import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_ARRAY, STATUS_CONFLICT } from '../../../../config/config';
import StatusTagMedium from '../../../StatusTagMedium/StatusTagMedium';
import classes from '../../Field.css';

const Status = (props) => {
  let statusMode = (
    <span className={props.size === 'large' ? classes.Text : ''} onClick={props.onClick}>
      {props.fieldValue
        ? <StatusTagMedium status={props.fieldValue} />
        : '-vide-'}
    </span>);
  if (props.editMode) {
    let inputColor = null;
    if (!props.canBeNull) {
      inputColor = props.fieldValue && props.fieldValue !== 'empty' && props.fieldValue !== STATUS_CONFLICT
        ? 'is-primary'
        : 'is-danger';
    }
    statusMode = (
      <div className={`select is-rounded is-small ${inputColor}`}>
        <select
          id="status"
          value={props.fieldValue || 'empty'}
          onChange={props.onChange}
        >
          <option value="empty">- Empty -</option>
          {STATUS_ARRAY.map(status => (
            <option key={status} value={status} disabled={status === STATUS_CONFLICT}>{status}</option>))}
        </select>
      </div>);
  }

  return statusMode;
};

export default Status;

Status.propTypes = {
  editMode: PropTypes.bool,
  fieldValue: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

Status.defaultProps = {
  fieldValue: 'empty',
  editMode: false,
};
