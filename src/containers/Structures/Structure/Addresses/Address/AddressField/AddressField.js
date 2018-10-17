import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../../../../hoc/Aux';


import classes from './AddressField.css';

const addressField = props => (
  <Aux>
    <div className="column is-3">
      <span className={classes.Header}>
        {props.label}
      </span>
    </div>
    <div className={`column is-${props.columnSize}`} onClick={props.onClick}>
      {props.children}
    </div>
  </Aux>);

export default addressField;

addressField.propTypes = {
  columnSize: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

addressField.defaultProps = {
  columnSize: '9',
};
