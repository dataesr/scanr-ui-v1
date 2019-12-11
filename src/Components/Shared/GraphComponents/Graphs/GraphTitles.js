import React from 'react';
import PropTypes from 'prop-types';
import LexiconModal from '../../Lexicon/LexiconModal/LexiconModal';

import classes from './GraphTitles.scss';


const GraphTitles = props => (
  <div className="p-4">
    <div className={classes.Title}>
      {props.title}
      &nbsp;
      {(props.lexicon) ? (
        <LexiconModal language={props.language} target={props.lexicon}>
          <i className="fa fa-info-circle" />
        </LexiconModal>
      ) : null }
    </div>
    <div className={`${classes.Subtitle}`}>
      {props.subtitle}
    </div>
    {
  }
  </div>
);

export default GraphTitles;

GraphTitles.propTypes = {
  title: PropTypes.string.isRequired,
  lexicon: PropTypes.string,
  language: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};
