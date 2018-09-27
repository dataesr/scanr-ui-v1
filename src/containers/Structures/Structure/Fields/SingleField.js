import React from 'react';
import PropTypes from 'prop-types';

import FieldModeDispatcher from './FieldModeDispatcher/FieldModeDispatcher';

const singleField = props => (
  <div className="columns">
    <div className="column is-narrow is-one-fifth has-text-right">
      <span className="has-text-weight-semibold">{`${props.label} :`}</span>
    </div>
    <div className="column">
      <FieldModeDispatcher
        edit={props.edit}
        fieldValue={props.fieldValue}
        fullEdition={false}
        readOnly={props.readOnly}
        source={props.source}
        status={props.status}
      />
    </div>
  </div>
);

singleField.propTypes = {
  edit: PropTypes.func,
  fieldValue: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  readOnly: PropTypes.bool.isRequired,
  source: PropTypes.string,
  status: PropTypes.string,
};

export default singleField;
