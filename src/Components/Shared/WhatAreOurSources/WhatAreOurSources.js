import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './WhatAreOurSources.scss';

const WhatAreOurSources = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.WhatAreOurSources}>

        <FormattedHTMLMessage
          id="WhatAreOurSources.lib"
          defaultMessage="WhatAreOurSources.lib"
        />

      </section>
    </IntlProvider>
  );
};

export default WhatAreOurSources;

WhatAreOurSources.propTypes = {
  language: PropTypes.string.isRequired,
};
