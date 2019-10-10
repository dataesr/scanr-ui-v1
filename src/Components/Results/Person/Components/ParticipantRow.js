import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './ParticipantRow.scss';
import getSelectKey from '../../../../Utils/getSelectKey';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * genderGraphCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ParticipantRow = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={classes.participant}>
      {
        (props.data.role === 'coordinator')
          ? (
            <div className="d-flex justify-content-start align-items-bottom pr-2">
              <span className={classes.yellowBullet} />
              <FormattedHTMLMessage id="Project.participantRow.coordinator" defaultMessage="Project.participantRow.coordinator" />
            </div>
          )
          : null

      }
      <div className={classes.Title}>
        {
          (props.data.structure)
            ? getSelectKey(props.data.structure, 'label', props.language, 'default')
            : getSelectKey(props.data, 'label', props.language, 'default')
        }
      </div>
      <div className={`d-flex justify-content-between align-items-bottom pr-2 ${classes.Funding}`}>
        {
          (props.data.funding)
            ? (
              <div>{`${props.data.funding} €`}</div>
            )
            : null
        }
        {
          (props.data.structure && props.data.structure.address.length > 0 && props.data.structure.address[0].country)
            ? (
              <div>{`${props.data.structure.address[0].country}`}</div>
            )
            : null
        }
      </div>
    </div>
  </IntlProvider>
);


export default ParticipantRow;

ParticipantRow.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
