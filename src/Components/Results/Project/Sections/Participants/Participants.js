import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
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
    const coordinators = props.data.filter(part => (
      part.role === 'coordinator'
    ));
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
        console.log(error);
      }
    });
    const mapStyle = {
      height: '60vh',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
      borderBottom: '5px solid #3778bb'
    };
    return (
      <section className={`container-fluid ${classes.Participant}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fas fa-id-card"
              modifyModeHandle={props.modifyModeHandleAuthors}
              modifyMode={props.modifyModeAuthors}
            >
              <FormattedHTMLMessage id="Project.participants.title" defaultMessage="Project.participants.title" />
            </SectionTitle>
            <div className="row">
              <div className={`${classes.participantList} col-12 col-lg-5`}>
                {
                  props.data.map(part => (
                    <div className={`col-12 pt-1 pr-1 pl-2 pb-3 ${classes.participantItem}`} role="button">
                      <ParticipantRow
                        language={props.language}
                        data={part}
                        size="small"
                      />
                    </div>
                  ))
                }
              </div>
              <div className="col-hidden col-lg-7 p-0">
                <div className={`w-100 ${classes.MapContainer}`}>
                  <LeafletMap
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
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandleAuthors}
            modifyMode={props.modifyModeAuthors}
          >
            <FormattedHTMLMessage id="Project.participants.title" defaultMessage="Project.participants.title" />
          </SectionTitle>
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Project.participants.noParticipants" defaultMessage="Project.participants.noParticipants"/>
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
  data: PropTypes.string,
  modifyModeHandleAuthors: PropTypes.func.isRequired,
  modifyModeAuthors: PropTypes.func.isRequired,
};
