import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './CardTwoColumns.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CardTwoColumns = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className="col-lg-6" style={{ padding: '0px' }}>
      <div className={classes.CardTwoColumns}>
        <div className={classes.Title}>
          <FormattedHTMLMessage
            id={props.title}
            defaultMessage={props.title}
          />
        </div>
        <div className={classes.Content}>
          {props.children}
        </div>
      </div>
    </div>
  </IntlProvider>
);


export default CardTwoColumns;

CardTwoColumns.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
