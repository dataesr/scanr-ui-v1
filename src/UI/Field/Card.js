import React from 'react';
import PropTypes from 'prop-types';

import classes from './Field.scss';

const Card = props => (
  <div className={`${classes.Card} card`}>
    <div className={`${classes.CardTitle} has-text-centered`}>
      <i className={props.iconCssClass} />
      <br />
      {props.title}
    </div>
    <div className="card-content has-text-centered">
      {props.children
        ? <div className={classes.CardContent}>{props.children}</div> : <small><i>non renseigné</i></small>}
    </div>
  </div>
);

export default Card;

Card.propTypes = {
  children: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconCssClass: PropTypes.string,
};
