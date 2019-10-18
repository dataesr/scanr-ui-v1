import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import Identity from './SubSections/Identity';
import Status from './SubSections/Status';

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
  return (
    <section className={`container-fluid ${classes.Informations}`} style={sectionStyle}>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className="container">
          <SectionTitle
            icon="fas fa-id-card"
            modifyModeHandle={props.modifyModeHandle}
            modifyModeKey="informations"
            modifyMode={props.modifyMode}
          >
            <FormattedHTMLMessage id="Project.informations.title" defaultMessage="Project.informations.title" />
          </SectionTitle>
          <div className="d-flex flex-wrap">
            <Identity
              language={props.language}
              data={props.data}
              masterKey="Project/informations"
              modifyMode={props.modifyMode}
              allData={props.data}
            />
            <Status
              language={props.language}
              data={props.data}
              masterKey="Project/informations"
              modifyMode={props.modifyMode}
              allData={props.data}
            />
          </div>
        </div>
      </IntlProvider>
    </section>
  );
};

export default Informations;

Informations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
  modifyModeHandle: PropTypes.func.isRequired,
  modifyMode: PropTypes.bool.isRequired,
};
