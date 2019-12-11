import React from 'react';
import PropTypes from 'prop-types';

import SimpleAggregationGraph from '../../../Shared/StandaloneGraphs/SimpleAggregationGraph';
import ProjectsMap from '../../../Shared/StandaloneGraphs/ProjectsMap';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
const ProjectsGraphsWrapper = props => (
  <React.Fragment>
    <ProjectsMap
      title={messages[props.language].ProjectsMapTitle}
      subtitle={messages[props.language].ProjectsMapSubtitle}
      language={props.language}
      lexicon="ProjectMapSearch"
      request={props.request}
    />
    <SimpleAggregationGraph
      aggField="type"
      aggSize={10}
      filename={messages[props.language].ProjectsTypesTitle}
      graphType="HighChartsDonut"
      api="projects"
      title={messages[props.language].ProjectsTypesTitle}
      subtitle={messages[props.language].ProjectsTypesSubtitle}
      language={props.language}
      lexicon="ProjectTypeSearch"
      request={props.request}
    />
  </React.Fragment>
);

export default ProjectsGraphsWrapper;

ProjectsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
