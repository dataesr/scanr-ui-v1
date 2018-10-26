import React from 'react';
import PropTypes from 'prop-types';
import { STRUCTURES_CONFLICTS_TO_CHECK } from '../../config/config';
import getBoolConflicts from '../../Utils/getBoolConflicts';

import classes from './StuctureConflicts.scss';

const getConflicts = (structure) => {
  for (let i = 0; i < STRUCTURES_CONFLICTS_TO_CHECK.length; i += 1) {
    if (!structure[STRUCTURES_CONFLICTS_TO_CHECK[i]]) {
      continue;
    }
    if (getBoolConflicts(structure[STRUCTURES_CONFLICTS_TO_CHECK[i]])) {
      return true;
    }
  }
  return false;
};

const StuctureConflicts = (props) => {
  const hasConflict = getConflicts(props.structure);
  return (
    <div className={classes.Conflict}>
      {
        hasConflict ? '!' : ''
      }
    </div>
  );
};

export default StuctureConflicts;

StuctureConflicts.propTypes = {
  structure: PropTypes.object.isRequired,
};
