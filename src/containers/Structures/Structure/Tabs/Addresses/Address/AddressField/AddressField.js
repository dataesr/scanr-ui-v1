import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './AddressField.css';

const addressField = props => (
  <Fragment>
    <div className="column is-narrow">
      <span className={classes.Header}>
        {props.label}
      </span>
    </div>
    <div className="column" onClick={props.onClick}>
      {props.children}
    </div>
  </Fragment>);

export default addressField;

addressField.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
