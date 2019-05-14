import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ButtonWithModal from '../Buttons/ButtonWithModal';

import classes from './SimpleListCard.scss';

/**
 * SimpleListCard component
 * Url : .
 * Description : Carte avec logo, titre, label, tooltip et bouton qui ouvre une modale affichant une liste d'items
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const logoFunction = logo => (
  (logo) ? <div className={classes.Logo}><i className={logo} /></div> : null
);

const titleFunction = title => (
  (title) ? <div className={classes.Title}>{title}</div> : null
);

const labelFunction = label => (
  (label) ? <div className={classes.Label}>{label}</div> : null
);

const additionalListFunction = (allProps) => {
  const items = allProps.list.map(item => (
    <li key={item.key} className="list-group-item">
      <div className="row">
        <div className="col">
          <span className={classes.Key}>{item.key}</span>
        </div>
        <div className="col-8">
          <span className={classes.Value}>{item.value}</span>
        </div>
      </div>
    </li>
  ));
  const itemsHtml = <ul className="list-group list-group-flush">{items}</ul>;
  return (
    <ButtonWithModal
      logo={allProps.logo}
      title={allProps.title}
      buttonLabel={allProps.labelListButton}
      dataHtml={itemsHtml}
    />
  );
};

const prepareListFunction = (allProps) => {
  if (!allProps.subCategory) {
    return additionalListFunction(allProps);
  } else {
    // Regroupement des données par année
    console.log('subCategory===true : allProps', allProps);
  }
};

const SimpleListCard = (props) => {
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.SimpleListCard}>
      {logoFunction(props.logo)}
      {titleFunction(props.title)}
      {labelFunction(props.label)}

      {tooltip}

      {prepareListFunction(props)}

    </div>
  );
};


export default SimpleListCard;

SimpleListCard.defaultProps = {
  subCategory: false,
};
SimpleListCard.propTypes = {
  label: PropTypes.string,
  labelListButton: PropTypes.string,
  subCategory: PropTypes.bool,
  list: PropTypes.array,
  logo: PropTypes.string,
  title: PropTypes.string,
  tooltip: PropTypes.string,
};
