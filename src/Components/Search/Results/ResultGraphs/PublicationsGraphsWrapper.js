import React from 'react';
import PropTypes from 'prop-types';

import SimpleAggregationGraph from '../../../Shared/StandaloneGraphs/SimpleAggregationGraph';
import PublicationKeywords from '../../../Shared/StandaloneGraphs/PublicationsKeywords';
import PublicationTypes from '../../../Shared/StandaloneGraphs/PublicationsTypes';
import PublicationIsOa from '../../../Shared/StandaloneGraphs/PublicationsIsOa';
import YearTimeLine from '../../../Shared/StandaloneGraphs/YearsTimeLine';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const PublicationsGraphsWrapper = props => (
  <React.Fragment>
    <PublicationIsOa
      title={messages[props.language].PublicationsIsOaTitle}
      subtitle={messages[props.language].PublicationsIsOaSubtitle}
      language={props.language}
      lexicon="PublicationOASearch"
      request={props.request}
    />
    <PublicationKeywords
      title={messages[props.language].PublicationsKeywordsTitle}
      subtitle={messages[props.language].PublicationsKeywordsSubtitle}
      language={props.language}
      lexicon="PublicationKeywordSearch"
      request={props.request}
    />
    {
      (props.request && props.request.filters && props.request.filters.productionType && props.request.filters.productionType.values && props.request.filters.productionType.values[0] === 'publication') ? (
        <SimpleAggregationGraph
          aggField="source.title"
          aggSize={15}
          filename="scanr_export_publications_journals"
          graphType="HighChartsBar"
          api="publications"
          lexicon="PublicationJournalSearch"
          title={messages[props.language].PublicationsJournalTitle}
          subtitle={messages[props.language].PublicationsJournalSubtitle}
          language={props.language}
          request={props.request}
        />
      ) : null
    }
    <YearTimeLine
      api="publications"
      filterLow={1990}
      filterHigh={2019}
      title={messages[props.language].PublicationsYearsTitle}
      lexicon="PublicationYearSearch"
      subtitle={messages[props.language].PublicationsYearsSubtitle}
      language={props.language}
      request={props.request}
    />

    {
      (props.request && props.request.filters && props.request.filters.productionType && props.request.filters.productionType.values && props.request.filters.productionType.values[0] === 'publication') ? (
        <PublicationTypes
          title={messages[props.language].PublicationsTypesTitle}
          subtitle={messages[props.language].PublicationsTypesSubtitle}
          language={props.language}
          lexicon="PublicationTypeSearch"
          request={props.request}
        />
      ) : null
    }
  </React.Fragment>
);

export default PublicationsGraphsWrapper;

PublicationsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
