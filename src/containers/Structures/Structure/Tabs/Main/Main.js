import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import NameDescription from '../../../../../config/descriptions/structure/names';
import EmailsDescription from '../../../../../config/descriptions/structure/emails';

// Composants UI
import Aux from '../../../../../hoc/Aux';
import GridFields from '../../../../Fields/GridFields/GridFields';
import TagField from '../../../../Fields/TagField/TagField';

const Main = props => (
  <Aux>
    <div className="column">
      <GridFields
        data={props.names}
        description={NameDescription}
        getStructure={props.getStructure}
        infoMessage="Aucun libellé actif"
        label="libellé"
        schemaName="names"
        structureId={props.structureId}
        title="Libellés"
      />
    </div>
    <div className="columns is-marginless">
      <div className="column">
        <TagField
          data={props.alias}
          infoMessage="Ajouter un alias"
          getStructure={props.getStructure}
          schemaName="alias"
          structureId={props.structureId}
          title="Alias"
        />
      </div>
      <div className="column">
        <TagField
          data={props.codeNumbers}
          infoMessage="Ajouter un code"
          getStructure={props.getStructure}
          schemaName="code_numbers"
          structureId={props.structureId}
          title="Codes"
        />
      </div>
    </div>
    <div className="columns is-marginless">
      <div className="column">
        <GridFields
          data={props.emails}
          description={EmailsDescription}
          getStructure={props.getStructure}
          infoMessage="Aucun email actif"
          label="email"
          schemaName="emails"
          structureId={props.structureId}
          title="Liste des emails"
        />
      </div>
      <div className="column">
      </div>
    </div>
  </Aux>
);

export default Main;

Main.propTypes = {
  alias: PropTypes.array,
  codeNumbers: PropTypes.array.isRequired,
  emails: PropTypes.array,
  names: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
  getStructure: PropTypes.func.isRequired,
};
