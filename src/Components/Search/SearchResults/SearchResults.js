import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';

import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';
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

  renderSortOptions = () => {
    switch (this.props.api) {
      case 'structures': return (
        <React.Fragment>
          <option key="alphabetical" value="label.fr__ASC">
            {(this.props.language === 'fr') ? 'Nom' : 'Name'}
          </option>
        </React.Fragment>
      );
      case 'persons': return (
        <React.Fragment>
          <option key="alphabetical" value="lastName__ASC">
            {(this.props.language === 'fr') ? 'Nom' : 'Name'}
          </option>
        </React.Fragment>
      );
      case 'projects': return (
        <React.Fragment>
          <option key="date" value="startDate__DESC">
            {(this.props.language === 'fr') ? 'Date de début' : 'Start Date'}
          </option>
          <option key="budget" value="budgetTotal__DESC">
            {(this.props.language === 'fr') ? 'Budget' : 'Budget'}
          </option>
        </React.Fragment>
      );
      case 'publications': return (
        <React.Fragment>
          <option key="alphabetical" value="publicationDate__DESC">
            {(this.props.language === 'fr') ? 'Récence' : 'Most recent'}
          </option>
        </React.Fragment>
      );
      default: return null;
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
            handlePagination={this.props.handlePagination}
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
    const bgColor = `${this.props.api}Color`;
    const activeSortValue = (this.props.activeSortValue)
      ? `${Object.keys(this.props.activeSortValue)[0]}__${Object.values(this.props.activeSortValue)[0]}`
      : 'score';

    if (this.props.isLoading) {
      return <GraphSpinner />;
    }
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section className="d-flex flex-column">
          <div className={`mb-2 ${classes.ActiveFiltersContainer}`} style={{ backgroundColor: classes[bgColor] }}>
            <div className={`px-3 py-2 d-flex align-items-center ${classes.ResultHeader}`}>
              <div className="mr-auto">
                <FormattedHTMLMessage
                  id={`searchResults.${this.props.api}.results`}
                  values={{ count: this.props.data.total }}
                />
              </div>
              <div className="px-2">
                <select
                  name="type"
                  id="type-select"
                  className={`form-control ${classes.Select}`}
                  onChange={e => this.props.handleSortResults(e)}
                  defaultValue={activeSortValue}
                >
                  <option key="score" value="score">
                    {(this.props.language === 'fr') ? 'Pertinence' : 'Relevance'}
                  </option>
                  {this.renderSortOptions()}
                </select>
              </div>
              <div>
                <FormattedHTMLMessage id="searchResults.download">
                  { download => (
                    <button
                      onClick={this.props.handleExports}
                      type="button"
                      id="exportbutton"
                      title={download}
                      className={`btn ${classes.btn_dark} ${classes.SquareButton}`}
                    >
                      <i className="fas fa-download" />
                    </button>
                  )}
                </FormattedHTMLMessage>
              </div>
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
  activeSortValue: PropTypes.object,
  handlePagination: PropTypes.func,
  handleExports: PropTypes.func,
  handleSortResults: PropTypes.func,
};
