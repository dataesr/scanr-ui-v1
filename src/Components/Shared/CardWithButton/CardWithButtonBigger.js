import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

import classes from './CardWithButtonBigger.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardWithButtonBigger = (props) => {
  // const bgColor = classes[`${props.schema}BgColor`];
  let bgColor = '';
  if (props.schema) {
    bgColor = classes[`${props.schema}BgColor`];
  }
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="col-lg-4" style={{ padding: '0px' }}>
        <div className={`${classes.CardWithButtonBigger} ${bgColor}`}>
          <div className={classes.Title}>
            <FormattedHTMLMessage
              id={props.title}
              defaultMessage={props.title}
            />
          </div>
          <div className={classes.Button}>
            <ButtonToPage
              className={classes.Butt}
              url={props.url}
            >
              Découvrir
            </ButtonToPage>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};


export default CardWithButtonBigger;

CardWithButtonBigger.propTypes = {
  language: PropTypes.string.isRequired,
  schema: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
