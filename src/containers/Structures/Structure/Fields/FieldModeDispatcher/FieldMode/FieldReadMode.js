import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../../../../UI/Button/Button';

const fieldReadMode = (props) => {
  let editButton = null;
  if (!props.readOnly) {
    editButton = (
      <div className="column is-narrow has-text-right">
        <Button onClick={props.editButton}>
          <i className="fas fa-pen" />
        </Button>
      </div>);
  }
  return (
    <div className="columns">
      <div className="column is-two-fifth">{props.fieldValue}</div>
      <div className="column is-narrow">
        <span className="tag is-light is-medium is-rounded">{props.status}</span>
      </div>
      <div className="column is-one-fifth">
        <span className="tag is-light is-medium is-rounded">{props.source}</span>
      </div>
      {editButton}
    </div>
  );
};

export default fieldReadMode;

fieldReadMode.propTypes = {
  editButton: PropTypes.func.isRequired,
  fieldValue: PropTypes.string,
  readOnly: PropTypes.bool.isRequired,
  source: PropTypes.string,
  status: PropTypes.string,
};
