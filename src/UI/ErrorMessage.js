import React from 'react';
import PropTypes from 'prop-types';

const errorMessage = props => <span className="has-text-danger">{props.children}</span>;

errorMessage.propTypes = {
  children: PropTypes.string,
};

export default errorMessage;
