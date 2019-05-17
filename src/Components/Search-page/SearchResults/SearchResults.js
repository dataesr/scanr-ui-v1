import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchResults.scss';
import EntityCard from './ResultCards/EntityCard'
import PersonCard from './ResultCards/PersonCard'
import PublicationCard from './ResultCards/PublicationCard'
import ProjectCard from './ResultCards/ProjectCard'

const ResultsToShow = {
  all: {
    list: EntityCard,
    visualization: EntityCard,
  },
  entities: {
    list: EntityCard,
    visualization: EntityCard,
  },
  projects: {
    list: ProjectCard,
    visualization: EntityCard,
  },
  persons: {
    list: PersonCard,
    visualization: EntityCard,
  },
  publications: {
    list: PublicationCard,
    visualization: EntityCard,
  },
}

const isEven = (value) => {
  if (value % 2 === 0) {
    return classes.cardIsLeft;
  }
  return classes.cardIsRight;
};

const SearchResults = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const ToShow = ResultsToShow[props.currentQueryObject][props.currentResultView];
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={`row ${classes.Section}`}>
        <div className={`col-12 ${classes.ActiveFiltersContainer}`}>
          <div className={classes.ResultHeader}>
            <span>(count) </span>
            <FormattedHTMLMessage id="searchResults.objectType" defaultMessage="searchResults.objectType" />
          </div>
        </div>
        <div className={`col-12 ${classes.ResultCardsContainer}`}>
          <div className="row">
            {
              <ToShow
                language={props.language}
                resultsData={props.resultsData}
              />
            }
          </div>
        </div>
      </section>
    </IntlProvider>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  language: PropTypes.string.isRequired,
  currentQueryObject: PropTypes.string,
  currentResultView: PropTypes.string,
  currentQueryFilters: PropTypes.object,
  resultsData: PropTypes.object,
};
