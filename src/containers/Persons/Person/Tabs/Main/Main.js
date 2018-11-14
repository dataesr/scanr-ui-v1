import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import BadgesDescription from '../../../../../config/descriptions/structure/badges';
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
        newField="Ajouter un nouveau libellé"
        schemaName="names"
        url={props.url}
        title="Libellés"
      />
    </div>

    <div className="column is-6">
      <TagField
        data={props.alias}
        infoMessage="Ajouter un alias"
        getStructure={props.getStructure}
        schemaName="alias"
        structureId={props.id}
        title="Alias"
      />
    </div>

    <div className="column is-6">
      <TagField
        data={props.codeNumbers}
        infoMessage="Ajouter un code"
        getStructure={props.getStructure}
        schemaName="code_numbers"
        structureId={props.id}
        title="Codes"
      />
    </div>
    <div className="column is-5">
      <GridFields
        data={props.badges}
        description={BadgesDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun badge actif"
        newField="Ajouter un nouveau badge"
        schemaName="badges"
        url={props.url}
        title="Badges"
      />
    </div>
    <div className="column is-7">
      <GridFields
        data={props.descriptions}
        description={Descriptions}
        refreshFunction={props.getStructure}
        infoMessage="Aucune description"
        newField="Ajouter une nouvelle description"
        schemaName="descriptions"
        url={props.url}
        title="Descriptions"
      />
    </div>
  </div>
);

export default Main;

Main.propTypes = {
  alias: PropTypes.array,
  badges: PropTypes.array,
  codeNumbers: PropTypes.array,
  descriptions: PropTypes.array,
  getStructure: PropTypes.func,
  id: PropTypes.string,
  names: PropTypes.array,
  url: PropTypes.string,
};
