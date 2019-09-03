import React from 'react';
import PropTypes from 'prop-types';

import classes from './GraphTitles.scss';


const GraphTitles = props => (
  <div className="p-4">
    <div className={classes.Title}>
      {props.title}
    </div>
    <div className={`${classes.Subtitle}`}>
      {props.subtitle}
    </div>
    {
  }
  </div>
);

export default GraphTitles;

GraphTitles.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
