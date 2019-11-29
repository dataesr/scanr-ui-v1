import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './genderGraphCard.scss';

import TeamPie from '../../../../../Shared/GraphComponents/Graphs/TeamPie';

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
const genderGraphCard = (props) => {
  const total = props.nbMales + props.nbFemales + props.nbUnknown;
  const nbMalesPct = 100 * props.nbMales / total;
  const nbFemalesPct = 100 * props.nbFemales / total;
  const nbUnknownPct = 100 * props.nbUnknown / total;
  const labels = (props.language === 'fr') ? ['Hommes', 'Femmes', 'Inconnu'] : ['Men', 'Women', 'Unknown'];

  const data = {
    percentage: true,
    values: [nbMalesPct, nbFemalesPct, nbUnknownPct],
    labels,
    colors: ['#fe7747', '#96462a', '#aaaaaa'],
  };

  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={classes.genderGraphCard}>
        <div>
          <span className={classes.Title}>
            <FormattedHTMLMessage
              id="genderGraphCard.title"
              defaultMessage="genderGraphCard.title"
            />
          </span>
        </div>
        <div className={classes.Graph}>
          <TeamPie language={props.language} data={data} />
        </div>
      </div>
    </IntlProvider>
  );
};

export default genderGraphCard;
genderGraphCard.defaultProps = {
  nbMales: 0,
  nbFemales: 0,
  nbUnknown: 0,
};
genderGraphCard.propTypes = {
  language: PropTypes.string.isRequired,
  nbMales: PropTypes.number,
  nbFemales: PropTypes.number,
  nbUnknown: PropTypes.number,
};
