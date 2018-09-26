import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../UI/Button/Button';

const MultipleFieldReadOnly = props => (
  <div className="columns">
    <div className="column">{props.field}</div>
    <div className="column is-narrow">
      <span className="tag is-light is-medium is-rounded">{props.status}</span>
    </div>
    <div className="column is-narrow">
      <span className="tag is-light is-medium is-rounded">{props.source}</span>
    </div>
    <div className="column is-one-fifth has-text-right">
      <Button
        onClick={props.addButton}
      >
        <i className="fas fa-plus" />
      </Button>
      <Button
        onClick={props.toggleAllFields}
      >
        {props.showAll ? <i className="fas fa-eye-slash" /> : <i className="fas fa-eye" />}
      </Button>
      <Button
        onClick={props.editButton}
      >
        <i className="fas fa-pen" />
      </Button>
    </div>
  </div>
);

export default MultipleFieldReadOnly;

MultipleFieldReadOnly.propTypes = {
  addButton: PropTypes.func.isRequired,
  editButton: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  toggleAllFields: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
};
