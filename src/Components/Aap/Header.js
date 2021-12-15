import React from 'react';
import PropTypes from 'prop-types';

import classes from './custom.scss';

const Header = props => (
  <div className={classes.Header}>
    <img src="https://ec.europa.eu/info/sites/default/themes/europa/images/svg/logo/logo--fr.svg" alt="" />
    <h2>
      {props.title}
    </h2>

  </div>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
