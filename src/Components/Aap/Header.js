import React from 'react';
import PropTypes from 'prop-types';

import classes from './custom.scss';

const Header = props => (
  <div className={classes.Header}>
    <img src="https://www.horizon-europe.gouv.fr/sites/default/files/styles/news_frieze_list_block/public/2021-01/logo-horizon-europe-signature-5-2643.jpg?itok=J_DROIvo" alt="" />
    <h2>
      {props.title}
    </h2>

  </div>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
