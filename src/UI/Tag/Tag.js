import React from 'react';
import PropTypes from 'prop-types';

import classes from './Tag.scss';

const tag = props => (
  <span className={`${classes.Tags} ${props.color}`}>
    {props.tagValue}
  </span>
);

export default tag;

tag.propTypes = {
  color: PropTypes.string,
  tagValue: PropTypes.string.isRequired,
};
