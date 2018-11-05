import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import NameDescription from '../../../../../config/descriptions/structure/names';
import EmailsDescription from '../../../../../config/descriptions/structure/emails';
import PhonesDescription from '../../../../../config/descriptions/structure/phones';
import SocialMediasDescription from '../../../../../config/descriptions/structure/socialMedias';

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
  </div>
);

export default Main;

Main.propTypes = {
  alias: PropTypes.array,
  codeNumbers: PropTypes.array.isRequired,
  emails: PropTypes.array,
  names: PropTypes.array.isRequired,
  phones: PropTypes.array.isRequired,
  social_medias: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired,
};
