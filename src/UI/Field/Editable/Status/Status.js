import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_ARRAY } from '../../../../config/config';
import StatusTagMedium from '../../../StatusTagMedium/StatusTagMedium';
import classes from '../../Field.css';

const Status = (props) => {
  let statusMode = (
    <span className={classes.Text} onClick={props.onClick}>
      <StatusTagMedium status={props.fieldValue} />
    </span>);
  if (props.editMode) {
    statusMode = (
      <div className="select is-rounded">
        <select
          id="status"
          value={props.fieldValue}
          onChange={props.onChange}
        >
          <option value="empty">- Empty -</option>
          {STATUS_ARRAY.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>);
  }

  return statusMode;
};

export default Status;

Status.propTypes = {
  editMode: PropTypes.boolean,
  canBeNull: PropTypes.boolean,
  fieldValue: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};
