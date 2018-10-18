import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import classes from './Field.css';

const btShowAll = props => (
  <div className={classes.bt_showAll}>
    <Button
      className="is-medium is-fullwidth"
      onClick={props.onClick}
    >
      <i className="fa fa-search" />
      &nbsp;
      {`${props.showAll ? ' Masquer' : ' Voir'} les ${props.label}`}
    </Button>
  </div>
);

export default btShowAll;

btShowAll.propTypes = {
  onClick: PropTypes.func.isRequired,
  showAll: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};
