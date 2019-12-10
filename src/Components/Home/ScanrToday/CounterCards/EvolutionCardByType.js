import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './EvolutionCardByType.scss';

const EvolutionCardByType = (props) => {
  const bgColor = classes[`${props.schema}Cards`];

  return (
    <div className={`${classes.EvolutionCardByType} ${bgColor}`}>
      <div className={classes.Value}>
        {props.value}
      </div>
    </div>
  );
};

export default EvolutionCardByType;

EvolutionCardByType.propTypes = {
  schema: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
