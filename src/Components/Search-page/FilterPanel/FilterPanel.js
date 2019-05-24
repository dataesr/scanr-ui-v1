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

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="row d-flex flex-column">
        <div className={`p-3 mb-2 mr-1 ${classes.ActiveFiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.activeFilters" defaultMessage="filterPanel.activeFilters" />
            <span> - (count)</span>
          </div>
        </div>
        <div className={`p-3 mb-2 mr-1 ${classes.FiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.filterBy" defaultMessage="filterPanel.filterBy" />
          </div>
          <EntityFilters
            language={props.language}
            facets={props.facets}
          />
        </div>
      </div>
    </IntlProvider>
  );
};

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  facets: PropTypes.array,
};
