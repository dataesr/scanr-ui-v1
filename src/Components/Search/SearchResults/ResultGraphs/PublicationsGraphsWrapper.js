import React from 'react';
import PropTypes from 'prop-types';
import PublicationTypes from './PublicationsGraphs/PublicationsTypes';
import PublicationKeywords from './PublicationsGraphs/PublicationsKeywords';
import PublicationYears from './PublicationsGraphs/PublicationsYears';
import PublicationJournals from './PublicationsGraphs/PublicationsJournals';

const PublicationsGraphsWrapper = props => (
  <React.Fragment>
    <PublicationKeywords
      language={props.language}
      request={props.request}
    />
    <PublicationJournals
      language={props.language}
      request={props.request}
    />
    <PublicationYears
      language={props.language}
      request={props.request}
    />
    <PublicationTypes
      language={props.language}
      request={props.request}
    />
  </React.Fragment>
);

export default PublicationsGraphsWrapper;

PublicationsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
