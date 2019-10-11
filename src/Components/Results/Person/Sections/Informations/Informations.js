import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import Affiliations from '../SubSections/Affiliations/Affiliations';
import Domains from '../SubSections/Domains/Domains';
import Identity from '../SubSections/Identity/Identity';
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
            <FormattedHTMLMessage id="Person.informations.title" defaultMessage="Person.informations.title" />
          </SectionTitle>
          <div className="row">
            <div className="col-lg">
              <div className="row">
                <div className={`col-12 ${classes.NoSpace}`}>
                  <Identity
                    language={props.language}
                    data={props.data}
                    masterKey="Person/domains"
                    modifyMode={props.modifyMode}
                    allData={props.data}
                  />
                  <Domains
                    language={props.language}
                    data={props.data}
                    masterKey="Person/domains"
                    modifyMode={props.modifyMode}
                    allData={props.data}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg">
              <div className="row">
                <div className={`col-12 ${classes.NoSpace}`}>
                  <Affiliations
                    language={props.language}
                    data={props.data.affiliations}
                  />
                </div>
              </div>
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
  data: PropTypes.object,
  modifyModeHandle: PropTypes.func.isRequired,
  modifyMode: PropTypes.bool.isRequired,
};
