import React from 'react';
import PropTypes from 'prop-types';

import SelectFilter from './Filters/SelectFilter';
import YearRangeSlider from '../../../Shared/YearRangeSlider/YearRangeSlider';
import styles from '../../../../style.scss';

const PublicationsFilters = (props) => {
  // const facets = props.facets || [];
  const generalFacets = props.generalFacets || [];
  const typeActiveFilters = props.filters.productionType || {};
  const typeFacets = generalFacets.find(item => item.id === 'productionTypes') || { entries: [] };
  const isOaActiveFilters = props.filters.isOa || {};
  const isOaFacets = generalFacets.find(item => item.id === 'isOa') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <SelectFilter
          title="Type d'organisme"
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="productionType"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
          permanentList={['pattent', 'publication', 'thesis']}
          request={props.request}
        />

        <hr
          style={{
            height: '2px',
            color: styles.productionColor,
            backgroundColor: styles.productionColor,
          }}
        />
        <YearRangeSlider
          data={props.sliderData}
          barColor={styles.productionColor}
          label={props.language === 'fr' ? 'Selection par années' : 'Selection by year'}
          min={(props.filters.year) ? props.filters.year.min : null}
          max={(props.filters.year) ? (props.filters.year.max - 1) : null}
          minBound={2000}
          maxBound={new Date().getFullYear()}
          handleSliderRange={props.rangeFilterHandler}
        />
        <hr
          style={{
            height: '2px',
            color: styles.productionColor,
            backgroundColor: styles.productionColor,
          }}
        />
        <SelectFilter
          label="Open Access"
          title="Type"
          facets={isOaFacets.entries}
          filters={isOaActiveFilters}
          facetID="isOa"
          onSubmit={props.multiValueFilterHandler}
        />
      </div>
    </div>
  );
};

export default PublicationsFilters;

PublicationsFilters.propTypes = {
  request: PropTypes.object,
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  rangeFilterHandler: PropTypes.func,
  sliderData: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
