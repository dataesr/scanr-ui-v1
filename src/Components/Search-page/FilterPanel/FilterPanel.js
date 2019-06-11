import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './FilterPanel.scss';

import EntityFilters from './ObjectsFilters/EntityFilters';
import PersonsFilters from './ObjectsFilters/PersonsFilters';
import ProjectsFilters from './ObjectsFilters/ProjectsFilters';
import PublicationsFilters from './ObjectsFilters/PublicationsFilters';
import ActiveFilterCard from './ActiveFilterCard/ActiveFilterCard';

const ResultsToShow = {
  structures: EntityFilters,
  projects: ProjectsFilters,
  persons: PersonsFilters,
  publications: PublicationsFilters,
};

const FilterPanel = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  const ToShow = ResultsToShow[props.api];

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="row d-flex flex-column">
        <ActiveFilterCard
          language={props.language}
          filters={props.filters}
          multiValueFilterHandler={props.multiValueFilterHandler}
        />
        <div className={`p-3 mb-2 mr-1 ${classes.FiltersContainer}`}>
          <div className={classes.FilterHeaders}>
            <FormattedHTMLMessage id="filterPanel.filterBy" defaultMessage="filterPanel.filterBy" />
          </div>
          <ToShow
            language={props.language}
            facets={props.facets}
            generalFacets={props.generalFacets}
            filters={props.filters}
            multiValueFilterHandler={props.multiValueFilterHandler}
          />
        </div>
      </div>
    </IntlProvider>
  );
};

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
  api: PropTypes.string.isRequired,
};
