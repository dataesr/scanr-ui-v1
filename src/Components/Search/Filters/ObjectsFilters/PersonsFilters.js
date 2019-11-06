import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';


const PersonsFilters = (props) => {
  const facets = props.facets || [];
  const geoFacets = facets.find(item => item.id === 'facet_localisations') || { entries: [] };
  const structActiveFilters = props.filters['affiliations.structure.label.fr'] || {};
  const structFacets = facets.find(item => item.id === 'facet_affiliation_structure_label') || { entries: [] };
  const awardsActiveFilters = props.filters.awards || {};
  const awardsFacets = facets.find(item => item.id === 'facet_awards') || { entries: [] };
  const badgesActiveFilters = props.filters.badges || {};
  const badgesFacets = facets.find(item => item.id === 'facet_badges') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title="Localisation"
          subtitle="d'au moins l'une des affiliations..."
          placeholder="Chez wam"
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="affiliations.structure.address.localisationSuggestions"
        />
        <CheckBoxFilter
          title="Affiliation"
          facets={structFacets.entries}
          filters={structActiveFilters}
          facetID="affiliations.structure.label.fr"
          onSubmit={props.multiValueFilterHandler}
        />
        <CheckBoxFilter
          title="Prix et distinction"
          facets={awardsFacets.entries}
          filters={awardsActiveFilters}
          facetID="awards"
          onSubmit={props.multiValueFilterHandler}
        />
        <CheckBoxFilter
          title="Caractéristique"
          facets={badgesFacets.entries}
          filters={badgesActiveFilters}
          facetID="badges"
          onSubmit={props.multiValueFilterHandler}
        />
      </div>
    </div>
  );
};

export default PersonsFilters;

PersonsFilters.propTypes = {
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  filters: PropTypes.object,
};
