import React from 'react';
/* eslint-disable */
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';
import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';


const PublicationsFilters = (props) => {
  if (!props.facets || props.facets.length === 0) {
    return (<div className="d-flex flex-column mt-1 mb-3 pr-3" />)
  }

  const typeActiveFilters = props.filters.productionType || {};
  const typeFacets = props.facets.find(item => item.id === 'facet_production_types') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <CheckBoxFilter
          title="Type"
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="productionType"
          onSubmit={props.multiValueFilterHandler}
        />
      </div>
    </div>
  );
};

export default PublicationsFilters;

PublicationsFilters.propTypes = {
  // language: PropTypes.string.isRequired,
  // multiValueFilterHandler: PropTypes.func,
  // facets: PropTypes.array,
  // generalFacets: PropTypes.array,
  // filters: PropTypes.object,
};
