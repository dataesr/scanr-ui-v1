import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

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
        <div className="container">
          <div className="row">
            <div className="col-lg">
              <FormattedHTMLMessage
                id="DiscoverDataEsr.lib"
                defaultMessage="DiscoverDataEsr.lib"
              />
            </div>
            <div className="col-lg-2 text-right">
              <ButtonToPage
                className={classes.Button}
                url=""
              >
                <FormattedHTMLMessage
                  id="DiscoverDataEsr.button"
                  defaultMessage="DiscoverDataEsr.button"
                />
              </ButtonToPage>
            </div>
          </div>

        </div>
      </section>
    </IntlProvider>
  );
};

export default DiscoverDataEsr;

DiscoverDataEsr.propTypes = {
  language: PropTypes.string.isRequired,
};
