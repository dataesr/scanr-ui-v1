import React from 'react';
import PropTypes from 'prop-types';

import classes from './TextTitle.scss';


const textTitle = props => (
  <h2 className={classes.TextTitle}>
    <i className="fas fa-caret-right" />
    {props.children}
  </h2>
);

export default textTitle;

textTitle.propTypes = {
  children: PropTypes.string.isRequired,
};
