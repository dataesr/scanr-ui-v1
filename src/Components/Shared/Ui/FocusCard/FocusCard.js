import React from 'react';
import PropTypes from 'prop-types';

import ButtonToPage from '../Buttons/ButtonToPage';

/* SCSS */
import classes from './FocusCard.scss';

const FocusCard = props => (
  <div className={classes.FocusCard}>
    <div>
      <img
        src={`./img/icon-focus-${props.type}.svg`}
        alt={`Logo ${props.title}`}
      />
    </div>
    <div className={classes.Title}>
      {props.title}
    </div>
    <div className={`row ${classes.TagsAndButton}`}>
      <div className="col-lg-8">
        {props.tags.map(tag => (<span className={classes.Tag}>{tag}</span>))}
      </div>
      <div className={`col-lg-4 ${classes.Button}`}>
        <ButtonToPage
          url={props.url}
        >
          Lire
        </ButtonToPage>
      </div>
    </div>
  </div>
);

export default FocusCard;

FocusCard.propTypes = {
  tags: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};
