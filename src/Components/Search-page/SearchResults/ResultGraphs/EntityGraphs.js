import React from 'react';
import PropTypes from 'prop-types';

import GraphComponents from '../../../Shared/GraphComponents/GraphComponents';

// import classes from './Graphs.scss';

const EntityGraphs = props => (
  <React.Fragment>
    <div className="w-100 p-3 mb-3">
      <GraphComponents
        language={props.language}
        title="blah"
        subtitle="blah"
        data={props.facets}
        filename="It rocks"
        tags={['blah']}
        type="bar"
      />
    </div>
  </React.Fragment>
);

export default EntityGraphs;

EntityGraphs.propTypes = {
  language: PropTypes.string.isRequired,
  facets: PropTypes.array,
};
