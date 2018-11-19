import React from 'react';
import PropTypes from 'prop-types';

import GridFields from '../../../../Fields/GridFields/GridFields';
import supervisorsDescription from '../../../../../config/descriptions/structure/supervisors';

const Supervisors = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-full">
      <GridFields
        data={props.supervisors}
        description={supervisorsDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucune tutelle référencée"
        newField="Ajouter un nouvelle tutelle"
        schemaName="supervisors"
        typesList={props.types.supervision_type}
        url={props.url}
        title="Tutelles"
      />
    </div>
  </div>);

export default Supervisors;

Supervisors.propTypes = {
  getStructure: PropTypes.func,
  supervisors: PropTypes.array,
  types: PropTypes.object,
  url: PropTypes.string,
};
