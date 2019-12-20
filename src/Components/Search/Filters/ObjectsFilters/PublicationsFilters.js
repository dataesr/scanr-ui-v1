import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import Autocomplete from './Filters/Autocomplete';
import SelectFilter from './Filters/SelectFilter';
import CheckBoxFilter from './Filters/CheckBoxFilter';
import YearRangeSlider from '../../../Shared/YearRangeSlider/YearRangeSlider';
import styles from '../../../../style.scss';


const PublicationsFilters = (props) => {
  const facets = props.facets || [];
  const generalFacets = props.generalFacets || [];
  const typeActiveFilters = props.filters.productionType || {};
  const typeFacets = generalFacets.find(item => item.id === 'productionTypes') || { entries: [] };
  // const journalActiveFilters = props.filters['source.title'] || {};
  const journalFacets = facets.find(item => item.id === 'journal') || { entries: [] };
  const certificationsActiveFilters = props.filters['certifications.label'] || {};
  const certificationsFacets = facets.find(item => item.id === 'certifications') || { entries: [] };
  const publiTypeFacets = facets.find(item => item.id === 'types') || { entries: [] };
  const publiTypeActiveFilters = props.filters.type || {};
  const isOaActiveFilters = props.filters.isOa || {};
  const isOaFacets = facets.find(item => item.id === 'isOa') || { entries: [] };
  const typesLabels = {
    patent: <FormattedHTMLMessage id="Search.Filters.patent" />,
    publication: <FormattedHTMLMessage id="Search.Filters.publication" />,
    thesis: <FormattedHTMLMessage id="Search.Filters.thesis" />,
  };
  const isOaLabel = {
    false: <FormattedHTMLMessage id="Search.Filters.openAccess.close" />,
    true: <FormattedHTMLMessage id="Search.Filters.openAccess.open" />,
  };
  return (
    <div className="d-flex flex-column mt-1 mb-3 pr-3">
      <div className="p-2">
        <SelectFilter
          language={props.language}
          title={<FormattedHTMLMessage id="Search.Filters.productionType" />}
          facets={typeFacets.entries}
          filters={typeActiveFilters}
          facetID="productionType"
          onSubmit={props.multiValueFilterHandler}
          defaultActive
          permanentList={typesLabels}
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
          height={60}
          barColor={styles.productionColor}
          label={<FormattedHTMLMessage id="Search.Filters.yearFilter" />}
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
        {
          props.filters.productionType && (props.filters.productionType.values.includes('thesis') || props.filters.productionType.values.includes('publication'))
            ? (
              <SelectFilter
                language={props.language}
                title={<FormattedHTMLMessage id="Search.Filters.openAccess" />}
                facets={isOaFacets.entries}
                filters={isOaActiveFilters}
                permanentList={isOaLabel}
                facetID="isOa"
                onSubmit={props.multiValueFilterHandler}
                defaultActive
                request={props.request}
              />
            )
            : null
        }
        {
          props.filters.productionType && (props.filters.productionType.values.includes('patent'))
            ? (
              <CheckBoxFilter
                language={props.language}
                title={<FormattedHTMLMessage id="Search.Filters.publicationType" />}
                facets={certificationsFacets.entries}
                filters={certificationsActiveFilters}
                facetID="certifications.label"
                onSubmit={props.multiValueFilterHandler}
                defaultActive
                retractable={false}
                nbItemsToShow={3}
              />
            )
            : null
        }
        {
          props.filters.productionType && (props.filters.productionType.values.includes('publication'))
            ? (
              <React.Fragment>
                <Autocomplete
                  language={props.language}
                  title={<FormattedHTMLMessage id="Search.Filters.journal" />}
                  onSubmit={props.multiValueFilterHandler}
                  facets={journalFacets.entries}
                  facetID="source.title"
                />
                <hr
                  style={{
                    height: '2px',
                    color: styles.productionColor,
                    backgroundColor: styles.productionColor,
                  }}
                />
                <CheckBoxFilter
                  language={props.language}
                  title={<FormattedHTMLMessage id="Search.Filters.publicationType" />}
                  facets={publiTypeFacets.entries}
                  filters={publiTypeActiveFilters}
                  facetID="type"
                  onSubmit={props.multiValueFilterHandler}
                  defaultActive
                  retractable={false}
                  nbItemsToShow={6}
                />
              </React.Fragment>
            )
            : null
        }
      </div>
    </div>
  );
};

export default PublicationsFilters;

PublicationsFilters.propTypes = {
  request: PropTypes.object,
  facets: PropTypes.array,
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  rangeFilterHandler: PropTypes.func,
  sliderData: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
};
