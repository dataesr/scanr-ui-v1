import React from 'react';
import PropTypes from 'prop-types';
import PersonsMap from '../../../Shared/StandaloneGraphs/PersonsMap';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const PersonsGraphsWrapper = props => (
  <React.Fragment>
    <PersonsMap
      title={messages[props.language].PersonsMapTitle}
      subtitle={messages[props.language].PersonsMapSubtitle}
      language={props.language}
      lexicon="PersonMapSearch"
      request={props.request}
    />
  </React.Fragment>
);

export default PersonsGraphsWrapper;

PersonsGraphsWrapper.propTypes = {
  request: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
