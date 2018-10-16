import React from 'react';
import PropTypes from 'prop-types';

import classes from './Field.css';

const btAdd = props => (
  <div className={classes.bt_add}>
    <button
      className="button is-primary is-outlined is-small is-rounded"
      type="button"
      onClick={props.onClick}
    >
      <i className="fa fa-plus" />
      &nbsp;
      {props.children}
    </button>
  </div>
);
export default btAdd;

btAdd.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
