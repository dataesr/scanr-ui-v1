import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './BlueBanner.scss';

const BlueBanner = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.BlueBanner}>
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <FormattedHTMLMessage
                // id="BlueBanner.lib"
                // defaultMessage="BlueBanner.lib"
                id={`BlueBanner.title.${props.schema}`}
                defaultMessage={`BlueBanner.title.${props.schema}`}
              />
            </div>
            <div className="col-lg-2 text-right">
              <ButtonToPage
                className={classes.Button}
                url=""
              >
                <FormattedHTMLMessage
                  // id="BlueBanner.button"
                  // defaultMessage="BlueBanner.button"
                  id={`BlueBanner.button.${props.schema}`}
                  defaultMessage={`BlueBanner.button.${props.schema}`}
                />
              </ButtonToPage>
            </div>
          </div>

        </div>
      </section>
    </IntlProvider>
  );
};

export default BlueBanner;

BlueBanner.propTypes = {
  language: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
};
