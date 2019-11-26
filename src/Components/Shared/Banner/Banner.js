import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage2';

/* SCSS */
import classes from './Banner.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Banner = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={`${classes.Banner} ${classes[props.cssClass]}`}>
      <div className="container">
        <div className="row d-flex flex-row justify-content-between align-items-center pt-4 pb-4">
          <p className="m-0">
            <FormattedHTMLMessage
              id={`Banner.title.${props.labelKey}`}
              defaultMessage={`Banner.title.${props.labelKey}`}
            />
          </p>
          <ButtonToPage
            url={props.url}
            target={props.target}
            className={classes.Button}
          >
            <FormattedHTMLMessage
              id={`Banner.button.${props.labelKey}`}
              defaultMessage={`Banner.button.${props.labelKey}`}
            />
          </ButtonToPage>
        </div>
      </div>
    </section>
  </IntlProvider>
);


export default Banner;

Banner.propTypes = {
  cssClass: PropTypes.string,
  language: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
};
