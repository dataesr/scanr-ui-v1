import React from 'react';
import PropTypes from 'prop-types';

import classes from './Field.scss';

const fieldTitle = props => (
  <div className={`column is-${props.columnSize}`}>
    <span className={classes.Title}>{props.children}</span>
  </div>);

export default fieldTitle;

fieldTitle.propTypes = {
  children: PropTypes.string.isRequired,
  columnSize: PropTypes.string,
};
