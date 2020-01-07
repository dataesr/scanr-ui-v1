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

const Mapping = (props) => {
  const context = useContext(GlobalContext);

  return (
    <IntlProvider locale={context.language} messages={msg[context.language]}>
      <FormattedHTMLMessage id={props.id} />
    </IntlProvider>
  );
};

export default Mapping;

Mapping.propTypes = {
  id: PropTypes.string.isRequired,
};
