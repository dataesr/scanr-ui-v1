import React from 'react';
import PropTypes from 'prop-types';

import SimpleAggregationGraph from '../../../Shared/StandaloneGraphs/SimpleAggregationGraph';
import PublicationKeywords from '../../../Shared/StandaloneGraphs/PublicationsKeywords';
import PublicationTypes from '../../../Shared/StandaloneGraphs/PublicationsTypes';
import PublicationIsOa from '../../../Shared/StandaloneGraphs/PublicationsIsOa';
import YearTimeLine from '../../../Shared/StandaloneGraphs/YearsTimeLine';


const PublicationsGraphsWrapper = props => (
  <React.Fragment>
    <PublicationIsOa
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
    <PublicationKeywords
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
    <SimpleAggregationGraph
      aggField="source.title"
      aggSize={15}
      filename="scanr_export_publications_journals"
      graphType="HighChartsBar"
      api="publications"
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />
    <YearTimeLine
      api="publications"
      filterLow={1990}
      filterHigh={2019}
      title="T"
      subtitle="."
      language={props.language}
      request={props.request}
    />

    <PublicationTypes
      title="T"
      subtitle="."
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
