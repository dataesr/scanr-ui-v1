import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';

import classes from './Persons.scss';

import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Persons
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Persons = (props) => {
  const bgUrl = './img/poudre-projects_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };

  if (props.data) {
    return (
      <section className={`container-fluid ${classes.Participant}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fas fa-id-card"
              modifyModeHandle={props.modifyModeHandleAuthors}
              modifyMode={props.modifyModeAuthors}
            >
              <FormattedHTMLMessage id="Project.persons" defaultMessage="Project.persons" />
            </SectionTitle>
            <div className="row">
              <div className="d-flex pl-4 pr-4">
                Persons ici !
              </div>
            </div>
          </div>
        </IntlProvider>
      </section>
    );
  }
  return (
    <section className={`container-fluid ${classes.Persons}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandleAuthors}
            modifyMode={props.modifyModeAuthors}
          >
            <FormattedHTMLMessage id="Project.persons" defaultMessage="Project.persons" />
          </SectionTitle>
          <div className="row">
            <div className="d-flex pl-4 pr-4">
              <FormattedHTMLMessage id="Project.noPersons" defaultMessage="Project.noPersons" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Persons;

Persons.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string,
  modifyModeHandleAuthors: PropTypes.func.isRequired,
  modifyModeAuthors: PropTypes.func.isRequired,
};
