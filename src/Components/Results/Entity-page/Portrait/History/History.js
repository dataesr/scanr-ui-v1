import React from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard';
import SimpleListCard from '../../../../Shared/Ui/SimpleListCard/SimpleListCard';

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
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const History = (props) => {
  const history = props.predecessors;
  return (
    <div className={classes.History}>
      <div className="row">
        <div className={`col ${classes.NoSpace}`}>
          <CardsTitle title={messages[props.language]['Entity.portrait.history.title']} />
        </div>
      </div>

      <div className="row">
        <div className={`col-6 ${classes.NoSpace}`}>
          <SimpleCard
            logo="fas fa-id-card"
            title={messages[props.language]['Entity.portrait.history.createdDate.title']}
            label={props.creationYear}
            tooltip=""
          />
        </div>
        <div className={`col-6 ${classes.NoSpace}`}>
          <SimpleListCard
            logo="fas fa-clock"
            title={messages[props.language]['Entity.portrait.history.history.title']}
            label={props.id}
            list={history}
            labelListButton={messages[props.language]['Entity.portrait.history.history.labelListButton']}
            subCategory
            tooltip={messages[props.language]['Entity.portrait.history.history.tooltip']}
          />
        </div>
      </div>
    </div>
  );
};

export default History;

History.propTypes = {
  creationYear: PropTypes.string,
  id: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  predecessors: PropTypes.array,
};
