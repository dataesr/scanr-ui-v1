import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToPage.scss';

const ButtonToPage = props => (
  <a href={props.url} target={props.target}>
    <div className={`d-flex align-items-center justify-content-between p-2 ${classes.ButtonToPage} ${props.className}`}>
      <div className="pl-1">
        {props.children}
      </div>
      <div>
        <i className="fas fa-chevron-right" />
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
