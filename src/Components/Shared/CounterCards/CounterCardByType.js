import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './CounterCardByType.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const CounterCardByType = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={classes.CounterCardByType}>
      <div className={classes.Img}>
        <img
          src={`./img/icon-${props.schema}.svg`}
          alt="Logo MESRI"
          className={classes.Logo}
        />
      </div>

      <div className={classes.Value}>
        {props.value}
      </div>

      <div className={classes.Label}>
        <FormattedHTMLMessage
          id={`CounterCardByType.${props.schema}`}
          defaultMessage={`CounterCardByType.${props.schema}`}
        />
      </div>
    </div>
  </IntlProvider>
);


export default CounterCardByType;

CounterCardByType.propTypes = {
  language: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
