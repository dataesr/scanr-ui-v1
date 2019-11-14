import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ButtonToPage from '../Ui/Buttons/ButtonToPage2';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './CardWithButton.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardWithButton = (props) => {
  let bgColor = '';
  let position = '';
  if (props.schema) {
    bgColor = classes[`${props.schema}`];
  }
  if (props.position) {
    position = classes[`${props.position}`];
  }
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="col-lg" style={{ padding: '0px' }}>
        <div className={`${classes.CardWithButton} ${bgColor} ${position}`}>
          <div className={classes.Title}>
            <FormattedHTMLMessage
              id={props.title}
              defaultMessage={props.title}
            />
          </div>
          <div className="text-right">
            <ButtonToPage
              className={classes.Button}
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
  position: PropTypes.string,
};
