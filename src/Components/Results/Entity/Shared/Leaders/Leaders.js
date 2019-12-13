import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';
import PersonCard from '../../../../Shared/Ui/PersonCard/PersonCard';

import classes from './Leaders.scss';

/**
 * Leaders
 * Url : ex: /entite/200711886U
 * Description : Bloc Direction visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

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
            <CardsTitle
              title={<FormattedHTMLMessage id="Entity.Shared.Leaders.title" />}
              language={props.language}
              lexicon="EntityDirection"
            />
          </div>
        </div>
        <div className="row">
          {
            props.leaders.map(leader => (
              <div className={`col-6 ${classes.CardContainer}`} key={leader.lastName}>
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
