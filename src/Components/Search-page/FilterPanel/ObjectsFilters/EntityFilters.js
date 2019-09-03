import React from 'react';
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';
import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';


const EntityFilters = (props) => {
  const facets = props.facets || [];
  const generalFacets = props.generalFacets || [];
  const caractActiveFilters = props.filters['badges.label.fr'] || {};
  const natureActiveFilters = props.filters.nature || {};
  const tutellesActiveFilters = props.filters.level || {};
  const tutellesFacets = facets.find(item => item.id === 'facet_institutions') || { entries: [] };
  const natureFacets = generalFacets.find(item => item.id === 'facet_natures') || { entries: [] };
  const caractFacetsTest = facets.find(item => item.id === 'facet_badges') || { entries: [] };
  const geoFacets = facets.find(item => item.id === 'facet_localisations') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title="Localisation"
          subtitle="régions, départements, communes..."
          placeholder="Chez wam"
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="address.localisationSuggestions"
        />
        <CheckBoxFilter
          title="Type d'organisme"
          facets={natureFacets.entries}
          filters={natureActiveFilters}
          facetID="nature"
          onSubmit={props.multiValueFilterHandler}
        />
        <CheckBoxFilter
          title="Type de financement public"
          facets={tutellesFacets.entries}
          filters={tutellesActiveFilters}
          facetID="institutions.structure.label.fr"
          onSubmit={props.multiValueFilterHandler}
        />
        <CheckBoxFilter
          title="Caractéristiques"
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
  // language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  // deleteMultiValueSearchFilter: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
