import React from 'react';
import PropTypes from 'prop-types';
import PersonsMap from '../../../Shared/StandaloneGraphs/PersonsMap';

const PersonsGraphsWrapper = props => (
  <React.Fragment>
    <PersonsMap title="T" subtitle="." language={props.language} request={props.request} />
  </React.Fragment>
);

export default PersonsGraphsWrapper;

PersonsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
