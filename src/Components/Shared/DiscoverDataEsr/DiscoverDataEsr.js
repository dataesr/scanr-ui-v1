import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './DiscoverDataEsr.scss';

const DiscoverDataEsr = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.DiscoverDataEsr}>

        <FormattedHTMLMessage
          id="DiscoverDataEsr.lib"
          defaultMessage="DiscoverDataEsr.lib"
        />

      </section>
    </IntlProvider>
  );
};

export default DiscoverDataEsr;

DiscoverDataEsr.propTypes = {
  language: PropTypes.string.isRequired,
};
