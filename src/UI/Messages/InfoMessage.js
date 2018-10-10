import React from 'react';
import PropTypes from 'prop-types';

const infoMessage = props => <span className="has-text-info has-text-centered"><em>{props.children}</em></span>;

infoMessage.propTypes = {
  children: PropTypes.string,
};

export default infoMessage;
