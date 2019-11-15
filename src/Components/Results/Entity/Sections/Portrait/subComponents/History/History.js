import React from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import SimpleCard from '../../../../../../Shared/Ui/SimpleCard/SimpleCard';
import HistoryListCard from './HistoryListCard';

import classes from './History.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * History
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const History = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  return (
    <div className="col-md-6">
      <div className={classes.History}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={messages[props.language]['Entity.portrait.history.title']} />
          </div>
        </div>

        <div className="row">
          <div className={`col-lg-6 ${classes.CardContainer}`}>
            <SimpleCard
              language={props.language}
              logo="fas fa-id-card"
              title={messages[props.language]['Entity.portrait.history.createdDate.title']}
              label={props.creationYear}
              tooltip=""
            />
          </div>
          <div className={`col-lg-6 ${classes.CardContainer}`}>
            <HistoryListCard
              language={props.language}
              title={messages[props.language]['Entity.portrait.history.history.title']}
              list={props.predecessors}
              labelListButton={messages[props.language]['Entity.portrait.history.history.labelListButton']}
              tooltip={messages[props.language]['Entity.portrait.history.history.tooltip']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

History.propTypes = {
  creationYear: PropTypes.string,
  language: PropTypes.string.isRequired,
  predecessors: PropTypes.array,
};
