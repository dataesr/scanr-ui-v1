import React from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '../../../Shared/Autocomplete/Autocomplete';

import SelectFilter from './Filters/SelectFilter';


const EntityFilters = (props) => {
  const typeFacets = props.facets.find(item => item.id === 'facet_natures') || { entries: [] };
  const caractFacets = props.facets.find(item => item.id === 'facet_badges') || { entries: [] };
  const geoFacets = props.generalFacets.find(item => item.id === 'facet_urban_hits') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title="Localisation"
          subtitle="régions, départements, communes..."
          placeholder="Chez wam"
          onSubmit={props.addMultiValueSearchFilter}
          facets={geoFacets.entries}
          facetID="address.urbanUnitLabel"
        />
        <SelectFilter
          title="Type d'organisme"
          facets={typeFacets.entries}
          facetID="nature"
          onSubmit={props.addMultiValueSearchFilter}
        />
        <SelectFilter
          title="Caractéristiques"
          facets={caractFacets.entries}
          facetID="badges.label.fr"
          onSubmit={props.addMultiValueSearchFilter}
        />
      </div>
    </div>
  );
};

export default EntityFilters;

EntityFilters.propTypes = {
  language: PropTypes.string.isRequired,
  addMultiValueSearchFilter: PropTypes.func,
  addGeoFilter: PropTypes.func,
  // deleteMultiValueSearchFilter: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
};
