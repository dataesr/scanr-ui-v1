import React from 'react';
import PropTypes from 'prop-types';

import ProjectsMap from './ProjectsGraphs/ProjectsMap';
import ProjectsTypesDonut from './ProjectsGraphs/ProjectsTypesDonut';


const ProjectsGraphsWrapper = props => (
  <React.Fragment>
    <ProjectsMap language={props.language} request={props.request} />
    <ProjectsTypesDonut language={props.language} request={props.request} />
  </React.Fragment>
);

export default ProjectsGraphsWrapper;

ProjectsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
