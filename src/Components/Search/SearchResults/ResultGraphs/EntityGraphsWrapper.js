import React from 'react';
import PropTypes from 'prop-types';

import EntityMap from './EntitiesGraphs/EntityMap';
import EntityCitiesBar from './EntitiesGraphs/EntityCitiesBar';
import EntityNatureDonut from './EntitiesGraphs/EntityNatureDonut';
import EntityProjects from './EntitiesGraphs/EntityProjectsDonut';
import EntityDomains from './EntitiesGraphs/EntityDomains';

const EntityGraphsWrapper = props => (
  <React.Fragment>
    <EntityMap language={props.language} request={props.request} />
    <EntityCitiesBar language={props.language} request={props.request} />
    <EntityNatureDonut language={props.language} request={props.request} />
    <EntityProjects language={props.language} request={props.request} />
  </React.Fragment>
);

export default EntityGraphsWrapper;

EntityGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
// <EntityDomains language={props.language} request={props.request} />
// <EntityMap language={props.language} request={props.request} />
// <EntityCitiesBar language={props.language} request={props.request} />
// <EntityNatureDonut language={props.language} request={props.request} />
