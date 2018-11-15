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
        url={props.url}
        title="Dirigeant"
      />
    </div>
  </div>
);

export default Leaders;

Leaders.propTypes = {
  getStructure: PropTypes.func,
  leaders: PropTypes.array,
  url: PropTypes.string,
};
