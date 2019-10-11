import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import getSelectKey from '../../../../../Utils/getSelectKey';

import SubmitBox from '../../../../Shared/SubmitBox/SubmitBox';

import classes from './SummaryCard.scss';

/**
 * SummaryCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SummaryCard = (props) => {
  const title = (props.title) ? <div className={classes.Title}>{props.title}</div> : null;
  const text = (props.text) ? <div className={classes.Text}>{props.text}</div> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SummaryCard}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
      {title}
      {text}
      {tooltip}
    </div>
  );
};

export default SummaryCard;

SummaryCard.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
