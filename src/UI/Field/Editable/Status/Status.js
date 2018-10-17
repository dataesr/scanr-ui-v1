import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_ARRAY } from '../../../../config/config';
import StatusTagMedium from '../../../StatusTagMedium/StatusTagMedium';
import classes from '../../Field.css';

const Status = (props) => {
  let statusMode = (
    <span className={classes.Text}>
      <StatusTagMedium status={props.status} />
    </span>);
  if (props.editMode) {
    statusMode = (
      <div className="select is-rounded">
        <select
          id="status"
          value={props.status}
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
  isEditable: PropTypes.boolean,
  editMode: PropTypes.boolean,
  canBeNull: PropTypes.boolean,
  status: PropTypes.string,
  onChange: PropTypes.func,
};
