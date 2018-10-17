import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import NameDescription from '../../../../config/descriptions/structure/names';

// Composants UI
import Aux from '../../../../hoc/Aux';
import GridFields from '../Fields/GridFields/GridFields';

const Main = props => (
  <Aux>
    <GridFields
      addNewLabel="Ajouter un nouveau libellé"
      data={props.names}
      schemaName="names"
      description={NameDescription}
      title="Liste des libellés"
      structureId={props.structureId}
    />
    <GridFields
      addNewLabel="Ajouter un nouveau libellé2"
      data={props.names}
      schemaName="names"
      description={NameDescription}
      title="Liste des libellés"
      structureId={props.structureId}
    />
  </Aux>
);

export default Main;

Main.propTypes = {
  names: PropTypes.array.isRequired,
  structureId: PropTypes.string.isRequired,
};
