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
      <i className={props.icon} aria-hidden="true" style={{ color: props.color }} />
      <h2 className={classes.Label} style={{ color: props.color }}>
        {props.children}
      </h2>
    </div>
    <div className="col text-right">
      {
        (!props.modifyMode || props.emptySection)
          ? (
            <Fragment>
              <span className={classes.TxtBtn} style={{ color: props.color }}>Enrichir/Modifier</span>
              <button
                className={`btn ${classes.btn_dark}`}
                type="button"
                onClick={props.modifyModeHandle}
                style={{ color: props.color }}
              >
                <i className="fas fa-pen" />
              </button>
            </Fragment>
          )
          : (
            <Fragment>
              <span className={classes.TxtBtn} style={{ color: props.color }}>J&#39;ai terminé</span>
              <button
                className={`btn ${classes.btn_dark}`}
                type="button"
                onClick={props.modifyModeHandle}
                style={{ color: props.color }}
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
  children: PropTypes.node.isRequired,
  modifyModeHandle: PropTypes.func,
  modifyMode: PropTypes.bool,
  emptySection: PropTypes.bool,
  color: PropTypes.string,
};
