import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './ComponentToPage.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const ComponentToPage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <section className={classes.ComponentToPage}>
      <div className="container">
        <div className="row">
          <div className="col-lg-10">
            <FormattedHTMLMessage
              id={`ComponentToPage.${props.labelKey}`}
              defaultMessage={`ComponentToPage.${props.labelKey}`}
            />
          </div>
          <div className="col-lg-2 text-right">
            <ButtonToPage
              className={classes.MarginTop}
              url={props.url}
            >
              Découvrir
            </ButtonToPage>
          </div>
        </div>
      </div>
    </section>
  </IntlProvider>
);

export default ComponentToPage;

ComponentToPage.propTypes = {
  labelKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
