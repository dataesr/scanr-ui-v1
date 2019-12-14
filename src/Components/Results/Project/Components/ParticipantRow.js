import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './ParticipantRow.scss';
import getSelectKey from '../../../../Utils/getSelectKey';

/**
 * genderGraphCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ParticipantRow = props => (
  <div className={classes.participant}>
    {
      (props.data.role === 'coordinator')
        ? (
          <div className="d-flex justify-content-start align-items-bottom pr-2">
            <span className={classes.yellowBullet} />
            <p className={classes.Funding}>
              <FormattedHTMLMessage id="Project.ParticipantsRow.coordinator" />
            </p>
          </div>
        )
        : null

    }
    <p className={classes.Title}>
      {
        (props.data.structure)
          ? (
            <a href={`entite/${props.data.structure.id}`}>
              {getSelectKey(props.data.structure, 'label', props.language, 'default')}
            </a>
          )
          : getSelectKey(props.data, 'label', props.language, 'default')
      }
    </p>
    <div className={`d-flex justify-content-between align-items-bottom pr-2 ${classes.Funding}`}>
      {
        (props.data.funding)
          ? (
            <p>{`${parseFloat(props.data.funding).toLocaleString(props.language)} €`}</p>
          )
          : <div />
      }
      {
        (props.data.structure && props.data.structure.address && props.data.structure.address.length > 0 && props.data.structure.address[0].country)
          ? (
            <p>{`${props.data.structure.address[0].country}`}</p>
          )
          : (
            <p>
              <FormattedHTMLMessage id="Project.ParticipantsRow.noAddress" />
            </p>
          )
      }
    </div>
  </div>
);


export default ParticipantRow;

ParticipantRow.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
