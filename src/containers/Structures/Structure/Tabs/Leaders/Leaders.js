import React from 'react';
import PropTypes from 'prop-types';

import GridFields from '../../../../Fields/GridFields/GridFields';
import leadersDescription from '../../../../../config/descriptions/structure/leaders';

const Leaders = props => (
  <div className="columns is-marginless">
    <div className="column is-full">
      <GridFields
        data={props.leaders}
        description={leadersDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucun dirigeant renseigné"
        newField="Ajouter un nouveau badge"
        schemaName="leaders"
        typesList={props.types.rank}
        title="Dirigeant"
        url={props.url}
      />
    </div>
  </div>
);

export default Leaders;

Leaders.propTypes = {
  getStructure: PropTypes.func,
  leaders: PropTypes.array,
  types: PropTypes.object,
  url: PropTypes.string,
};
