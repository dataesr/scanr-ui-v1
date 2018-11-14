import React from 'react';
import PropTypes from 'prop-types';

import { STRUCTURE_STATUS_ACTIVE, STATUS_OLD } from '../../config/config';

import classes from './StatusToggle.scss';

const statusToggle = props => (
  <label className={classes.switch} htmlFor="status">
    <input
      id="status"
      defaultChecked={props.status === STATUS_OLD}
      type="checkbox"
      onChange={() => props.toggleStatus(
        props.status === STRUCTURE_STATUS_ACTIVE ? STATUS_OLD : STRUCTURE_STATUS_ACTIVE,
      )}
    />
    <span className={classes.slider}>
      <span>{props.status}</span>
    </span>
  </label>
);

export default statusToggle;

statusToggle.propTypes = {
  status: PropTypes.string.isRequired,
  toggleStatus: PropTypes.func.isRequired,
};
