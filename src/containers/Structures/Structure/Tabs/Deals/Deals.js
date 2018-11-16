import React from 'react';
import PropTypes from 'prop-types';

import GridFields from '../../../../Fields/GridFields/GridFields';
import offersDescription from '../../../../../config/descriptions/structure/offers';

const Deals = props => (
  <div className="columns is-multiline is-marginless">
    <div className="column is-full">
      <GridFields
        data={props.offers}
        description={offersDescription}
        refreshFunction={props.getStructure}
        infoMessage="Aucune offre active"
        newField="Ajouter un nouvelle offre"
        schemaName="offers"
        url={props.url}
        title="Offres"
      />
    </div>
  </div>);

export default Deals;

Deals.propTypes = {
  getStructure: PropTypes.func,
  offers: PropTypes.array,
  url: PropTypes.string,
};
