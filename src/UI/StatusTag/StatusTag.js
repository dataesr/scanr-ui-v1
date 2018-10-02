import React from 'react';
import PropTypes from 'prop-types';

import classes from './StatusTag.scss';

const statusTag = (props) => {
  const { value } = props;
  let color = '';

  switch (value) {
    case 'old':
      color = 'old_bg_color';
      break;
    case 'active':
      color = 'active_bg_color';
      break;
    case 'invalid':
      color = 'invalid_bg_color';
      break;
    default:
      color = 'undefined_bg_color';
  }

  return (
    <div className={classes.StatusTag}>
      <div>
        Statut
      </div>
      <div className={classes[color]}>
        {value}
      </div>
    </div>
  );
};

export default statusTag;

statusTag.propTypes = {
  value: PropTypes.string.isRequired,
};
