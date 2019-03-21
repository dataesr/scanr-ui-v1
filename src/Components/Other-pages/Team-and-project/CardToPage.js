import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';

/* SCSS */
import classes from './CardToPage.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardToPage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`card ${classes.CardToPage}`}>
      <FormattedHTMLMessage
        id={`CardToPage.${props.labelKey}`}
        defaultMessage={`CardToPage.${props.labelKey}`}
      />
      <ButtonToPage
        className={classes.MarginTop}
        url={props.url}
      >
        Découvrir
      </ButtonToPage>
    </div>
  </IntlProvider>
);

export default CardToPage;

CardToPage.propTypes = {
  labelKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
