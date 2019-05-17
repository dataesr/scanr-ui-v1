import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './SearchObjectTab.scss';


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
              className={(props.currentQueryObject === 'all')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('all')}
              href="#"
            >
              <div>
                <strong>
                  <FormattedHTMLMessage id="nav.all" defaultMessage="nav.all" />
                </strong>
              </div>
              <div>(count)</div>
            </a>
            <a
              className={(props.currentQueryObject === 'entities')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('entities')}
              href="#"
            >
              <div>
                <strong>
                  <FormattedHTMLMessage id="nav.entities" defaultMessage="nav.entities" />
                </strong>
              </div>
              <div>(count)</div>
            </a>
            <a
              className={(props.currentQueryObject === 'projects')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('projects')}
              href="#"
            >
              <div>
                <strong>
                  <FormattedHTMLMessage id="nav.projects" defaultMessage="nav.projects" />
                </strong>
              </div>
              <div>(count)</div>
            </a>
            <a
              className={(props.currentQueryObject === 'persons')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('persons')}
              href="#"
            >
              <div>
                <strong>
                  <FormattedHTMLMessage id="nav.persons" defaultMessage="nav.persons" />
                </strong>
              </div>
              <div>(count)</div>
            </a>
            <a
              className={(props.currentQueryObject === 'publications')
                ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
                : `col-lg-2 ${classes.ObjetcsNavItem}`
              }
              onClick={() => props.queryObjectChangeHandler('publications')}
              href="#"
            >
              <div>
                <strong>
                  <FormattedHTMLMessage id="nav.publications" defaultMessage="nav.publications" />
                </strong>
              </div>
              <div>(count)</div>
            </a>
          </nav>
          <nav className={`row ${classes.ResultsNavContainer}`}>
            <a className={`col-lg-4 col-md-0 ${classes.ResultsNavItemCols}`}> </a>
            <a className={`col-lg-4 col-md-6 ${classes.ResultsNavItemCols}`}>
              <div
                className={(props.currentResultView === 'list')
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
                className={(props.currentResultView === 'visualization')
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
  currentQueryObject: PropTypes.string,
  currentResultView: PropTypes.string,
  queryObjectChangeHandler: PropTypes.func,
  resultViewChangeHandler: PropTypes.func,
};
