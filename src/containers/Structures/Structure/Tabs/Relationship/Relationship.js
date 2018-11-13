import React from 'react';
import PropTypes from 'prop-types';

import parentsDescription from '../../../../../config/descriptions/structure/parents';
import GridFields from '../../../../Fields/GridFields/GridFields';

const relationship = props => (
  <div className="columns is-marginless">
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
  </div>);

export default relationship;

relationship.propTypes = {
  getStructure: PropTypes.func,
  parents: PropTypes.array,
  url: PropTypes.string,
};
