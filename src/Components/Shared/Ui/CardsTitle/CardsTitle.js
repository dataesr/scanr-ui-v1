import React from 'react';
import PropTypes from 'prop-types';

import classes from './CardsTitle.scss';
import LexiconModal from '../../Lexicon/LexiconModal/LexiconModal';

/**
 * CardsTitle
 * Url : ex: /entite/200711886U
 * Description : Correspond au titre d'une card
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const CardsTitle = props => (
  <h2 className={classes.CardsTitle}>
    {props.title}
    &nbsp;
    {(props.lexicon) ? (
      <LexiconModal target={props.lexicon}>
        <i className="fa fa-info-circle" />
      </LexiconModal>
    ) : null }
  </h2>
);

export default CardsTitle;

CardsTitle.propTypes = {
  title: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
};
