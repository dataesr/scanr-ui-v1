import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import moment from 'moment';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard2';
import getSelectKey from '../../../../../Utils/getSelectKey';

import classes from './Informations.scss';

import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Informations
 * Url : .
 * Informations : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Informations = (props) => {
  const bgUrl = './img/poudre-projects_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };
  const filterKeys = ['label', 'startDate', 'id', 'endDate', 'acronym', 'type'];
  let filtered = null;
  if (Object.keys(props.data).length > 0) {
    filtered = Object.keys(props.data)
      .filter(key => filterKeys.includes(key))
      .reduce((obj, key) => ({
        ...obj,
        [key]: props.data[key],
      }));
  }
  if (filtered) {
    const startDate = moment(filtered.startDate).format('L');
    const endDate = moment(filtered.endDate).format('L');
    const title = getSelectKey(filtered, 'label', props.language, 'fr');
    const acro = ` (${getSelectKey(filtered, 'acronym', 'default', 'fr')})`;
    const titleAcro = title + acro;
    return (
      <section className={`container-fluid ${classes.Informations}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fas fa-id-card"
              modifyModeHandle={props.modifyModeHandleAuthors}
              modifyMode={props.modifyModeAuthors}
            >
              <FormattedHTMLMessage id="Project.informations.title" defaultMessage="Project.informations.title" />
            </SectionTitle>
            <div className="row">
              <div className={`d-flex flex-wrap align-self-start ${classes.noSpace50}`}>
                <div className={classes.noSpace100}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-calendar-day"
                    title={messages[props.language]['Project.informations.name']}
                    label={titleAcro}
                    tooltip=""
                    masterKey="Project/type"
                    modifyMode={props.modifyModeAuthors}
                    allData={props.data}
                  />
                </div>
                {
                  (startDate)
                    ? (
                      <div className={classes.noSpace50}>
                        <SimpleCard
                          language={props.language}
                          logo="fas fa-id-card"
                          title={messages[props.language]['Project.informations.startDate']}
                          label={startDate}
                          tooltip=""
                          masterKey="Project/startDate"
                          modifyMode={props.modifyModeAuthors}
                          allData={props.data}
                        />
                      </div>
                    )
                    : null
                }
                {
                  (endDate)
                    ? (
                      <div className={classes.noSpace50}>
                        <SimpleCard
                          language={props.language}
                          logo="fas fa-id-card"
                          title={messages[props.language]['Project.informations.endDate']}
                          label={endDate}
                          tooltip=""
                          masterKey="Project/title"
                          modifyMode={props.modifyModeAuthors}
                          allData={props.data}
                        />
                      </div>
                    )
                    : null
                }
              </div>
              <div className={`${classes.noSpace50} d-flex flex-wrap align-self-start`}>
                <div className={classes.noSpace50}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-calendar-day"
                    title={messages[props.language]['Project.informations.type']}
                    label={props.data.type}
                    tooltip=""
                    masterKey="Project/type"
                    modifyMode={props.modifyModeAuthors}
                    allData={props.data}
                  />
                </div>
                <div className={classes.noSpace50}>
                  <SimpleCard
                    language={props.language}
                    logo="fas fa-qrcode"
                    title={messages[props.language]['Project.informations.identifier']}
                    label={props.data.id}
                    tooltip=""
                    masterKey="Project/title"
                    modifyMode={props.modifyModeAuthors}
                    allData={props.data}
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
    <section className={`container-fluid ${classes.Informations}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandleAuthors}
            modifyMode={props.modifyModeAuthors}
          >
            <FormattedHTMLMessage id="Project.informations.title" defaultMessage="Project.informations.title" />
          </SectionTitle>
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Project.informations.noInformations" defaultMessage="Project.informations.noInformations" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Informations;

Informations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string,
  modifyModeHandleAuthors: PropTypes.func.isRequired,
  modifyModeAuthors: PropTypes.func.isRequired,
};
