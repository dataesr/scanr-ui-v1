import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './SectionTitleViewMode.scss';

/**
 * SectionTitleViewMode
 * Url : ex: /entite/200711886U
 * Description : Bloc identité visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class SectionTitleViewMode extends Component {
  state = {
    modifyMode: false,
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  render() {
    return (
      <div>
        <div className="d-flex flex-wrap align-items-center">
          <i className={`fas fa-folder-open ${classes.Icon}`} />
          <span className={`pl-2 mr-auto my-2 ${classes.Title}`}>
            {(this.props.total) ? this.props.total : null}
            &nbsp;
            {this.props.label}
          </span>
          {
            (this.props.total)
              ? (
                <div className="d-flex flex-wrap align-items-center">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-labelledby="productionViewList"
                    onClick={() => this.props.viewModeClickHandler('list')}
                    onKeyPress={() => this.props.viewModeClickHandler('list')}
                    className={classes.ViewChangeButton}
                  >
                    <div className="mx-3 d-flex flex-nowrap align-items-center">
                      <span className={`mx-2 btn ${classes.SquareButton} ${(this.props.viewMode === 'list') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}>
                        <i aria-hidden className="fas fa-list" />
                      </span>
                      <p className="m-0" id="productionViewList">
                        {
                          (this.props.language === 'fr')
                            ? 'Liste'
                            : 'List'
                        }
                      </p>
                    </div>
                  </div>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-labelledby="productionViewGraph"
                    onClick={() => this.props.viewModeClickHandler('graph')}
                    onKeyPress={() => this.props.viewModeClickHandler('graph')}
                    className={classes.ViewChangeButton}
                  >
                    <div className="mx-3 d-flex flex-nowrap align-items-center">
                      <span className={`mx-2 btn ${classes.SquareButton} ${(this.props.viewMode === 'graph') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}>
                        <i aria-hidden className="fas fa-chart-pie" />
                      </span>
                      <p className="m-0" id="productionViewGraph">
                        Visualisation
                      </p>
                    </div>
                  </div>
                </div>
              )
              : null
          }
        </div>
      </div>
    );
  }
}

export default SectionTitleViewMode;

SectionTitleViewMode.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  viewModeClickHandler: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
};
