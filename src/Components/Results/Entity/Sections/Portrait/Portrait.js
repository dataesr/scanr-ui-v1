import React from 'react';
import PropTypes from 'prop-types';

import ExpertiseField from './subComponents/ExpertiseField/ExpertiseField';
import History from './subComponents/History/History';
import Identity from './subComponents/Identity/Identity';
import Leaders from '../../Shared/Leaders/Leaders';
import Localisation from './subComponents/Localisation/Localisation';
import Web from './subComponents/Web/Web';
// import SocialNetworksFlow from './subComponents/SocialNetworksFlow/SocialNetworksFlow';

/**
 * Portrait
 * Url : ex: /entite/:id#Portrait
 * Description : Correspond à la section Portrait d'une entité
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Portrait = props => (
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
      id={props.id}
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
);


export default Portrait;

Portrait.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
