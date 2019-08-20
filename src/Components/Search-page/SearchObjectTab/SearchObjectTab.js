import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './SearchObjectTab.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';


const SearchObjectTab = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

/* eslint-disable */

  const ShouldRenderView = () => {
    if (props.api !== 'all') {
      return (
        <React.Fragment>
          <a className={`col-lg-4 col-md-0 ${classes.ResultsNavItemCols}`}> </a>
          <a className={`col-lg-4 col-md-6 ${classes.ResultsNavItemCols}`}>
            <div
              className={(props.view === 'list')
                ? `${classes.ResultsNavItem} ${classes.ResultsNavItemActive}`
                : `${classes.ResultsNavItem}`
              }
              onClick={() => props.viewChangeHandler('list')}
            >
              <i className={`fas fa-list-ul ${classes.ResultsNavItemIcon}`} />
              <FormattedHTMLMessage id="nav.resultList" defaultMessage="nav.resultList" />
            </div>
          </a>
          <a className={`col-lg-4 col-md-6 ${classes.ResultsNavItemCols}`}>
            <div
              className={(props.view === 'graph')
                ? `${classes.ResultsNavItem} ${classes.ResultsNavItemActive}`
                : `${classes.ResultsNavItem}`
              }
              onClick={() => props.viewChangeHandler('graph')}
            >
              <i className={`fas fa-chart-pie ${classes.ResultsNavItemIcon}`} />
              <FormattedHTMLMessage id="nav.resultGraph" defaultMessage="nav.resultGraph" />
            </div>
          </a>
        </React.Fragment>
      );
    }
    return (<a className={`col-12 ${classes.ResultsNavItemCols}`}> </a>);
  }

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={classes.Section}>
        <div className="container columns">
          <nav className="row">
            <a
              className={(props.api === 'all')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.apiChangeHandler('all')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.all" defaultMessage="nav.all" />
              </div>
              <div>
                (
                {props.preview.all}
                )
              </div>
            </a>
            <a
              className={(props.api === 'structures')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.apiChangeHandler('structures')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.structures" defaultMessage="nav.structures" />
              </div>
              <div>
                (
                {props.preview.structures.count}
                )
              </div>
            </a>
            <a
              className={(props.api === 'projects')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.apiChangeHandler('projects')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.projects" defaultMessage="nav.projects" />
              </div>
              <div>
                (
                {props.preview.projects.count}
                )
              </div>
            </a>
            <a
              className={(props.api === 'persons')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.apiChangeHandler('persons')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.persons" defaultMessage="nav.persons" />
              </div>
              <div>
                (
                {props.preview.persons.count}
                )
              </div>
            </a>
            <a
              className={(props.api === 'publications')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.apiChangeHandler('publications')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.publications" defaultMessage="nav.publications" />
              </div>
              <div>
                (
                {props.preview.publications.count}
                )
              </div>
            </a>
          </nav>
          <nav className={`row ${classes.ResultsNavContainer}`}>
            {ShouldRenderView()}
          </nav>
        </div>
      </div>
    </IntlProvider>
  );
};

export default SearchObjectTab;

SearchObjectTab.propTypes = {
  language: PropTypes.string.isRequired,
  api: PropTypes.string,
  view: PropTypes.string,
  apiChangeHandler: PropTypes.func,
  viewChangeHandler: PropTypes.func,
  preview: PropTypes.object,
};
