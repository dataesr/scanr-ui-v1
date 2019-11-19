import React from 'react';
/* eslint-disable */
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';
import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';
import YearRangeSlider from '../../../Shared/YearRangeSlider/YearRangeSlider';
import styles from '../../../../style.scss';

const PublicationsFilters = (props) => {
  if (!props.facets || props.facets.length === 0) {
    return (<div className="d-flex flex-column mt-1 mb-3 pr-3" />)
  }

  const typeActiveFilters = props.filters.productionType || {};
  const typeFacets = props.facets.find(item => item.id === 'facet_production_types') || { entries: [] };
  console.log(props.filters);
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
        <YearRangeSlider
          data={props.sliderData}
          barColor={styles.productionColor}
          label={props.language === 'fr' ? 'Selection par années' : 'Selection by year'}
          min={(props.filters.publicationDate) ? parseInt(props.filters.publicationDate.min.slice(0, 4), 10) : 2000}
          max={(props.filters.publicationDate) ? parseInt(props.filters.publicationDate.max.slice(0, 4), 10) : new Date().getFullYear()}
          minBound={2000}
          maxBound={new Date().getFullYear()}
          handleSliderRange={props.rangeFilterHandler}
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
