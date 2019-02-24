import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './LastFocus.scss';

const LastFocus = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.LastFocus}>

        <FormattedHTMLMessage
          id="LastFocus.lib"
          defaultMessage="LastFocus.lib"
        />

      </section>
    </IntlProvider>
  );
};

export default LastFocus;

LastFocus.propTypes = {
  language: PropTypes.string.isRequired,
};
