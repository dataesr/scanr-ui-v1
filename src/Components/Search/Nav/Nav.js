import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './Nav.scss';


const SearchObjectTab = (props) => {
/* eslint-disable */
/* Correct all of it and reduce code with a map over the api. */
  const ShouldRenderView = () => {
    if (props.api !== 'all') {
      return (
        <nav className={`row d-flex flex-wrap p-2 ${classes.ResultsNavContainer}`}>
          <a className={`ml-auto ${classes.ResultsNavItemCols}`}>
            {
              (props.view === ('list' || null))
                ? <div className={`${classes.ResultsNavItem} ${classes.ResultsNavItemActive}`}>
                    <i className={`fas fa-list-ul ${classes.ResultsNavItemIcon}`} />
                    <span className={classes.TextToHide}>
                      <FormattedHTMLMessage id="Search.Nav.List" defaultMessage="Search.Nav.List" />
                    </span>
                  </div>
                : <div className={classes.ResultsNavItem} onClick={() => props.viewChangeHandler('list')}>
                    <i className={`fas fa-list-ul ${classes.ResultsNavItemIcon}`} />
                    <span className={classes.TextToHide}>
                      <FormattedHTMLMessage id="Search.Nav.List" defaultMessage="Search.Nav.List" />
                    </span>
                  </div>
            }
          </a>
          <a className={`ml-2 ${classes.ResultsNavItemCols}`}>
            {
              (props.view === 'graph')
                ? <div className={`${classes.ResultsNavItem} ${classes.ResultsNavItemActive}`}>
                    <i className={`fas fa-chart-pie ${classes.ResultsNavItemIcon}`} />
                    <span className={classes.TextToHide}>
                      <FormattedHTMLMessage id="Search.Nav.Graph" defaultMessage="Search.Nav.Graph" />
                    </span>
                  </div>
                : <div className={classes.ResultsNavItem} onClick={() => props.viewChangeHandler('graph')}>
                    <i className={`fas fa-chart-pie ${classes.ResultsNavItemIcon}`} />
                    <span className={classes.TextToHide}>
                      <FormattedHTMLMessage id="Search.Nav.Graph" defaultMessage="Search.Nav.Graph" />
                    </span>
                  </div>
            }
          </a>
        </nav>
      );
    }
    if (props.api === 'all' && window.innerWidth > 992) {
      return (<div className={`row ${classes.separator}`}></div>)
    }
    return null;
  }

  return (
    <div className={classes.SearchObjectTab}>
      <div className="container">
        <nav className={`row d-flex flex-wrap pt-2 pb-0 ${classes.ObjNav}`}>
          <a
            className={(props.api === 'all')
              ? `col-lg-2 ${classes.ObjetcsNavItem} ${classes.ObjectsNavItemActive}`
              : `col-lg-2 ${classes.ObjetcsNavItem}`
            }
            onClick={() => props.apiChangeHandler('all')}
          >
            <div className="font-weight-bold">
              <FormattedHTMLMessage id="Search.Global.All" defaultMessage="Search.Global.All" />
            </div>
            <div>
              (
              {props.preview.all.toLocaleString(props.language)}
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
              <FormattedHTMLMessage id="Search.Global.Entities" defaultMessage="Search.Global.Entities" />
            </div>
            <div>
              (
              {props.preview.structures.count.toLocaleString(props.language)}
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
              <FormattedHTMLMessage id="Search.Global.Projects" defaultMessage="Search.Global.Projects" />
            </div>
            <div>
              (
              {props.preview.projects.count.toLocaleString(props.language)}
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
              <FormattedHTMLMessage id="Search.Global.Persons" defaultMessage="Search.Global.Persons" />
            </div>
            <div>
              (
              {props.preview.persons.count.toLocaleString(props.language)}
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
              <FormattedHTMLMessage id="Search.Global.Publications" defaultMessage="Search.Global.Publications" />
            </div>
            <div>
              (
              {props.preview.publications.count.toLocaleString(props.language)}
              )
            </div>
          </a>
        </nav>
        {ShouldRenderView()}
      </div>
    </div>
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
