import React from 'react';
import PropTypes from 'prop-types';


import SimpleAggregationGraph from '../../../Shared/StandaloneGraphs/SimpleAggregationGraph';
import ProjectsMap from '../../../Shared/StandaloneGraphs/ProjectsMap';

const ProjectsGraphsWrapper = props => (
  <React.Fragment>
    <ProjectsMap title="T" subtitle="." language={props.language} request={props.request} />
    <SimpleAggregationGraph
      aggField="type"
      aggSize={10}
      filename="scanr_export_projects_types"
      graphType="HighChartsDonut"
      api="projects"
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
  </React.Fragment>
);

export default ProjectsGraphsWrapper;

ProjectsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
