import React from 'react';
import PropTypes from 'prop-types';

import getColorStatus from '../../Utils/colorStatus';
import Tag from '../Tag/Tag';

import classes from './StatusTagMedium.scss';

const statusTagMedium = (props) => {
  const { status } = props;
  const color = getColorStatus(status);

  return <Tag tagValue={props.status} color={classes[color]} />;
};

export default statusTagMedium;

statusTagMedium.propTypes = {
  status: PropTypes.string.isRequired,
};
