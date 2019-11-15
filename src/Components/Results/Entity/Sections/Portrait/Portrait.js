import React, { Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ExpertiseField from './subComponents/ExpertiseField/ExpertiseField';
import History from './subComponents/History/History';
import Identity from './subComponents/Identity/Identity';
import Leaders from '../../Shared/Leaders/Leaders';
import Localisation from './subComponents/Localisation/Localisation';
import SectionTitle from '../../../Shared/SectionTitle';
import Web from './subComponents/Web/Web';
// import SocialNetworksFlow from './subComponents/SocialNetworksFlow/SocialNetworksFlow';

import Background from '../../../../Shared/images/poudre-jaune_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from '../../translations/fr.json';
import messagesEn from '../../translations/en.json';

import classes from './Portrait.scss';


const messages = {
  fr: messagesFr,
  en: messagesEn,
};


/**
 * Portrait
 * Url : ex: /entite/200711886U
 * Description : Correspond à la section Portrait d'une entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Portrait = (props) => {
  if (!props.data) {
    return null;
  }
  const sectionStyle = {
    backgroundImage: `url(${Background})`,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <Fragment>
        <section className={`container-fluid ${classes.Portrait}`} style={sectionStyle}>
          <div className="container">
            <SectionTitle
              icon="fa-open"
              objectType="structures"
              language={props.language}
              id={props.id}
              title="Portrait"
            >
              <FormattedHTMLMessage id="Entity.Section.Portrait.label" defaultMessage="Entity.Section.Portrait.label" />
            </SectionTitle>
            <div className="row">
              <Identity
                acronym={props.data.acronym}
                externalIds={props.data.externalIds || []}
                links={props.data.links || []}
                id={props.data.id}
                language={props.language}
                description={props.data.description}
                name={props.data.label}
                nature={props.data.nature}
              />

              <Localisation
                address={props.data.address}
                language={props.language}
              />

              <History
                creationYear={props.data.creationYear}
                id={props.data.id}
                language={props.language}
                predecessors={props.data.predecessors}
              />

              <Leaders
                id={props.data.id}
                language={props.language}
                leaders={props.data.leaders}
              />

              <ExpertiseField
                id={props.data.id}
                language={props.language}
              />

              <Web
                id={props.data.id}
                language={props.language}
                socialMedias={props.data.socialMedias}
                websites={props.data.websites}
                links={props.data.links}
                externalIds={props.data.externalIds || []}
              />
              {
                /*
                <SocialNetworksFlow
                  id={props.data.id}
                  language={props.language}
                  socialMedias={props.data.socialMedias}
                  externalIds={props.data.externalIds || []}
                />
                */
              }
            </div>
          </div>
        </section>
      </Fragment>
    </IntlProvider>
  );
};

export default Portrait;

Portrait.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
