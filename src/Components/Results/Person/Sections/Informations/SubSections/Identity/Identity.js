import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';

import LogoCard from '../../../../../../Shared/Ui/LogoCard/LogoCard';
import PersonNameCard from '../../../../Components/PersonNameCard';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

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
  const extIdhal = (props.data.externalIds) ? (props.data.externalIds.filter(item => item.type.toLowerCase() === 'id_hal')) : [];
  if (props.data) {
    return (
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <section className="container-fluid">
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={messages[props.language]['Person.informations.identity.title']} />
            </div>
          </div>
          <div className="row">
            <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
              <PersonNameCard
                logo="fas fa-flask"
                title="Domaines de recherche"
                language={props.language}
                data={props.data}
              />
            </div>
              { (extIdref.length > 0) ? (
                <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                  <a href={'http:///www.idref.fr/'.concat(extIdref[0].id)} target="_blank" rel="noopener noreferrer">
                    <LogoCard
                      language={props.language}
                      url="/img/logo-idref.png"
                      label="Idref"
                      cssClass="Height75"
                    />
                  </a>
                </div>
              ) : null }
              { (extOrcid.length > 0) ? (
                <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                  <a href={'http:///www.orcid.org/'.concat(extOrcid[0].id)} target="_blank" rel="noopener noreferrer">
                    <LogoCard
                      language={props.language}
                      url="/img/logo-orcid.svg"
                      label="Orcid"
                      cssClass="Height150"
                    />
                  </a>
                </div>
              ) : null }
              { (extIdhal.length > 0) ? (
                <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                  <a href={'https://aurehal.archives-ouvertes.fr/author/browse?critere=idHal_i:%22'.concat(extIdhal[0].id, '%22')} target="_blank" rel="noopener noreferrer">
                    <LogoCard
                      language={props.language}
                      url="/img/logo-hal.svg"
                      label="IdHAL"
                      cssClass="Height75"
                    />
                  </a>
                </div>
              ) : null }
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
