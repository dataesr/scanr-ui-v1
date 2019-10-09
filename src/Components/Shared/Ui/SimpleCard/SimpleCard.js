import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import getSelectKey from '../../../../Utils/getSelectKey';

import SubmitBox from '../../SubmitBox/SubmitBox';

import classes from './SimpleCard.scss';

/**
 * SimpleCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimpleCard = (props) => {
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} aria-hidden="true" /></div> : null;
  const title = (props.title) ? <h1 className={classes.Title}>{props.title}</h1> : null;
  const label = (props.label) ? <p className={classes.Label}>{props.label}</p> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SimpleCard}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
      {logo}
      {title}
      {label}
      {tooltip}
    </div>
  );
};

export default SimpleCard;

SimpleCard.propTypes = {
  language: PropTypes.string.isRequired,
  logo: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
