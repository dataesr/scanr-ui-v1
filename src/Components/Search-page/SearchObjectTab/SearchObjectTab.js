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

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <section className={classes.Section}>
        <div className="container columns">
          <nav className="row">
            <a
              className={(props.objectType === 'all')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('all')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.all" defaultMessage="nav.all" />
              </div>
              <div>
                (
                {props.counts.all}
                )
              </div>
            </a>
            <a
              className={(props.objectType === 'entities')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('entities')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.entities" defaultMessage="nav.entities" />
              </div>
              <div>
                (
                {props.counts.structures}
                )
              </div>
            </a>
            <a
              className={(props.objectType === 'projects')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('projects')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.projects" defaultMessage="nav.projects" />
              </div>
              <div>
                (
                {props.counts.projects}
                )
              </div>
            </a>
            <a
              className={(props.objectType === 'persons')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('persons')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.persons" defaultMessage="nav.persons" />
              </div>
              <div>
                (
                {props.counts.persons}
                )
              </div>
            </a>
            <a
              className={(props.objectType === 'publications')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('publications')}
            >
              <div className="font-weight-bold">
                <FormattedHTMLMessage id="nav.publications" defaultMessage="nav.publications" />
              </div>
              <div>
                (
                {props.counts.publications}
                )
              </div>
            </a>
          </nav>
          <nav className={`row ${classes.ResultsNavContainer}`}>
            <a className={`col-lg-4 col-md-0 ${classes.ResultsNavItemCols}`}> </a>
            <a className={`col-lg-4 col-md-6 ${classes.ResultsNavItemCols}`}>
              <div
                className={(props.view === 'list')
                  ? `${classes.ResultsNavItem} ${classes.ResultsNavItemActive}`
                  : `${classes.ResultsNavItem}`
                }
                onClick={() => props.resultViewChangeHandler('list')}
              >
                <i className={`fas fa-list-ul ${classes.ResultsNavItemIcon}`} />
                <FormattedHTMLMessage id="nav.resultList" defaultMessage="nav.resultList" />
              </div>
            </a>
            <a className={`col-lg-4 col-md-6 ${classes.ResultsNavItemCols}`}>
              <div
                className={(props.view === 'visualization')
                  ? `${classes.ResultsNavItem} ${classes.ResultsNavItemActive}`
                  : `${classes.ResultsNavItem}`
                }
                onClick={() => props.resultViewChangeHandler('visualization')}
              >
                <i className={`fas fa-chart-pie ${classes.ResultsNavItemIcon}`} />
                <FormattedHTMLMessage id="nav.resultGraph" defaultMessage="nav.resultGraph" />
              </div>
            </a>
          </nav>
        </div>
      </section>
    </IntlProvider>
  );
};

export default SearchObjectTab;

SearchObjectTab.propTypes = {
  language: PropTypes.string.isRequired,
  objectType: PropTypes.string,
  view: PropTypes.string,
  queryObjectChangeHandler: PropTypes.func,
  resultViewChangeHandler: PropTypes.func,
  counts: PropTypes.object,
};
