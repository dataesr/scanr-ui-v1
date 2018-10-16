import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../../../../hoc/Aux';

import Input from '../../../../../../UI/Editable/Input/Input';

import classes from './AddressField.css';

const addressField = props => (
  <Aux>
    <div className="column is-3">
      <span className={classes.Header}>
        {props.label}
      </span>
    </div>
    <div className={`column is-${props.columnSize}`} onClick={props.onClick}>
      <Input
        editMode={props.editMode}
        fieldValue={props.fieldValue}
        id={props.id}
        onChange={props.onChange}
        onClick={props.onClick}
      />
    </div>
  </Aux>);

export default addressField;

addressField.propTypes = {
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

addressField.defaultProps = {
  columnSize: '9',
};
