import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchResults.scss';
import EntityCard from './ResultCards/EntityCard';
import PersonCard from './ResultCards/PersonCard';
import PublicationCard from './ResultCards/PublicationCard';
import ProjectCard from './ResultCards/ProjectCard';

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
};

const SearchResults = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const ToShow = ResultsToShow[props.objectType][props.view];
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className="row d-flex flex-column">
        <div className={`ml-1 mb-2 ${classes.ActiveFiltersContainer}`}>
          <div className={`p-3 ${classes.ResultHeader}`}>
            <span>
              {`${props.resultsCount} `}
            </span>
            <span>
              <FormattedHTMLMessage
                id={`searchResults.${props.objectType}`}
                defaultMessage={`searchResults.${props.objectType}`}
              />
            </span>
          </div>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between ml-1">
          {
            <ToShow
              language={props.language}
              results={props.results}
            />
          }
        </div>
      </section>
    </IntlProvider>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  language: PropTypes.string.isRequired,
  objectType: PropTypes.string,
  view: PropTypes.string,
  results: PropTypes.array,
  resultsCount: PropTypes.number,
};
