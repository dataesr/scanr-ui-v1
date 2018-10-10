import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux';
import { STATUS_ARRAY } from '../../config/config';
import StatusTagMedium from '../StatusTagMedium/StatusTagMedium';
import classes from './Field.css';

const statusField = (props) => {
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
  return (
    <Aux>
      <div className="column is-3">
        <span className={classes.Header}>
          Statut
        </span>
      </div>
      <div className="column is-9" onClick={props.onClick}>
        {statusMode}
      </div>
    </Aux>);
};

export default statusField;

statusField.propTypes = {
  editMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
