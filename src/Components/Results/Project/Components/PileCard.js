import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import classes from './PileCard.scss';
/**
 * PileCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PileCard = (props) => {
  const messages = {
    fr: {
      running: 'En cours',
      over: 'Terminé',
    },
    en: {
      running: 'Ongoing',
      over: 'Over',
    },
  };
  const percent = `${props.percents}%`;
  let color = '#5dd99d';
  let status = 'running';
  if (props.percents === 100) {
    color = '#e74253';
    status = 'over';
  }

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={classes.card}>
        <div className={classes.Title}>
          {messages[props.language][status]}
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <div className={classes.Pile} style={{ borderColor: color }}>
            <div className={classes.PileFill} style={{ width: percent, backgroundColor: color }} />
          </div>
          <div className={classes.PileExtend} style={{ backgroundColor: color }} />
        </div>
      </div>
    </IntlProvider>
  );
};

export default PileCard;

PileCard.propTypes = {
  language: PropTypes.string.isRequired,
  percents: PropTypes.number.isRequired,
};
