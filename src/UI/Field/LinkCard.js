import React from 'react';
import PropTypes from 'prop-types';

import classes from './Field.css';

const LinkCard = props => (
  <a href={props.url} target="_blank" rel="noopener noreferrer">
    <div className={`${classes.LinkCard} card`}>
      <div className="card-content">
        <div className="columns">
          <div className="column is-1">
            <i className={props.iconCssClass} />
          </div>
          <div className="column is-11">
            {props.url ? <div className={classes.LinkCardContent}>{props.url}</div> : <small><i>non renseigné</i></small>}
          </div>
        </div>

      </div>
    </div>
  </a>
);

export default LinkCard;

LinkCard.propTypes = {
  url: PropTypes.string.isRequired,
  iconCssClass: PropTypes.string,
};
