import React from 'react';
import PropTypes from 'prop-types';

import { STATUS_ACTIVE, STATUS_OLD } from '../../config/config';

import classes from './StatusToggle.scss';

const statusToggle = props => (
  <label className={classes.switch}>
    <input
      defaultChecked={props.status === STATUS_OLD}
      type="checkbox"
      onChange={() => props.toggleStatus(props.status === STATUS_ACTIVE ? STATUS_OLD : STATUS_ACTIVE)}
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
