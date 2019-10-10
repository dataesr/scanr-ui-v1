import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import SimpleCard from '../../../../Shared/Ui/SimpleCard/SimpleCard2';
import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

import classes from './Programs.scss';

import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Programs
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const Programs = (props) => {
  if (props.data) {
    let priorities = '';
    if (props.data.domains) {
      props.data.domains.filter(dom => (
        dom.type === 'priorities'
      )).forEach((prio) => {
        if (priorities && prio.label.default) {
          priorities += ` / ${prio.label.default}`;
        }
        priorities += (prio.label.default);
      });
    }
    const pretopics = (props.data.domains)
      ? props.data.domains.filter(dom => (
        dom.type === 'topic'
      ))
      : [];
    const topics = (pretopics.length > 0) ? pretopics[0].label.default : null;
    const call = (props.data.call && props.data.call.label) ? props.data.call.label : { label: null };
    if (topics || priorities || call.label) {
      return (
        <section className={`container-fluid ${classes.Programs}`}>
          <IntlProvider locale={props.language} messages={messages[props.language]}>
            <div className="container">
              <SectionTitle
                icon="fas fa-id-card"
                modifyModeHandle={props.modifyModeHandle}
                modifyMode={props.modifyMode}
              >
                <FormattedHTMLMessage id="Project.programs.title" defaultMessage="Project.programs.title" />
              </SectionTitle>
              <div className="row">
                <div className="d-flex flex-wrap align-self-start">
                  <div className={classes.noSpace}>
                    <SimpleCard
                      language={props.language}
                      logo="fas fa-calendar-day"
                      title={`${messages[props.language]['Project.programs.call']} - ${props.data.year}`}
                      label={
                        (props.data.call)
                          ? props.data.call.label
                          : null
                      }
                      tooltip=""
                      masterKey="Project/call"
                      modifyMode={props.modifyMode}
                      allData={props.data}
                    />
                  </div>
                  <div className={classes.noSpace}>
                    <SimpleCard
                      language={props.language}
                      logo="fas fa-calendar-day"
                      title={messages[props.language]['Project.programs.action']}
                      label={
                        (props.data.action && props.data.action.label)
                          ? props.data.action.label.default
                          : null
                      }
                      tooltip=""
                      masterKey="Project/action"
                      modifyMode={props.modifyMode}
                      allData={props.data}
                    />
                  </div>
                  <div className={classes.noSpace}>
                    <SimpleCard
                      language={props.language}
                      logo="fas fa-calendar-day"
                      title={messages[props.language]['Project.programs.topic']}
                      label={topics}
                      tooltip=""
                      masterKey="Project/topic"
                      modifyMode={props.modifyMode}
                      allData={props.data}
                    />
                  </div>
                  <div className={classes.noSpace}>
                    <SimpleCard
                      language={props.language}
                      logo="fas fa-calendar-day"
                      title={messages[props.language]['Project.programs.priorities']}
                      label={priorities}
                      tooltip=""
                      masterKey="Project/priorities"
                      modifyMode={props.modifyMode}
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
  }
  return (
    <section className={`container-fluid ${classes.Programs}`}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandle}
            modifyMode={props.modifyMode}
          >
            <FormattedHTMLMessage id="Project.programs.title" defaultMessage="Project.programs.title" />
          </SectionTitle>
          {
            (props.modifyMode)
              ? (
                <SubmitBox
                  language={props.language}
                  masterKey="Project/programs"
                  label="empty"
                  emptySection
                  autoLaunch={props.modifyMode}
                  modifyModeHandle={props.modifyModeHandle}
                />
              )
              : null
          }
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Project.programs.noPrograms" defaultMessage="Project.programs.noPrograms" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Programs;

Programs.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  modifyModeHandle: PropTypes.func.isRequired,
  modifyMode: PropTypes.bool.isRequired,
};
