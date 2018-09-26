import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';

const FieldReadMode = props => (
  <div className="columns">
    <div className="column">{props.fieldValue}</div>
    <div className="column is-narrow">
      <span className="tag is-light is-medium is-rounded">{props.status}</span>
    </div>
    <div className="column is-narrow">
      <span className="tag is-light is-medium is-rounded">{props.source}</span>
    </div>
    <div className="column is-one-fifth has-text-right">
      <Button onClick={props.editButton}>
        <i className="fas fa-pen" />
      </Button>
    </div>
  </div>
);

export default FieldReadMode;

FieldReadMode.propTypes = {
  editButton: PropTypes.func.isRequired,
  fieldValue: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};
