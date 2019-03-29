import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonToPage from '../Ui/Buttons/ButtonToPage';

import classes from './CardWithButton.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardWithButton = (props) => {
  // const bgColor = classes[`${props.schema}BgColor`];
  let bgColor = '';
  if (props.schema) {
    bgColor = classes[`${props.schema}BgColor`];
  }
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="col-lg-3" style={{ padding: '0px' }}>
        <div className={`${classes.CardWithButton} ${bgColor}`}>
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
              <FormattedHTMLMessage
                id={props.lib_button}
                defaultMessage={props.lib_button}
              />
            </ButtonToPage>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};


export default CardWithButton;

CardWithButton.propTypes = {
  language: PropTypes.string.isRequired,
  schema: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  lib_button: PropTypes.string.isRequired,
};
