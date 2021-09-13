import React from 'react';
import PropTypes from 'prop-types';
import Errors from '../Errors/Errors';

export default function PageChecker({
  children, id, type, config,
}) {
  if (config[type].indexOf(id) !== -1) {
    return <Errors error={404} />;
  }
  return children;
}

PageChecker.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  config: PropTypes.shape({ person: PropTypes.array, publication: PropTypes.array }).isRequired,
};
