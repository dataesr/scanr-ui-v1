import React from 'react';
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';
import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';


const EntityFilters = (props) => {
  const caractActiveFilters = props.filters['badges.label.fr'] || {};
  const typeActiveFilters = props.filters.nature || {};
  const typeFacets = props.facets.find(item => item.id === 'facet_natures') || { entries: [] };
  const caractFacets = props.facets.find(item => item.id === 'facet_badges') || { entries: [] };
  const caractFacetsTest = props.generalFacets.find(item => item.id === 'facet_badges') || { entries: [] };
  const geoFacets = props.generalFacets.find(item => item.id === 'facet_urban_hits') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title="Localisation"
          subtitle="régions, départements, communes..."
          placeholder="Chez wam"
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="address.urbanUnitLabel"
        />
        <SelectFilter
          title="Type d'organisme"
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="nature"
          onSubmit={props.multiValueFilterHandler}
        />
        <SelectFilter
          title="Caractéristiques"
          facets={caractFacets.entries}
          filters={caractActiveFilters}
          facetID="badges.label.fr"
          onSubmit={props.multiValueFilterHandler}
        />
        <CheckBoxFilter
          title="Tests CheckBox"
          facets={caractFacetsTest.entries}
          filters={caractActiveFilters}
          facetID="badges.label.fr"
          onSubmit={props.multiValueFilterHandler}
        />
      </div>
    </div>
  );
};

export default EntityFilters;

EntityFilters.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  // deleteMultiValueSearchFilter: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
