import React from 'react';
import PropTypes from 'prop-types';

// Descriptions
import AffiliationsDescription from '../../../../../config/descriptions/person/affiliationsDescription';

// Composants UI
import GridFields from '../../../../Fields/GridFields/GridFields';

const Main = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-12">
      <GridFields
        data={props.affiliations_info}
        description={AffiliationsDescription}
        refreshFunction={props.getPerson}
        infoMessage="Aucune affiliation"
        newField="Ajouter une nouvelle affiliation"
        schemaName="affiliations_info"
        url={props.url}
        title="Affiliations (infos brutes)"
      />
    </div>
  </div>
);

export default Main;

Main.propTypes = {
  getPerson: PropTypes.func,
  affiliations_info: PropTypes.array,
  url: PropTypes.string,
};
