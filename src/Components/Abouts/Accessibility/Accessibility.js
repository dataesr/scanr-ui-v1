import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Accessibility.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Accessibility = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Accessibility}`}>
      <HeaderTitle
        language={props.language}
        label="accessibility"
      />
    </div>
  </IntlProvider>
);

export default Accessibility;

Accessibility.propTypes = {
  language: PropTypes.string.isRequired,
};
