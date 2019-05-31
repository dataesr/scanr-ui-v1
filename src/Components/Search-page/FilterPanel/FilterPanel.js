import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './FilterPanel.scss';
import EntityFilters from './ObjectsFilters/EntityFilters';

const FilterPanel = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const filters = (props.filters) ? props.filters : {};

  const activeFilters = Object.keys(filters).map(key => (
    filters[key].values.map(value => (
      <button
        type="button"
        key={key}
        className="badge badge-pill badge-primary p-1 m-1"
        onClick={() => props.deleteMultiValueSearchFilter(key, value)}
      >
        <div className=" justify-content-start">
          {value}
        </div>
      </button>
    ))
  ));
  // const activeFilters = getActiveFilters();
  // console.log(activeFilters);


  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="row d-flex flex-column">
        <div className={`p-3 mb-2 mr-1 ${classes.ActiveFiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.activeFilters" defaultMessage="filterPanel.activeFilters" />
            <span> - (count)</span>
          </div>
          <div className={classes.FilterHeaders}>
            <div className="d-flex flex-column mt-2 mb-2 p-1">
              {activeFilters}
            </div>
          </div>
        </div>
        <div className={`p-3 mb-2 mr-1 ${classes.FiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.filterBy" defaultMessage="filterPanel.filterBy" />
          </div>
          <EntityFilters
            language={props.language}
            facets={props.facets}
            addMultiValueSearchFilter={props.addMultiValueSearchFilter}
            deleteFilter={props.deleteFilter}
            filters={props.filters}
          />
        </div>
      </div>
    </IntlProvider>
  );
};

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  addMultiValueSearchFilter: PropTypes.func,
  deleteMultiValueSearchFilter: PropTypes.func,
  facets: PropTypes.array,
  filters: PropTypes.object,
};
