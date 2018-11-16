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
        newField="Ajouter un nouvel email"
        schemaName="emails"
        url={props.url}
        title="Emails"
      />
    </div>

    <div className="column is-6">
      <GridFields
        data={props.phones}
        description={PhonesDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun téléphone actif"
        newField="Ajouter un nouveau téléphone"
        schemaName="phones"
        url={props.url}
        title="Téléphones"
      />
    </div>

    <div className="column is-6">
      <GridFields
        data={props.social_medias}
        description={SocialMediasDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun réseau social"
        newField="Ajouter un nouveau réseau social"
        schemaName="social_medias"
        url={props.url}
        title="Réseaux sociaux"
      />
    </div>
    <div className="column is-6">
      <GridFields
        data={props.websites}
        description={WebsitesDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun site internet"
        newField="Ajouter un nouveau site internet"
        schemaName="websites"
        url={props.url}
        title="Sites internet"
      />
    </div>
    <div className="column is-6">
      <GridFields
        data={props.external_links}
        description={ExternalLinksDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun lien externe"
        newField="Ajouter un nouveau lien externe"
        schemaName="external_links"
        url={props.url}
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
  url: PropTypes.string,
  websites: PropTypes.array,
};
