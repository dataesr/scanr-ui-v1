import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const ContributePage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div>
      contribute page
    </div>
  </IntlProvider>
);


export default ContributePage;

ContributePage.propTypes = {
  language: PropTypes.string.isRequired,
};
