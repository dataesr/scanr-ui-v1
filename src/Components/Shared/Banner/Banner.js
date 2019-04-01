import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './Banner.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Banner = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={`${classes.Banner} ${props.bannerColor}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg">
            <FormattedHTMLMessage
              // id="Banner.lib"
              // defaultMessage="Banner.lib"
              id={`Banner.title.${props.label}`}
              defaultMessage={`Banner.title.${props.label}`}
            />
          </div>
          <div className="col-lg-2 text-right">
            <ButtonToPage
              className={classes.Button}
              url=""
            >
              <FormattedHTMLMessage
                // id="Banner.button"
                // defaultMessage="Banner.button"
                id={`Banner.button.${props.label}`}
                defaultMessage={`Banner.button.${props.label}`}
              />
            </ButtonToPage>
          </div>
        </div>

      </div>
    </section>
  </IntlProvider>
);

export default Banner;

Banner.propTypes = {
  bannerColor: PropTypes.string,
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
