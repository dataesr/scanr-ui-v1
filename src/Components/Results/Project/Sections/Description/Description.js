import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';

import classes from './Description.scss';

import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * Description
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Description = (props) => {
  const bgUrl = './img/poudre-projects_fond_blanc.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };
  const AlternativeLanguage = (props.language === 'fr') ? 'en' : 'fr';
  if (props.data) {
    return (
      <section className={`container-fluid ${classes.Description}`} style={sectionStyle}>
        <IntlProvider locale={props.language} messages={messages[props.language]}>
          <div className="container">
            <SectionTitle
              icon="fa-open"
              objectType="structures"
              language={props.language}
              id={props.id}
              title={messages[props.language]['Project.description.title']}
            />
            <div className="row">
              <div className="d-flex pl-4 pr-4">
                {props.data[props.language] || props.data[AlternativeLanguage] || props.data.default}
              </div>
            </div>
          </div>
        </IntlProvider>
      </section>
    );
  }
  return (
    <section className={`container-fluid ${classes.Description}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fa-open"
            objectType="structures"
            language={props.language}
            id={props.id}
            title={messages[props.language]['Project.description.title']}
          />
          <div className="row">
            <div className={`d-flex pl-4 pr-4 ${classes.noDataOnSection}`}>
              <FormattedHTMLMessage id="Project.description.noDescription" defaultMessage="Project.description.noDescription" />
            </div>
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Description;

Description.propTypes = {
  language: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  data: PropTypes.object,
};
