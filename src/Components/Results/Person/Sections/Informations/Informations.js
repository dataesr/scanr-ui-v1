import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import Affiliations from './SubSections/Affiliations/Affiliations';
import Domains from './SubSections/Domains/Domains';
import Identity from './SubSections/Identity/Identity';
import Roles from './SubSections/Roles/Roles';
import Prizes from './SubSections/Prizes/Prizes';
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
  const bgUrl = './img/poudre-persons_fond_gris.jpg';
  const sectionStyle = {
    backgroundImage: `url(${bgUrl})`,
  };
  const hasAffiliations = (props.data.affiliations) ? 'col-12' : 'col-lg-6 col-md-12';


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
                <div className={`${hasAffiliations} ${classes.NoSpace}`}>
                  <Identity
                    language={props.language}
                    data={props.data}
                    masterKey="Person/identity"
                    modifyMode={props.modifyMode}
                    allData={props.data}
                  />
                </div>
                <div className={`${hasAffiliations} ${classes.NoSpace}`}>
                  <Domains
                    language={props.language}
                    data={props.data}
                    masterKey="Person/domains"
                    modifyMode={props.modifyMode}
                    allData={props.data}
                  />
                </div>
                <div className={`${hasAffiliations} ${classes.NoSpace}`}>
                  <Prizes
                    language={props.language}
                    data={props.data}
                    masterKey="Person/prizes"
                    modifyMode={props.modifyMode}
                    allData={props.data}
                  />
                </div>
                {
                  (!props.data.affiliations)
                    ? (
                      <div className={`${hasAffiliations} ${classes.NoSpace}`}>
                        <Roles
                          language={props.language}
                          data={props.data}
                          masterKey="Person/roles"
                          modifyMode={props.modifyMode}
                          allData={props.data}
                        />
                      </div>
                    )
                    : null
                }
              </div>
            </div>
            {
              (props.data.affiliations)
                ? (
                  <div className="col-lg">
                    <div className="row">
                      <div className={`col-12 ${classes.NoSpace}`}>
                        <Affiliations
                          language={props.language}
                          data={props.data.affiliations}
                          masterKey="Person/affiliation"
                          modifyMode={props.modifyMode}
                          allData={props.data}
                        />
                      </div>
                      <div className={`col-12 ${classes.NoSpace}`}>
                        <Roles
                          language={props.language}
                          data={props.data}
                          masterKey="Person/roles"
                          modifyMode={props.modifyMode}
                          allData={props.data}
                        />
                      </div>
                    </div>
                  </div>
                )
                : null
            }
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
