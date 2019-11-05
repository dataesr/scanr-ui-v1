import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';
import Pagination from './Pagination/Pagination';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchResults.scss';
import EntityGraphsWrapper from './ResultGraphs/EntityGraphsWrapper';
import ProjectsGraphsWrapper from './ResultGraphs/ProjectsGraphsWrapper';
import PublicationsGraphsWrapper from './ResultGraphs/PublicationsGraphsWrapper';
import PersonsGraphsWrapper from './ResultGraphs/PersonsGraphsWrapper';
import EntityCard from './ResultCards/EntityCard';
import PersonCard from './ResultCards/PersonCard';
import PublicationCard from './ResultCards/PublicationCard';
import ProjectCard from './ResultCards/ProjectCard';

const ResultsToShow = {
  structures: {
    list: EntityCard,
    graph: EntityGraphsWrapper,
  },
  projects: {
    list: ProjectCard,
    graph: ProjectsGraphsWrapper,
  },
  persons: {
    list: PersonCard,
    graph: PersonsGraphsWrapper,
  },
  publications: {
    list: PublicationCard,
    graph: PublicationsGraphsWrapper,
  },
};

const SearchResults = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const ToShow = ResultsToShow[props.api][props.view];
  const scanRcolor = '#3778bb';
  let pagination = null;
  const numResults = (props.data.total < 2) ? 'searchResults.result' : 'searchResults.results';
  if (props.view === 'list' && props.api !== 'all') {
    pagination = (
      <Pagination
        language={props.language}
        data={props.data}
        paginationHandler={props.paginationHandler}
        currentPage={parseInt(props.request.page, 0)}
        currentPageSize={parseInt(props.request.pageSize, 0)}
        totalDocuments={parseInt(props.data.total, 0)}
      />
    );
  }
  if (props.isLoading) {
    return (
      <div className="row justify-content-center pt-5 mt-5">
        <GridLoader
          color={scanRcolor}
          loading={props.isLoading}
        />
      </div>
    );
  }
  const RenderResults = () => {
    if (props.view === 'list') {
      return (
        props.data.results.map(res => (
          <div className={classes.card} key={res.value.id}>
            <ToShow
              data={res.value}
              highlights={res.highlights}
              language={props.language}
            />
          </div>
        ))
      );
    }
    return (
      <ToShow
        language={props.language}
        request={props.request}
      />
    );
  };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className="d-flex flex-column">
        <div className={`mb-2 ${classes.ActiveFiltersContainer}`}>
          <div className={`p-3 ${classes.ResultHeader}`}>
            <span>
              {`${props.data.total} `}
            </span>
            <span>
              <FormattedHTMLMessage
                id={numResults}
                defaultMessage={numResults}
              />
            </span>
          </div>
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {RenderResults()}
        </div>
        <div className="pl-3 pr-3">
          {pagination}
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
  isLoading: PropTypes.bool,
  request: PropTypes.object,
  paginationHandler: PropTypes.func,
};
