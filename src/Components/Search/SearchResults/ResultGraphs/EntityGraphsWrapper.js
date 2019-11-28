import React from 'react';
import PropTypes from 'prop-types';

import EntityMap from '../../../Shared/StandaloneGraphs/EntityMap';
// import EntityCitiesBar from './EntitiesGraphs/EntityCitiesBar';
import SimpleAggregationGraph from '../../../Shared/StandaloneGraphs/SimpleAggregationGraph';
import EntityProjects from '../../../Shared/StandaloneGraphs/EntityProjectsDonut';

// Del domains for Now
// import EntityDomains from './EntitiesGraphs/EntityDomains';
// <EntityDomains language={props.language} request={props.request} />

const EntityGraphsWrapper = props => (
  <React.Fragment>
    <EntityMap
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
    <SimpleAggregationGraph
      aggField="nature"
      aggSize={10}
      filename="scanr_export_structures_natures"
      graphType="HighChartsDonut"
      api="structures"
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
    <SimpleAggregationGraph
      aggField="address.urbanUnitLabel"
      aggSize={10}
      filename="scanr_export_structures_top_10_cities"
      graphType="HighChartsBar"
      api="structures"
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
    <EntityProjects
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
  </React.Fragment>
);

export default EntityGraphsWrapper;

EntityGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
