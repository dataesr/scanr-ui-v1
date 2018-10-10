import React from 'react';
import PropTypes from 'prop-types';

const errorMessage = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <span className="has-text-danger">{props.children}</span>);
};

errorMessage.propTypes = {
  children: PropTypes.string,
  visible: PropTypes.bool,
};

errorMessage.defaultProps = {
  visible: true,
};

export default errorMessage;
