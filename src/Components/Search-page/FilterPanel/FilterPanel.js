import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './FilterPanel.scss';


const FilterPanel = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`row ${classes.Section}`}>
        <div className={`col-12 ${classes.ActiveFiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.activeFilters" defaultMessage="filterPanel.activeFilters" />
            <span> - (count)</span>
          </div>
        </div>
        <div className={`col-12 ${classes.FiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.filterBy" defaultMessage="filterPanel.filterBy" />
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  currentQueryObject: PropTypes.string,
  currentQueryFilters: PropTypes.object,
};
