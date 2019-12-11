import React from 'react';
import PropTypes from 'prop-types';

import Identity from './SubSections/Identity';
import Status from './SubSections/Status';

/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Informations = props => (
  <React.Fragment>
    <div className="row">
      <Identity
        language={props.language}
        data={props.data}
      />
      <Status
        language={props.language}
        data={props.data}
      />
    </div>
  </React.Fragment>
);

export default Informations;

Informations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
