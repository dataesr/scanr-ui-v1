import React from 'react';
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
      <i className={props.icon} />
      <span className={classes.Label}>
        {props.children}
      </span>
    </div>
    <div className="col text-right">
      bt
    </div>
  </div>
);

export default SectionTitle;

SectionTitle.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
