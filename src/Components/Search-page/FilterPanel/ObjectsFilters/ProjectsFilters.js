import React from 'react';
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';


const ProjectsFilters = (props) => {
  const typeFacets = props.facets.find(item => item.id === 'facet_types') || { entries: [] };
  // const geoFacets = props.facets.find(item => item.id === 'facet_urban_hits') || { entries: [] };
  // const allGeo = {};
  // geoFacets.map((item) => {
  //   allGeo[item.value.normalize()] = item;
  // });
  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <SelectFilter
          language={props.language}
          addMultiValueSearchFilter={props.addMultiValueSearchFilter}
          facetData={typeFacets}
          facetName="nature"
          facetId="nature"
        />
      </div>
    </div>
  );
};

export default ProjectsFilters;

ProjectsFilters.propTypes = {
  language: PropTypes.string.isRequired,
  addMultiValueSearchFilter: PropTypes.func,
  addGeoFilter: PropTypes.func,
  // deleteMultiValueSearchFilter: PropTypes.func,
  facets: PropTypes.array,
};
