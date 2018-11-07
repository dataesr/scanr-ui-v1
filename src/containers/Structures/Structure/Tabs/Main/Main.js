import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import Descriptions from '../../../../../config/descriptions/structure/descriptions';
import EmailsDescription from '../../../../../config/descriptions/structure/emails';
import ExternalLinksDescription from '../../../../../config/descriptions/structure/externalLinks';
import NameDescription from '../../../../../config/descriptions/structure/names';
import PhonesDescription from '../../../../../config/descriptions/structure/phones';
import SocialMediasDescription from '../../../../../config/descriptions/structure/socialMedias';
import WebsitesDescription from '../../../../../config/descriptions/structure/websites';
// Composants UI
import GridFields from '../../../../Fields/GridFields/GridFields';
import TagField from '../../../../Fields/TagField/TagField';

const Main = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-12">
      <GridFields
        data={props.names}
        description={NameDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun libellé actif"
        label="libellé"
        schemaName="names"
        url={`structures/${props.structureId}`}
        title="Libellés"
      />
    </div>

    <div className="column is-6">
      <TagField
        data={props.alias}
        infoMessage="Ajouter un alias"
        getStructure={props.getStructure}
        schemaName="alias"
        structureId={props.structureId}
        title="Alias"
      />
    </div>

    <div className="column is-6">
      <TagField
        data={props.codeNumbers}
        infoMessage="Ajouter un code"
        getStructure={props.getStructure}
        schemaName="code_numbers"
        structureId={props.structureId}
        title="Codes"
      />
    </div>

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
    <div className="column is-12">
      <GridFields
        data={props.descriptions}
        description={Descriptions}
        refreshFunction={props.getStructure}
        infoMessage="Aucune description"
        label="description"
        schemaName="descriptions"
        url={`structures/${props.structureId}`}
        title="Descriptions"
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

export default Main;

Main.propTypes = {
  alias: PropTypes.array,
  codeNumbers: PropTypes.array.isRequired,
  descriptions: PropTypes.array,
  external_links: PropTypes.array,
  emails: PropTypes.array,
  getStructure: PropTypes.func.isRequired,
  names: PropTypes.array.isRequired,
  phones: PropTypes.array.isRequired,
  social_medias: PropTypes.array,
  structureId: PropTypes.string.isRequired,
  websites: PropTypes.array,
};
