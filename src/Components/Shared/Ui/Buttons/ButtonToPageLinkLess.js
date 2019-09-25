import React from 'react';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './ButtonToPage.scss';

const ButtonToPageLinkLess = props => (
  <div className={`d-flex align-items-center ${classes.ButtonToPage}`}>
    <div className="row">
      <div className={classes.Text}>
        {props.children}
      </div>
      <div className="col text-right">
        <i className="fas fa-chevron-right" />
      </div>
    </div>
  </div>
);

export default ButtonToPageLinkLess;

ButtonToPageLinkLess.propTypes = {
  children: PropTypes.any,
};
