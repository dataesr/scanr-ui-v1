import React from 'react';
import PropTypes from 'prop-types';

const structureStatus = (props) => {
  let content = <i className="fas fa-times-circle has-text-danger" />;
  if (props.status === 'active') {
    content = <i className="fas fa-check-circle has-text-info" />;
  }
  return (
    <div>
      {content}
    </div>
  );
};

export default structureStatus;

structureStatus.propTypes = {
  status: PropTypes.string.isRequired,
};
