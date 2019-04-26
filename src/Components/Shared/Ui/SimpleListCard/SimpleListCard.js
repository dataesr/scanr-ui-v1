import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './SimpleListCard.scss';

/**
 * SimpleListCard component
 * Url : .
 * Description : Carte avec logo, titre, label, tooltip et bouton qui ouvre une modale affichant une liste d'items
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const SimpleListCard = (props) => {
  const logo = (props.logo) ? <div className={classes.Logo}><i className={props.logo} /></div> : null;
  const title = (props.title) ? <div className={classes.Title}>{props.title}</div> : null;
  const label = (props.label) ? <div className={classes.Label}>{props.label}</div> : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  let items = null;
  if (props.list) {
    items = props.list.map(item => <li>{item.value}</li>);
  }

  return (
    <div className={classes.SimpleListCard}>
      {logo}
      {title}
      {label}
      {tooltip}
      {(items) || null}
    </div>
  );
};

export default SimpleListCard;

SimpleListCard.propTypes = {
  logo: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  list: PropTypes.array,
  labelListButton: PropTypes.string,
  tooltip: PropTypes.string,
};
