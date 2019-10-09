import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import classes from './SectionTitle.scss';

/**
 * SectionTitle
 * Url : ex: /entite/200711886U
 * Description : Correspond au titre d'une section (ex : Portrait)
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SectionTitle = props => (
  <div className={`row ${classes.SectionTitle}`}>
    <div className="col">
      <i className={props.icon} aria-hidden="true" />
      <h1 className={classes.Label}>
        {props.children}
      </h1>
    </div>
    <div className="col text-right">
      {
        (!props.modifyMode || props.emptySection)
          ? (
            <Fragment>
              <span className={classes.TxtBtn}>Enrichir/Modifier</span>
              <button
                className={`btn ${classes.btn_dark}`}
                type="button"
                onClick={props.modifyModeHandle}
              >
                <i className="fas fa-pen" />
              </button>
            </Fragment>
          )
          : (
            <Fragment>
              <span className={classes.TxtBtn}>J&#39;ai terminé</span>
              <button
                className={`btn ${classes.btn_dark}`}
                type="button"
                onClick={props.modifyModeHandle}
              >
                <i className="fas fa-check" />
              </button>
            </Fragment>
          )
    }
    </div>
  </div>
);

export default SectionTitle;

SectionTitle.defaultProps = {
  emptySection: false,
};

SectionTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  modifyModeHandle: PropTypes.func,
  modifyMode: PropTypes.bool,
  emptySection: PropTypes.bool,
};
