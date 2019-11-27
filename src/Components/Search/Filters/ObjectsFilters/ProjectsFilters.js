import React from 'react';
import PropTypes from 'prop-types';

import CheckBoxFilter from './Filters/CheckBoxFilter';
import Autocomplete from './Filters/Autocomplete';
import YearRangeSlider from '../../../Shared/YearRangeSlider/YearRangeSlider';
import styles from '../../../../style.scss';
/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const ProjectsFilters = (props) => {
  const facets = props.facets || [];
  const generalFacets = props.generalFacets || [];
  const geoFacets = facets.find(item => item.id === 'localisations') || { entries: [] };
  const typeActiveFilters = props.filters.type || {};
  const typeFacets = generalFacets.find(item => item.id === 'types') || { entries: [] };
  const domainsFacets = facets.find(item => item.id === 'domains') || { entries: [] };

  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <Autocomplete
          title={messages[props.language]['filters.localisation']}
          subtitle={messages[props.language]['filters.subtitle']}
          placeholder=""
          onSubmit={props.multiValueFilterHandler}
          facets={geoFacets.entries}
          facetID="participants.structure.address.localisationSuggestions"
        />
        <hr
          style={{
            height: '2px',
            color: styles.projectsColor,
            backgroundColor: styles.projectsColor,
          }}
        />
        <CheckBoxFilter
          defaultActive
          retractable={false}
          nbItemsToShow={10}
          title="Type de financement"
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="type"
          onSubmit={props.multiValueFilterHandler}
        />
        <hr
          style={{
            height: '2px',
            color: styles.projectsColor,
            backgroundColor: styles.projectsColor,
          }}
        />
        <CheckBoxFilter
          defaultActive
          retractable={false}
          title="Actions"
          facets={domainsFacets.entries}
          filters={typeActiveFilters}
          facetID="domains.label.default"
          onSubmit={props.multiValueFilterHandler}
        />
        <hr
          style={{
            height: '2px',
            color: styles.projectsColor,
            backgroundColor: styles.projectsColor,
          }}
        />
        <YearRangeSlider
          data={props.sliderData}
          barColor={styles.projectsColor}
          height={60}
          label={props.language === 'fr' ? 'Selection par années' : 'Select by year'}
          min={(props.filters.year) ? props.filters.year.min : null}
          max={(props.filters.year) ? (props.filters.year.max - 1) : null}
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
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  sliderData: PropTypes.array,
  rangeFilterHandler: PropTypes.func,
  filters: PropTypes.object,
};
