import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Newsletter.scss';

const Newsletter = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.Newsletter}>

        <FormattedHTMLMessage
          id="Newsletter.lib"
          defaultMessage="Newsletter.lib"
        />

      </section>
    </IntlProvider>
  );
};

export default Newsletter;

Newsletter.propTypes = {
  language: PropTypes.string.isRequired,
};
