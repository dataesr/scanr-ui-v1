import React, { Component, Suspense, lazy } from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';
import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';

import classes from './Results.scss';

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
          <FormattedHTMLMessage id="Search.Results.sort.name">
            { option => (
              <option key="alphabetical" value="label.fr__ASC">{option}</option>
            )}
          </FormattedHTMLMessage>
        </React.Fragment>
      );
      case 'persons': return (
        <React.Fragment>
          <FormattedHTMLMessage id="Search.Results.sort.name">
            { option => (
              <option key="alphabetical" value="lastName__ASC">{option}</option>
            )}
          </FormattedHTMLMessage>
        </React.Fragment>
      );
      case 'projects': return (
        <React.Fragment>
          <FormattedHTMLMessage id="Search.Results.sort.startDate">
            { option => (
              <option key="date" value="startDate__DESC">{option}</option>
            )}
          </FormattedHTMLMessage>
          <FormattedHTMLMessage id="Search.Results.sort.budget">
            { option => (
              <option key="budget" value="budgetTotal__DESC">{option}</option>
            )}
          </FormattedHTMLMessage>
        </React.Fragment>
      );
      case 'publications': return (
        <React.Fragment>
          <FormattedHTMLMessage id="Search.Results.sort.recency">
            { option => (
              <option key="alphabetical" value="publicationDate__DESC">{option}</option>
            )}
          </FormattedHTMLMessage>
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
    return (
      <section className="d-flex flex-column">
        <div className={`mb-2 ${classes.ActiveFiltersContainer}`} style={{ backgroundColor: classes[bgColor] }}>
          <div className={`px-3 py-2 d-flex align-items-center ${classes.ResultHeader}`}>
            <div className="mr-auto">
              <FormattedHTMLMessage
                id={`Search.Results.${this.props.api}.results`}
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
                <FormattedHTMLMessage id="Search.Results.sort.relevance">
                  { option => (
                    <option key="score" value="score">{option}</option>
                  )}
                </FormattedHTMLMessage>
                {this.renderSortOptions()}
              </select>
            </div>
            <div>
              <FormattedHTMLMessage id="Search.Results.download">
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
              &nbsp;
              <LexiconModal language={this.props.language} target="Download">
                <i className="fa fa-info-circle" />
              </LexiconModal>
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
