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

const CardToPage = (props) => {
  const style = { backgroundColor: props.bgColor };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`card m-r-0 ${classes.CardToPage}`} style={style}>
        <div className={classes.Title}>
          <FormattedHTMLMessage
            id={`CardToPage.${props.labelKey}`}
            defaultMessage={`CardToPage.${props.labelKey}`}
          />
        </div>

        <div className={classes.Button}>
          <ButtonToPage
            className={classes.MarginTop}
            url={props.url}
          >
            Découvrir
          </ButtonToPage>
        </div>
      </div>
    </IntlProvider>
  );
};


export default CardToPage;

CardToPage.propTypes = {
  bgColor: PropTypes.string.isRequired,
  labelKey: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
