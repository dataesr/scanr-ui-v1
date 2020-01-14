import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import { GlobalContext } from '../../../GlobalContext';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

const DictionaryData = ({ id }) => {
  const context = useContext(GlobalContext);
  return (
    <IntlProvider locale={context.language} messages={msg[context.language]}>
      <FormattedHTMLMessage id={id || ' '} defaultMessage={id} />
    </IntlProvider>
  );
};


DictionaryData.propTypes = {
  id: PropTypes.string.isRequired,
};


export const getDictionaryDataFromId = (id, language) => msg[language][id] || id;

export default DictionaryData;
