import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToPage.scss';

const ButtonToPage = props => (
  <a href={props.url}>
    <div className={`${classes.ButtonToPage} ${props.className}`}>
      <div className="row">
        <div className="col-sm-9">
          {props.children}
        </div>
        <div className="col-sm-3 text-right">
          <i className="fas fa-chevron-right" />
        </div>
      </div>
    </div>
  </a>
);

export default ButtonToPage;

ButtonToPage.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
};
