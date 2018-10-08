import React from 'react';
import PropTypes from 'prop-types';

import getColorStatus from '../../Utils/colorStatus';


import classes from './StatusTag.scss';

const statusTag = (props) => {
  const { status } = props;
  const color = getColorStatus(status);

  return (
    <div className={classes.StatusTag}>
      <div>
        Statut
      </div>
      <div className={classes[color]}>
        {status}
      </div>
    </div>
  );
};

export default statusTag;

statusTag.propTypes = {
  status: PropTypes.string.isRequired,
};
