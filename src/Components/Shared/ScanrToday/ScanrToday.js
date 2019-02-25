import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import CounterCardByType from '../CounterCards/CounterCardByType';
import EvolutionCardByType from '../CounterCards/EvolutionCardByType';

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
            <div className="col-lg">
              <span className={classes.Title}>
                <FormattedHTMLMessage
                  id="ScanrToday.string.title"
                  defaultMessage="ScanrToday.string.title"
                />
                &nbsp;
                <i className="fa fa-info-circle" />
              </span>
            </div>
            <div className="col-lg">
              <CounterCardByType
                schema="entities"
                value="34 179"
                language={props.language}
              />
            </div>
            <div className="col-lg">
              <CounterCardByType
                schema="persons"
                value="127 447"
                language={props.language}
              />
            </div>
            <div className="col-lg">
              <CounterCardByType
                schema="projects"
                value="1 247"
                language={props.language}
              />
            </div>
            <div className="col-lg">
              <CounterCardByType
                schema="publications"
                value="420 887"
                language={props.language}
              />
            </div>
          </div>
          {/* /row */}
          <hr style={{ marginBottom: '8px' }} />
          <div className="row">
            <div className="col-lg">
              <span className={classes.SubTitle}>
                <FormattedHTMLMessage
                  id="ScanrToday.string.evolution"
                  defaultMessage="ScanrToday.string.evolution"
                />
              </span>
            </div>
            <div className="col-lg">
              <EvolutionCardByType
                schema="entities"
                value="-2"
                language={props.language}
              />
            </div>
            <div className="col-lg">
              <EvolutionCardByType
                schema="persons"
                value="+154"
                language={props.language}
              />
            </div>
            <div className="col-lg">
              <EvolutionCardByType
                schema="projects"
                value="+45"
                language={props.language}
              />
            </div>
            <div className="col-lg">
              <EvolutionCardByType
                schema="publications"
                value="+26"
                language={props.language}
              />
            </div>
          </div>
          {/* /row */}
          <hr style={{ marginTop: '0px' }} />
        </div>
        {/* /container */}
      </section>
    </IntlProvider>
  );
};

export default ScanrToday;

ScanrToday.propTypes = {
  language: PropTypes.string.isRequired,
};
