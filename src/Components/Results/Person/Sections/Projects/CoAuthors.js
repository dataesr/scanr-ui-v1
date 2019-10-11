import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import PersonCard from '../../../../Search-page/SearchResults/ResultCards/PersonCard';
import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

import classes from './CoAuthors.scss';
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Productions
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Productions = (props) => {
  const bgUrl = './img/poudre-projects_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };
  if (props.data) {
    return (
      <section className={`container-fluid ${classes.Productions}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fas fa-id-card"
              modifyModeHandle={props.modifyModeHandle}
              modifyModeKey="productions"
              modifyMode={props.modifyMode}
            >
              <FormattedHTMLMessage id="Project.productions.title" defaultMessage="Project.productions.title" />
            </SectionTitle>
            {
              (props.modifyMode)
                ? (
                  <SubmitBox
                    language={props.language}
                    masterKey="Project/title"
                    label="empty"
                    emptySection
                    autoLaunch={props.modifyMode}
                    modifyModeHandle={props.modifyModeHandle}
                  />
                )
                : null
            }
            <div className="row">
              {
                props.data.map(pers => (
                  <div key={pers.id} className="col-4 p-1">
                    <PersonCard
                      language={props.language}
                      data={{ value: pers }}
                      size="small"
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </IntlProvider>
      </section>
    );
  }
  return (
    <section className={`container-fluid ${classes.Productions}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandle}
            modifyModeKey="participants"
            modifyMode={props.modifyMode}
          >
            <FormattedHTMLMessage id="Project.productions.title" defaultMessage="Project.productions.title" />
          </SectionTitle>
          {
            (props.modifyMode)
              ? (
                <SubmitBox
                  language={props.language}
                  masterKey="Project/productions"
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
              <FormattedHTMLMessage id="Project.productions.noProductions" defaultMessage="Project.productions.noProductions" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  modifyModeHandle: PropTypes.func.isRequired,
  modifyMode: PropTypes.bool.isRequired,
};
