import React from 'react';
import PropTypes from 'prop-types';

import Contribute from './Contribute/Contribute';

import classes from './SectionTitle.scss';

/**
 * SectionTitleViewMode
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SectionTitle = props => (
  <div className="row">
    <div className="d-flex flex-wrap align-items-center flex-grow-1 mx-1">
      <i className={`fas ${props.icon} ${classes.Icon}`} />
      <span className={`pl-2 mr-auto my-2 ${classes.Title}`}>
        {(props.total) ? (props.total).toLocaleString() : null}
        &nbsp;
        {props.title}
      </span>
      {
        (props.total && props.viewModeClickHandler && props.viewMode)
          ? (
            <div className="d-flex flex-wrap align-items-center">
              <div
                role="button"
                tabIndex={0}
                aria-labelledby="ViewList"
                onClick={() => props.viewModeClickHandler('list')}
                onKeyPress={() => props.viewModeClickHandler('list')}
                className={classes.ViewChangeButton}
              >
                <div className="mx-3 d-flex flex-nowrap align-items-center">
                  <span className={`mx-2 btn ${classes.SquareButton} ${(props.viewMode === 'list') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}>
                    <i aria-hidden className="fas fa-list" />
                  </span>
                  <p className={`m-0 ${classes.Text}`} id="ViewList">
                    {
                      (props.language === 'fr')
                        ? 'Liste'
                        : 'List'
                    }
                  </p>
                </div>
              </div>
              <div
                role="button"
                tabIndex={0}
                aria-labelledby="ViewGraph"
                onClick={() => props.viewModeClickHandler('graph')}
                onKeyPress={() => props.viewModeClickHandler('graph')}
                className={classes.ViewChangeButton}
              >
                <div className="mx-3 d-flex flex-nowrap align-items-center">
                  <span className={`mx-2 btn ${classes.SquareButton} ${(props.viewMode === 'graph') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}>
                    <i aria-hidden className="fas fa-chart-pie" />
                  </span>
                  <p className={`m-0 ${classes.Text}`} id="ViewGraph">
                    Visualisation
                  </p>
                </div>
              </div>
            </div>
          )
          : null
      }
      {
        (props.id && props.objectType)
          ? (
            <span className="pl-2 ml-auto my-2">
              <Contribute
                language={props.language}
                sectionName={props.title}
                objectId={props.id}
                objectType={props.objectType}
              />
            </span>
          )
          : null
      }
    </div>
  </div>
);

export default SectionTitle;

SectionTitle.propTypes = {
  language: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.object.isRequired,
  objectType: PropTypes.string.isRequired,
  total: PropTypes.number,
  viewModeClickHandler: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
};
