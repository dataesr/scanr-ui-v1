import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import BadgesDescription from '../../../../../config/descriptions/structure/badges';
import Descriptions from '../../../../../config/descriptions/structure/descriptions';
import EvaluationsDescription from '../../../../../config/descriptions/structure/evaluations';
import ExternalIdsDescriptions from '../../../../../config/descriptions/structure/external_ids';
import NameDescription from '../../../../../config/descriptions/structure/names';
// Composants UI
import GridFields from '../../../../Fields/GridFields/GridFields';
import TagField from '../../../../Fields/TagField/TagField';

const Main = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-6">
      <GridFields
        data={props.external_ids}
        description={ExternalIdsDescriptions}
        refreshFunction={props.getStructure}
        infoMessage="Aucun identifiant externe"
        newField="Ajouter un nouvel identifiant"
        schemaName="external_ids"
        typesList={props.types.id_type}
        url={props.url}
        title="Identifiants externes"
      />
    </div>
    <div className="column is-6">
      Infos statiques de l onglet résumé
    </div>
    <div className="column is-12">
      <GridFields
        data={props.names}
        description={NameDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun libellé"
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
        data={props.code_numbers}
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
        data={props.evaluations}
        description={EvaluationsDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucune évaluation"
        newField="Ajouter une nouvelle évaluation"
        schemaName="evaluations"
        url={props.url}
        title="Evaluations"
      />
    </div>
    <div className="column is-12">
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
  code_numbers: PropTypes.array,
  descriptions: PropTypes.array,
  evaluations: PropTypes.array,
  external_ids: PropTypes.array,
  getStructure: PropTypes.func,
  id: PropTypes.string,
  names: PropTypes.array,
  types: PropTypes.object,
  url: PropTypes.string,
};
