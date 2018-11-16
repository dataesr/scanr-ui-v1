import React from 'react';
import PropTypes from 'prop-types';

import parentsDescription from '../../../../../config/descriptions/structure/parents';
import predecessorsDescription from '../../../../../config/descriptions/structure/predecessors';
import relationsDescription from '../../../../../config/descriptions/structure/relations';
import GridFields from '../../../../Fields/GridFields/GridFields';

const relationship = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-full">
      <GridFields
        data={props.parents}
        description={parentsDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun parent actif"
        newField="Ajouter un nouveau parent"
        schemaName="parents"
        url={props.url}
        title="Parents"
      />
    </div>
    <div className="column is-full">
      <GridFields
        data={props.predecessors}
        description={predecessorsDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun prédécesseur renseigné"
        newField="Ajouter un nouveau prédecesseur"
        schemaName="predecessors"
        typesList={props.types.succession_type}
        url={props.url}
        title="Prédecesseurs"
      />
    </div>
    <div className="column is-full">
      <GridFields
        data={props.relations}
        description={relationsDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucune relation renseignée"
        newField="Ajouter une nouvelle relation"
        schemaName="relations"
        typesList={props.types.relation_type}
        url={props.url}
        title="Relations"
      />
    </div>
  </div>);

export default relationship;

relationship.propTypes = {
  getStructure: PropTypes.func,
  parents: PropTypes.array,
  predecessors: PropTypes.array,
  relations: PropTypes.array,
  types: PropTypes.object,
  url: PropTypes.string,
};
