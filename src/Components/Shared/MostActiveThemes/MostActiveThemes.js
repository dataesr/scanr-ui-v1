import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './MostActiveThemes.scss';

const MostActiveThemes = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.MostActiveThemes}>

        <FormattedHTMLMessage
          id="MostActiveThemes.lib"
          defaultMessage="MostActiveThemes.lib"
        />

      </section>
    </IntlProvider>
  );
};

export default MostActiveThemes;

MostActiveThemes.propTypes = {
  language: PropTypes.string.isRequired,
};
