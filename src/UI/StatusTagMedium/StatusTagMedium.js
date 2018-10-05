import React from 'react';
import PropTypes from 'prop-types';

import getColorStatus from '../../Utils/colorStatus';

import classes from './StatusTagMedium.scss';

const statusTagMedium = (props) => {
  const { status } = props;
  const color = getColorStatus(status);

  return (
    <span className={`${classes.Tags} ${classes[color]}`}>
      {props.status}
    </span>
  );
};

export default statusTagMedium;

statusTagMedium.propTypes = {
  status: PropTypes.string.isRequired,
};
