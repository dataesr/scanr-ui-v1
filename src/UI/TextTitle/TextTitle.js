import React from 'react';
import PropTypes from 'prop-types';

import classes from './TextTitle.scss';


const textTitle = props => (
  <h2 className={classes.TextTitle}>
    <i className="fas fa-caret-right" />
    <a href={props.url} target="blank">
      {props.children}
    </a>
  </h2>
);

export default textTitle;

textTitle.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string,
};
