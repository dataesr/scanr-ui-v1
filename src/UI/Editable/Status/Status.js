import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_ARRAY } from '../../../config/config';
import StatusTagMedium from '../../StatusTagMedium/StatusTagMedium';

const Status = (props) => {
  let component = (
    <span>
      <StatusTagMedium status={props.data} />
    </span>
  );

  if (props.isEditable && props.editMode) {
    component = (
      <div className="select is-rounded">
        <select
          id="status"
          value={props.data}
          onChange={props.onChange}
        >
          <option value="empty">- Empty -</option>
          {STATUS_ARRAY.map(status => <option key={status} value={status}>{status}</option>)}
        </select>
      </div>);
  }

  return component;
};

export default Status;

Status.propTypes = {
  isEditable: PropTypes.boolean,
  editMode: PropTypes.boolean,
  canBeNull: PropTypes.boolean,
  data: PropTypes.string,
  onChange: PropTypes.func,
};
