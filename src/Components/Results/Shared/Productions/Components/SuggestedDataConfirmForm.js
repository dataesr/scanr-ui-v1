import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const message = {
  fr: messagesFr,
  en: messagesEn,
};

const SuggestedDataConfirmForm = (props) => {
  const { language, suggestedDataSuccessID } = props;
  return (
    <IntlProvider locale={language} messages={message[language]}>
      <div className="container d-flex justify-content-center h-50">
        <div className="row align-self-center">
          <p className="text-center"><FormattedHTMLMessage id={suggestedDataSuccessID} /></p>
        </div>
      </div>
    </IntlProvider>
  );
};

export default SuggestedDataConfirmForm;

SuggestedDataConfirmForm.propTypes = {
  language: PropTypes.string.isRequired,
  suggestedDataSuccessID: PropTypes.string.isRequired,
};
