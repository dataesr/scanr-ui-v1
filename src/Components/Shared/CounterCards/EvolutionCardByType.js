import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './EvolutionCardByType.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const EvolutionCardByType = (props) => {
  const bgColor = classes[`${props.schema}Cards`];

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`${classes.EvolutionCardByType} ${bgColor}`}>
        <div className={classes.Value}>
          {props.value}
        </div>
      </div>
    </IntlProvider>
  );
};

export default EvolutionCardByType;

EvolutionCardByType.propTypes = {
  language: PropTypes.string.isRequired,
  schema: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
