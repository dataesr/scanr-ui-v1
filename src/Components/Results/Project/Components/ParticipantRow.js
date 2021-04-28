import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

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

const ParticipantRow = (props) => {
  const getSubs = subParticipants => (
    subParticipants.map(part => (
      <li className={`${classes.coParticipant} pl-2`} key={uuidv4()}>
        {
          (part.structure)
            ? (
              <a href={`entite/${part.structure.id}`}>
                {
                  (part.structure?.label)
                    ? getSelectKey(part.structure, 'label', props.language, 'default')
                    : getSelectKey(part, 'label', props.language, 'default').split('__')[0]
                }
              </a>
            )
            : getSelectKey(props.data, 'label', props.language, 'default').split('__')[0]
        }
      </li>
    ))
  );

  return (
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
          (props.data.structure?.id && props.data.structure?.label)
            ? (
              <a href={`entite/${props.data.structure.id}`}>
                {getSelectKey(props.data.structure, 'label', props.language, 'default')}
              </a>
            )
            : getSelectKey(props.data, 'label', props.language, 'default').split('__')[0]
        }
      </p>
      <div className={`d-flex justify-content-between align-items-bottom pr-2 ${classes.Funding}`}>
        {
          (props.data.funding)
            ? (
              <p>{`${parseFloat(props.data.funding).toLocaleString(props.language)} €`}</p>
            )
            : null
        }
        {
          (props?.data?.structure?.address?.[0]?.country)
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
      {
        (props?.data?.subParticipants?.length > 0)
          ? (
            <p className="mr-3 mt-2">
              <i>Co-participants</i>
              <ul className="pl-3 mt-0">
                {getSubs(props.data.subParticipants)}
              </ul>
            </p>
          ) : null
      }
    </div>
  );
};

export default ParticipantRow;

ParticipantRow.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
