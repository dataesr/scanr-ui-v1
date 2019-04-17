import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToPage.scss';

const ButtonToPage = props => (
  <a href={props.url} target={props.target}>
    <div className={`${classes.ButtonToPage} ${props.className}`}>
      <div className="row">
        <div className={classes.Text}>
          {props.children}
        </div>
        <div className="col text-right">
          <i className="fas fa-chevron-right" />
        </div>
      </div>
    </div>
  </a>
);

export default ButtonToPage;

ButtonToPage.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  target: PropTypes.string,
};
