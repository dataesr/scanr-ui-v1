import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../../../UI/Field/Card';

const Resume = props => (
  <div className="columns">
    <div className="column">
      <Card>{props.esrId}</Card>
    </div>
    <div className="column">
      milieu
    </div>
    <div className="column">
      droite
    </div>
  </div>
);

export default Resume;

Resume.propTypes = {
  urlLogo: PropTypes.string,
  esrId: PropTypes.string,
  urlWebsite: PropTypes.string,
  entityType: PropTypes.string,
  supervisionType: PropTypes.string,
};
