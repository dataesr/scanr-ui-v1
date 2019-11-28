import React, { Component, Suspense, lazy } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';
import classes from './SearchResults.scss';

const Pagination = lazy(() => import('./Pagination/Pagination'));

const EntityGraphsWrapper = lazy(() => import('./ResultGraphs/EntityGraphsWrapper'));
const ProjectsGraphsWrapper = lazy(() => import('./ResultGraphs/ProjectsGraphsWrapper'));
const PublicationsGraphsWrapper = lazy(() => import('./ResultGraphs/PublicationsGraphsWrapper'));
const PersonsGraphsWrapper = lazy(() => import('./ResultGraphs/PersonsGraphsWrapper'));
const EntityCard = lazy(() => import('./ResultCards/EntityCard'));
const PersonCard = lazy(() => import('./ResultCards/PersonCard'));
const PublicationCard = lazy(() => import('./ResultCards/PublicationCard'));
const ProjectCard = lazy(() => import('./ResultCards/ProjectCard'));

class SearchResults extends Component {
  renderListResults = () => {
    const propertiesList = this.props.data.results.map((res) => {
      const properties = {
        data: res.value,
        highlights: res.highlights,
        language: this.props.language,
      };
      return properties;
    });
    switch (this.props.api) {
      case 'structures': return propertiesList.map(prop => (
        <div className={classes.card} key={prop.data.id}>
          <EntityCard {...prop} />
        </div>
      ));
      case 'persons': return propertiesList.map(prop => (
        <div className={classes.card} key={prop.data.id}>
          <PersonCard {...prop} />
        </div>
      ));
      case 'projects': return propertiesList.map(prop => (
        <div className={classes.card} key={prop.data.id}>
          <ProjectCard {...prop} />
        </div>
      ));
      case 'publications': return propertiesList.map(prop => (
        <div className={classes.card} key={prop.data.id}>
          <PublicationCard {...prop} />
        </div>
      ));
      default: return <GraphSpinner />;
    }
  };

  renderGraphResults = () => {
    const { language, request } = this.props;
    const properties = { request, language };
    switch (this.props.api) {
      case 'structures': return <EntityGraphsWrapper {...properties} />;
      case 'persons': return <PersonsGraphsWrapper {...properties} />;
      case 'projects': return <ProjectsGraphsWrapper {...properties} />;
      case 'publications': return <PublicationsGraphsWrapper {...properties} />;
      default: return <GraphSpinner />;
    }
  };

  renderPagination = () => {
    if (this.props.view === 'list') {
      return (
        <div className="pl-3 pr-3">
          <Pagination
            language={this.props.language}
            data={this.props.data}
            paginationHandler={this.props.paginationHandler}
            currentPage={parseInt(this.props.request.page, 0)}
            currentPageSize={parseInt(this.props.request.pageSize, 0)}
            totalDocuments={parseInt(this.props.data.total, 0)}
          />
        </div>
      );
    }
    return null;
  };

  renderResults = () => {
    switch (this.props.view) {
      case 'list': return this.renderListResults();
      case 'graph': return this.renderGraphResults();
      default: return <GraphSpinner />;
    }
  };

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };
    const numResults = (this.props.data.total < 2) ? 'searchResults.result' : 'searchResults.results';
    const bgColor = `${this.props.api}Color`;

    if (this.props.isLoading) {
      return <GraphSpinner />;
    }
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section className="d-flex flex-column">
          <div className={`mb-2 ${classes.ActiveFiltersContainer}`} style={{ backgroundColor: classes[bgColor] }}>
            <div className={`px-3 py-2 d-flex align-items-center ${classes.ResultHeader}`}>
              <div>
                {`${(this.props.data.total) ? this.props.data.total.toLocaleString(this.props.language) : ''} `}
              </div>
              <div>
                <FormattedHTMLMessage
                  id={numResults}
                  defaultMessage={numResults}
                />
              </div>
              <button
                onClick={this.props.handleExports}
                type="button"
                id="exportbutton"
                title="Télécharger les résultats en CSV"
                className={`ml-auto btn ${classes.btn_dark}`}
              >
                <i className="fas fa-download" />
              </button>

            </div>
          </div>
          <div className="d-flex flex-wrap justify-content-between">
            <Suspense fallback={null}>
              {this.renderResults()}
            </Suspense>
          </div>
          <Suspense fallback={null}>
            {this.renderPagination()}
          </Suspense>
        </section>
      </IntlProvider>
    );
  }
}

export default SearchResults;

SearchResults.propTypes = {
  language: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  request: PropTypes.object,
  paginationHandler: PropTypes.func,
  handleExports: PropTypes.func,
};
