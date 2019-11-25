import React, { Component, Suspense, lazy } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Filters.scss';

const EntityFilters = lazy(() => import('./ObjectsFilters/EntityFilters'));
const PersonsFilters = lazy(() => import('./ObjectsFilters/PersonsFilters'));
const ProjectsFilters = lazy(() => import('./ObjectsFilters/ProjectsFilters'));
const PublicationsFilters = lazy(() => import('./ObjectsFilters/PublicationsFilters'));
const ActiveFilterCard = lazy(() => import('./ActiveFilterCard/ActiveFilterCard'));

class FilterPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: true,
      isMobile: (window.innerWidth < 992),
    };
  }

  componentDidMount() {
    if (window.innerWidth < 992) {
      this.setState({ isActive: false });
    }
  }

  activateFilters = (isActive) => {
    this.setState({ isActive });
  }

  renderApiFilter = () => {
    const properties = {
      language: this.props.language,
      facets: this.props.facets,
      generalFacets: this.props.generalFacets,
      filters: this.props.filters,
      multiValueFilterHandler: this.props.multiValueFilterHandler,
      rangeFilterHandler: this.props.rangeFilterHandler,
      sliderData: this.props.sliderData,
    };
    switch (this.props.api) {
      case 'structures': return <EntityFilters {...properties} />;
      case 'persons': return <PersonsFilters {...properties} />;
      case 'projects': return <ProjectsFilters {...properties} />;
      case 'publications': return <PublicationsFilters {...properties} />;
      default: return null;
    }
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div className={`d-flex flex-column mb-2 ${classes.Filters}`}>
          <ActiveFilterCard
            language={this.props.language}
            filters={this.props.filters}
            multiValueFilterHandler={this.props.multiValueFilterHandler}
            isMobile={this.state.isMobile}
            isActive={this.state.isActive}
            activateFilters={this.activateFilters}
          />
          <div className={`p-3 mb-2 ${classes.FiltersContainer} ${classes[(this.state.isActive) ? 'Visible' : 'Hidden']}`}>
            <div className={classes.FilterHeaders}>
              <FormattedHTMLMessage id="filterPanel.filterBy" defaultMessage="filterPanel.filterBy" />
            </div>
            <Suspense fallback={<div />}>
              {this.renderApiFilter()}
            </Suspense>
          </div>
        </div>
      </IntlProvider>
    );
  }
}

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  rangeFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
  api: PropTypes.string.isRequired,
  sliderData: PropTypes.array,
};
