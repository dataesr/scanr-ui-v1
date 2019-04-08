import React from 'react';
import PropTypes from 'prop-types';

import classes from './ButtonMiniDarkToSearch.scss';

const ButtonMiniDarkToSearch = props => (
  <a
    className={classes.ButtonMiniDarkToSearch}
    url={props.url}
  >
    {props.children}
  </a>
);

export default ButtonMiniDarkToSearch;

ButtonMiniDarkToSearch.propTypes = {
  children: PropTypes.string.isRequired,
  url: PropTypes.string,
};
ButtonMiniDarkToSearch.defaultProps = {
  url: 'null',
};
