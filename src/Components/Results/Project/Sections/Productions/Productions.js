import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import PublicationCard from '../../../../Search-page/SearchResults/ResultCards/PublicationCard';
import classes from './Productions.scss';

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
              modifyModeHandle={props.modifyModeHandleAuthors}
              modifyMode={props.modifyModeAuthors}
            >
              <FormattedHTMLMessage id="Project.productions.title" defaultMessage="Project.productions.title" />
            </SectionTitle>
            <div className="row">
              {
                props.data.map(part => (
                  <div className="col-4 p-1">
                    <PublicationCard
                      language={props.language}
                      data={{ value: part }}
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
            modifyModeHandle={props.modifyModeHandleAuthors}
            modifyMode={props.modifyModeAuthors}
          >
            <FormattedHTMLMessage id="Project.productions.title" defaultMessage="Project.productions.title" />
          </SectionTitle>
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
  data: PropTypes.string,
  modifyModeHandleAuthors: PropTypes.func.isRequired,
  modifyModeAuthors: PropTypes.func.isRequired,
};
