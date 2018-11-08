import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import Descriptions from '../../../../../config/descriptions/structure/descriptions';
import NameDescription from '../../../../../config/descriptions/structure/names';
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
  </div>
);

export default Main;

Main.propTypes = {
  alias: PropTypes.array,
  codeNumbers: PropTypes.array,
  descriptions: PropTypes.array,
  getStructure: PropTypes.func,
  names: PropTypes.array,
  structureId: PropTypes.string,
};
