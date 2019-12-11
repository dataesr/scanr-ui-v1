import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../Shared/SectionTitle';
import ParticipantRow from '../../Components/ParticipantRow';
import LeafletMap from '../../../../Shared/GraphComponents/Graphs/LeafletMap';
import getSelectKey from '../../../../../Utils/getSelectKey';

import classes from './Participants.scss';

import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Participants
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Participants = (props) => {
  const bgUrl = './img/poudre-projects_fond_blanc.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };

  if (props.data) {
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
      borderBottom: '5px solid #ebc034',
    };
    return (
      <section className={`container-fluid ${classes.Participant}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fa-th"
              lexicon="ProjectParticipant"
              objectType="projects"
              language={props.language}
              id={props.id}
              title={messages[props.language]['Project.participants.title']}
            />
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
          </div>
        </IntlProvider>
      </section>
    );
  }
  return (
    <section className={`container-fluid ${classes.Participants}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fa-folder-open"
            lexicon="ProjectParticipant"
            objectType="projects"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Project.participants.title']}
          />
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Project.participants.noParticipants" defaultMessage="Project.participants.noParticipants" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Participants;

Participants.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.array,
};
