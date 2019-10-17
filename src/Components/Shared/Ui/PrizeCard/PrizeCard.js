import React from 'react';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../Utils/getSelectKey';
import SubmitBox from '../../SubmitBox/SubmitBox';
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
  const date = <p className={classes.Title}>{`${messages[props.language]} ${year}`}</p>;
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;
  return (
    <div className={`${classes.SimpleCard}`}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
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
  date: PropTypes.string,
  color: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
// icon: PropTypes.string,
