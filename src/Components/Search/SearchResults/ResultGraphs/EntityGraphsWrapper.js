import React from 'react';
import PropTypes from 'prop-types';

import EntityMap from '../../../Shared/StandaloneGraphs/EntityMap';
import SimpleAggregationGraph from '../../../Shared/StandaloneGraphs/SimpleAggregationGraph';
import EntityProjects from '../../../Shared/StandaloneGraphs/EntityProjectsDonut';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const EntityGraphsWrapper = props => (
  <React.Fragment>
    <EntityMap
      title={messages[props.language].EntityMapTitle}
      subtitle={messages[props.language].EntityMapSubtitle}
      language={props.language}
      lexicon="EntityMapSearch"
      request={props.request}
    />
    <SimpleAggregationGraph
      aggField="nature"
      aggSize={10}
      filename="scanr_export_structures_natures"
      graphType="HighChartsDonut"
      api="structures"
      title={messages[props.language].EntityNatureTitle}
      subtitle={messages[props.language].EntityNatureSubtitle}
      language={props.language}
      lexicon="EntityTypeSearch"
      request={props.request}
    />
    <SimpleAggregationGraph
      aggField="address.urbanUnitLabel"
      aggSize={10}
      filename="scanr_export_structures_top_10_cities"
      graphType="HighChartsBar"
      api="structures"
      title={messages[props.language].EntityUrbanUnitTitle}
      subtitle={messages[props.language].EntityUrbanUnitSubtitle}
      language={props.language}
      lexicon="EntityCitySearch"
      request={props.request}
    />
    <EntityProjects
      title={messages[props.language].EntityProjectTypesTitle}
      subtitle={messages[props.language].EntityProjectTypesSubitle}
      language={props.language}
      lexicon="EntityFundingSearch"
      request={props.request}
    />
  </React.Fragment>
);

export default EntityGraphsWrapper;

EntityGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
