import React, { Component } from 'react';
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
  all: null,
  structures: EntityFilters,
  projects: ProjectsFilters,
  persons: PersonsFilters,
  publications: PublicationsFilters,
};

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

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const ToShow = ResultsToShow[this.props.api];
    if (ToShow) {
      return (
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <div className="d-flex flex-column mb-2">
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
              <ToShow
                language={this.props.language}
                facets={this.props.facets}
                generalFacets={this.props.generalFacets}
                filters={this.props.filters}
                multiValueFilterHandler={this.props.multiValueFilterHandler}
              />
            </div>
          </div>
        </IntlProvider>
      );
    }
    return null;
  }
}

export default FilterPanel;

FilterPanel.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  facets: PropTypes.array,
  generalFacets: PropTypes.array,
  filters: PropTypes.object,
  api: PropTypes.string.isRequired,
};
