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
  </div>
);

export default SectionTitle;

SectionTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
};
