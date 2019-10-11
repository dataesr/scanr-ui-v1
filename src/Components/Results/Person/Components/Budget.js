import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './Budget.scss';

import TeamPie from '../../../Shared/GraphComponents/Graphs/TeamPie';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

/**
 * genderGraphCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Budget = (props) => {
  const financedPercent = 100 * props.financed / props.total;
  const noFinancedPercent = 100 - financedPercent;

  const data = {
    percentage: true,
    values: [financedPercent, noFinancedPercent],
    labels: ['Financed', 'Not financed'],
    colors: ['#fe7747', '#96462a'],
  };

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={classes.Budget}>
        <div className={classes.Graph}>
          <TeamPie
            language={props.language}
            data={data}
            bgColor="#e9ecf1"
            borderSize={0}
          />
        </div>
      </div>
    </IntlProvider>
  );
};

export default Budget;

Budget.propTypes = {
  language: PropTypes.string.isRequired,
  financed: PropTypes.number,
  total: PropTypes.number,
};
