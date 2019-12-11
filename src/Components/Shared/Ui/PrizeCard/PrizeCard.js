import React from 'react';
import PropTypes from 'prop-types';

import PrizeImage from '../../svg/icon-fiche-prix';
/* SCSS */
import classes from './PrizeCard.scss';

/**
 * PrizeCard
 * Url : ui
 * Description : Composant affichant un logo soit à partir d'une URL distante, soit à partir du répertoire ./img
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: 'Prix',
  en: 'Award',
};
const options = {
  year: 'numeric',
};


const PrizeCard = (props) => {
  // const image = {
  //   prize: PrizeImage,
  // };
  const year = (props.date) ? new Date(props.date).toLocaleDateString('fr-FR', options) : '';
  const date = (props.title) ? (<p className={classes.Title}>{`${props.title} ${year}`}</p>) : (<p className={classes.Title}>{`${messages[props.language]} ${year}`}</p>);
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;
  return (
    <div className={`${classes.SimpleCard}`}>
      {date}
      <PrizeImage
        fill={props.color}
      />
      {label}
    </div>
  );
};

export default PrizeCard;

PrizeCard.propTypes = {
  language: PropTypes.string.isRequired,
  label: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.any,
  color: PropTypes.string,
};
// icon: PropTypes.string,
