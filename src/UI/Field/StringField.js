import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../hoc/Aux';
import classes from './Field.css';

const stringField = (props) => {
  let fieldMode = (
    <span className={classes.Text}>
      {props.fieldValue || '.'}
    </span>);
  if (props.editMode) {
    fieldMode = (
      <input
        id={props.id}
        className="input is-rounded"
        onChange={props.onChange}
        value={props.fieldValue}
        type="text"
      />);
  }
  return (
    <Aux>
      <div className="column is-3">
        <span className={classes.Header}>
          {props.label}
        </span>
      </div>
      <div className={`column is-${props.columnSize}`} onClick={props.onClick}>
        {fieldMode}
      </div>
    </Aux>);
};

export default stringField;

stringField.propTypes = {
  columnSize: PropTypes.string,
  editMode: PropTypes.bool.isRequired,
  fieldValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

stringField.defaultProps = {
  columnSize: '9',
};
