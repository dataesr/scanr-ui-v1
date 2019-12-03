
import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './CardToPage.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardToPage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`d-flex flex-column align-items-center justify-content-end py-3 px-4 ${classes.CardToPage} ${classes[props.cssClass]}`}>
      <div className={`my-auto ${classes.Title}`}>
        <FormattedHTMLMessage
          id={props.labelKey}
          defaultMessage={props.labelKey}
        />
      </div>
      <ButtonToPage
        className={classes.btn_scanrBlue}
        url={props.url}
        target={props.target}
      >
        <FormattedHTMLMessage
          id={props.btnText}
          defaultMessage={props.btnText}
        />
      </ButtonToPage>
    </div>
  </IntlProvider>
);


export default CardToPage;

CardToPage.propTypes = {
  cssClass: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  target: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
};
