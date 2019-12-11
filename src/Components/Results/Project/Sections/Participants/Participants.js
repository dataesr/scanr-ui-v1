import React from 'react';
import PropTypes from 'prop-types';

import EmptySection from '../../../Shared/EmptySection/EmptySection';
import ParticipantRow from '../../Components/ParticipantRow';
import LeafletMap from '../../../../Shared/GraphComponents/Graphs/LeafletMap';
import getSelectKey from '../../../../../Utils/getSelectKey';

import classes from './Participants.scss';
import styles from '../../../../../style.scss';
/**
 * Participants
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Participants = (props) => {
  if (!props.data) return <EmptySection />;
  const mapdata = [];
  props.data.forEach((part) => {
    try {
      const dataElement = {
        id: part.structure.id,
        position: [part.structure.address[0].gps.lat, part.structure.address[0].gps.lon],
        infos: [getSelectKey(part.structure, 'label', props.language, 'default')],
      };
      mapdata.push(dataElement);
    } catch (error) {
      // eslint-disable-no-empty
    }
  });
  const mapStyle = {
    height: '60vh',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    borderBottom: `5px solid ${styles.entityColor}`,
  };
  return (
    <div className="row">
      <div className="px-3 col-12 col-lg-5">
        <div className={`${classes.participantList}`}>
          {
            props.data.map(part => (
              <div
                key={getSelectKey(part, 'label', props.language, 'default')}
                className={`col-12 py-3 px-3 ${classes.participantItem}`}
                role="button"
              >
                <ParticipantRow
                  language={props.language}
                  data={part}
                  size="small"
                />
              </div>
            ))
          }
        </div>
      </div>
      <div className="col-hidden col-lg-7 p-0">
        <div className={`w-100 ${classes.MapContainer}`}>
          <LeafletMap
            zoom={2}
            filename="carto"
            data={mapdata}
            language={props.language}
            style={mapStyle}
          />
        </div>
      </div>
    </div>
  );
};

export default Participants;

Participants.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
