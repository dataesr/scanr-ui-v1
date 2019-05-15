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
    <div className={`card text-center mb-1 ${classes.CardToPage} ${classes[props.cssClass]}`}>
      <div className={classes.Title}>
        <FormattedHTMLMessage
          id={`CardToPage.title.${props.labelKey}`}
          defaultMessage={`CardToPage.title.${props.labelKey}`}
        />
      </div>
      <div className={classes.Button}>
        <ButtonToPage
          className={`${classes.MarginTop} ${classes.Button}`}
          url={props.url}
          target={props.target}
        >
          <FormattedHTMLMessage
            id={`CardToPage.button.${props.btnText}`}
            defaultMessage={`CardToPage.button.${props.btnText}`}
          />
        </ButtonToPage>
      </div>
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
