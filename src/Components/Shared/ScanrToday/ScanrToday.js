import React from 'react';
import { IntlProvider, addLocaleData, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import CounterCardByType from '../CounterCards/CounterCardByType';

import classes from './ScanrToday.scss';

const ScanrToday = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.ScanrToday}>
        <div className="container">
          <div className="row">
            <div className="col">
              <span className={classes.Title}>
                <FormattedHTMLMessage
                  id="ScanrToday.string.title"
                  defaultMessage="ScanrToday.string.title"
                />
                <i className="fa fa-info" />
              </span>
            </div>
            <div className="col">
              <CounterCardByType
                schema="entity"
              />
            </div>
            <div className="col">
              <CounterCardByType
                schema="persons"
              />
            </div>
            <div className="col">
              <CounterCardByType
                schema="projects"
              />
            </div>
            <div className="col">
              <CounterCardByType
                schema="publications"
              />
            </div>
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default ScanrToday;

ScanrToday.propTypes = {
  language: PropTypes.string.isRequired,
};
