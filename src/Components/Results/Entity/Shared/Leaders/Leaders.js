import React from 'react';
import PropTypes from 'prop-types';

import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';
import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';

import classes from './Leaders.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


/**
 * Leaders
 * Url : ex: /entite/200711886U
 * Description : Bloc Direction visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Leaders = (props) => {
  let styleCss = null;
  if (props.leaders.length === 0) {
    styleCss = {
      display: 'none',
    };
  }

  return (
    <div className="col-md-6" style={styleCss}>
      <div className={classes.Leaders}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={messages[props.language]['Entity.portrait.leaders.title']} />
          </div>
        </div>
        <div className="row">
          {
            props.leaders.map(leader => (
              <div className={`col-6 ${classes.CardContainer}`}>
                <PersonCard
                  data={leader}
                  email={leader.email}
                  firstName={leader.firstName}
                  language={props.language}
                  lastName={leader.lastName}
                  role={leader.role}
                  className={classes.PersonCardHeight}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Leaders;
Leaders.defaultProps = {
  leaders: [],
};
Leaders.propTypes = {
  language: PropTypes.string.isRequired,
  leaders: PropTypes.array,
};
