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
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <FormattedHTMLMessage
                id="Newsletter.lib"
                defaultMessage="Newsletter.lib"
              />
            </div>
            <div className="col-lg">
              input
            </div>
            <div className="col-lg">
              https://www.npmjs.com/package/react-google-recaptcha
            </div>
            <div className="col-lg text-right">
              bt
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default Newsletter;

Newsletter.propTypes = {
  language: PropTypes.string.isRequired,
};
