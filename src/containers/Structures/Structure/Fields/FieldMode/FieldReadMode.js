import React from 'react';
import PropTypes from 'prop-types';

import Aux from '../../../../../hoc/Aux';
import Button from '../../../../../UI/Button/Button';

const fieldReadMode = (props) => {
  let status = null;
  if (props.status) {
    status = (
      <div className="column is-narrow">
        <span
          className="tag is-light is-medium is-rounded"
          onClick={props.onClick}
        >
          {props.status}
        </span>
      </div>);
  }
  let source = null;
  if (props.source) {
    source = (
      <div className="column is-one-fifth">
        <span
          className="tag is-light is-medium is-rounded"
          onClick={props.onClick}
        >
          {props.source}
        </span>
      </div>);
  }
  let { fieldValue } = props;
  if (!props.fieldValue) {
    fieldValue = <Button><i className="fas fa-plus" /></Button>;
  }
  return (
    <Aux>
      <div className="column is-two-fifth" onClick={props.onClick}>
        {fieldValue}
      </div>
      {status}
      {source}
    </Aux>
  );
};

export default fieldReadMode;

fieldReadMode.propTypes = {
  fieldValue: PropTypes.string,
  onClick: PropTypes.func,
  source: PropTypes.string,
  status: PropTypes.string,
};
