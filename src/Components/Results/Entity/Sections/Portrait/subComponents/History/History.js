import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import SimpleCard from '../../../../../../Shared/Ui/SimpleCard/SimpleCard';
import HistoryListCard from './HistoryListCard';

import classes from './History.scss';


/**
 * History
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const History = props => (
  <div className="col-md-6">
    <div className={classes.History}>
      <div className="row">
        <div className={`col ${classes.NoSpace}`}>
          <CardsTitle title={<FormattedHTMLMessage id="Entity.Portrait.History.title" />} />
        </div>
      </div>

      <div className="row">
        <div className={`col-lg-6 ${classes.CardContainer}`}>
          <SimpleCard
            language={props.language}
            logo="fas fa-id-card"
            title={<FormattedHTMLMessage id="Entity.Portrait.History.createdDate.title" />}
            label={props.creationYear}
            tooltip=""
          />
        </div>
        <div className={`col-lg-6 ${classes.CardContainer}`}>
          <HistoryListCard
            language={props.language}
            title={<FormattedHTMLMessage id="Entity.Portrait.History.history.title" />}
            list={props.predecessors}
            labelListButton={<FormattedHTMLMessage id="Entity.Portrait.History.history.labelListButton" />}
            tooltip={<FormattedHTMLMessage id="Entity.Portrait.History.history.tooltip" />}
          />
        </div>
      </div>
    </div>
  </div>
);

export default History;

History.propTypes = {
  creationYear: PropTypes.any,
  language: PropTypes.string.isRequired,
  predecessors: PropTypes.array,
};
