import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import LogoCard from '../../../../../../Shared/Ui/LogoCard/LogoCard';
import PersonNameCard from '../../../../Components/PersonNameCard';

import classes from './Identity.scss';

import messagesFr from '../../../../translations/fr.json';
import messagesEn from '../../../../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Identity = (props) => {
  const extIdref = (props.data.externalIds) ? (props.data.externalIds.filter(item => item.type.toLowerCase() === 'idref')) : [];
  const extOrcid = (props.data.externalIds) ? (props.data.externalIds.filter(item => item.type.toLowerCase() === 'orcid')) : [];
  if (props.data) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid">
          <div className="row">
            <div className={`col-12 ${classes.CardContainer}`}>
              <div className={classes.SubSectionTitle}>
                <FormattedHTMLMessage id="Person.informations.identity.title" defaultMessage="Person.informations.identity.title" />
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className={`col-md-6 col-sm-12 ${classes.NoSpace} ${classes.CardContainer}`}>
                    <PersonNameCard
                      logo="fas fa-flask"
                      title="Domaines de recherche"
                      language={props.language}
                      data={props.data}
                    />
                    { (extIdref.length > 0) ? (
                      <a href={'http:///www.idref.fr/'.concat(extIdref[0].id)} target="_blank" rel="noopener noreferrer">
                        <LogoCard
                          language={props.language}
                          url="/img/logo-idref.png"
                          label="Idref"
                          cssClass="Height75"
                        />
                      </a>
                    ) : null }
                  </div>
                  <div className={`col-md-6 col-sm-12 ${classes.NoSpace} ${classes.CardContainer}`}>
                    { (extOrcid.length > 0) ? (
                      <a href={'http:///www.orcid.org/'.concat(extOrcid[0].id)} target="_blank" rel="noopener noreferrer">
                        <LogoCard
                          language={props.language}
                          url="/img/logo-orcid.svg"
                          label="Orcid"
                          cssClass="Height150"
                        />
                      </a>
                    ) : null }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </IntlProvider>
    );
  }
  return null;
};

export default Identity;

Identity.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object,
};
