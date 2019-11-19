import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';
import YearRangeSlider from '../../../Shared/YearRangeSlider/YearRangeSlider';
import styles from '../../../../style.scss';

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
        <YearRangeSlider
          data={props.sliderData}
          barColor={styles.projectsColor}
          min={(props.filters.startDate) ? parseInt(props.filters.startDate.min.slice(0, 4), 10) : 2000}
          max={(props.filters.startDate) ? parseInt(props.filters.startDate.max.slice(0, 4), 10) : new Date().getFullYear()}
          minBound={2000}
          maxBound={new Date().getFullYear()}
          handleSliderRange={props.rangeFilterHandler}
        />
      </div>
    </div>
  );
};

export default ProjectsFilters;

ProjectsFilters.propTypes = {
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  sliderData: PropTypes.array,
  rangeFilterHandler: PropTypes.func,
  filters: PropTypes.object,
};
