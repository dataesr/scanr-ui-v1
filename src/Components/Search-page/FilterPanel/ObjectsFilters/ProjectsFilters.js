import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';


const ProjectsFilters = (props) => {
  const facets = props.facets || [];
  const geoFacets = facets.find(item => item.id === 'facet_localisations') || { entries: [] };
  const typeActiveFilters = props.filters.type || {};
  const typeFacets = facets.find(item => item.id === 'facet_projects_types') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title="Localisation"
          subtitle="d'au moins un des participants..."
          placeholder="Chez wam"
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="participants.structure.address.localisationSuggestions"
        />
        <CheckBoxFilter
          title="Type de financement"
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="type"
          onSubmit={props.multiValueFilterHandler}
        />
      </div>
    </div>
  );
};

export default ProjectsFilters;

ProjectsFilters.propTypes = {
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
