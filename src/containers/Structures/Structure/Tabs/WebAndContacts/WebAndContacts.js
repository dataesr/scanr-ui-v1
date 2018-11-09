import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import EmailsDescription from '../../../../../config/descriptions/structure/emails';
import ExternalLinksDescription from '../../../../../config/descriptions/structure/externalLinks';
import PhonesDescription from '../../../../../config/descriptions/structure/phones';
import SocialMediasDescription from '../../../../../config/descriptions/structure/socialMedias';
import WebsitesDescription from '../../../../../config/descriptions/structure/websites';
// Composants UI
import GridFields from '../../../../Fields/GridFields/GridFields';

const WebAndContacts = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column  is-6">
      <GridFields
        data={props.emails}
        description={EmailsDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun email actif"
        label="email"
        schemaName="emails"
        url={`structures/${props.structureId}`}
        title="Emails"
      />
    </div>

    <div className="column is-6">
      <GridFields
        data={props.phones}
        description={PhonesDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun téléphone actif"
        label="téléphone"
        schemaName="phones"
        url={`structures/${props.structureId}`}
        title="Téléphones"
      />
    </div>

    <div className="column is-6">
      <GridFields
        data={props.social_medias}
        description={SocialMediasDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun réseau social"
        label="réseau social"
        schemaName="social_medias"
        url={`structures/${props.structureId}`}
        title="Réseaux sociaux"
      />
    </div>
    <div className="column is-6">
      <GridFields
        data={props.websites}
        description={WebsitesDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun site internet"
        label="site internet"
        schemaName="websites"
        url={`structures/${props.structureId}`}
        title="Sites internet"
      />
    </div>
    <div className="column is-6">
      <GridFields
        data={props.external_links}
        description={ExternalLinksDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun lien externe"
        label="lien externe"
        schemaName="external_links"
        url={`structures/${props.structureId}`}
        title="Liens externes"
      />
    </div>

  </div>
);

export default WebAndContacts;

WebAndContacts.propTypes = {
  external_links: PropTypes.array,
  emails: PropTypes.array,
  getStructure: PropTypes.func,
  phones: PropTypes.array,
  social_medias: PropTypes.array,
  structureId: PropTypes.string,
  websites: PropTypes.array,
};
