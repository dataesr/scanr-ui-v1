import React from 'react';
import PropTypes from 'prop-types';
import PersonsMap from './PersonsGraphs/PersonsMap';


const PersonsGraphsWrapper = props => (
  <React.Fragment>
    <PersonsMap language={props.language} request={props.request} />
  </React.Fragment>
);

export default PersonsGraphsWrapper;

PersonsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
