import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchResults.scss';
import EntityCard from './ResultCards/EntityCard';
import EntityGraphs from './ResultGraphs/EntityGraphs';
import PersonCard from './ResultCards/PersonCard';
import PublicationCard from './ResultCards/PublicationCard';
import ProjectCard from './ResultCards/ProjectCard';

const ResultsToShow = {
  all: {
    list: EntityCard,
    graph: EntityGraphs,
  },
  structures: {
    list: EntityCard,
    graph: EntityGraphs,
  },
  projects: {
    list: ProjectCard,
    graph: EntityCard,
  },
  persons: {
    list: PersonCard,
    graph: EntityCard,
  },
  publications: {
    list: PublicationCard,
    graph: EntityCard,
  },
};

const SearchResults = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const ToShow = ResultsToShow[props.api][props.view];
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className="row d-flex flex-column">
        <div className={`ml-1 mb-2 ${classes.ActiveFiltersContainer}`}>
          <div className={`p-3 ${classes.ResultHeader}`}>
            <span>
              {`${props.data.total} `}
            </span>
            <span>
              <FormattedHTMLMessage
                id={`searchResults.${props.api}`}
                defaultMessage={`searchResults.${props.api}`}
              />
            </span>
          </div>
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-between ml-1">
          {
            <ToShow
              language={props.language}
              results={props.data.results}
              facets={props.data.facets}
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
  api: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  data: PropTypes.object,
};
