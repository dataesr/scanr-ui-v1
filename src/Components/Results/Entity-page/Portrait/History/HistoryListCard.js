import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ButtonWithModal from '../../../../Shared/Ui/Buttons/ButtonWithModal';

import classes from './History.scss';

/**
 * HistoryListCard component
 * Url : .
 * Description : Carte avec logo, titre, label, tooltip et bouton qui ouvre une modale affichant une liste d'items trié par année et par type
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

const additionalListFunction = (allProps) => {
  // const items = allProps.list.map(item => (
  //   <li key={item.key} className="list-group-item">
  //     <div className="row">
  //       <div className="col">
  //         <span className={classes.Key}>{item.key}</span>
  //       </div>
  //       <div className="col-8">
  //         <span className={classes.Value}>{item.value}</span>
  //       </div>
  //     </div>
  //   </li>
  // ));

  // sorting by years
  const listByYear = allProps.list.sort(function(a, b){return a.eventYear-b.eventYear});

  console.log(listByYear);

  // parcours : Pour chaque année, creation d'une list data
  // const obj = {};
  // let year = listByYear[0].eventYear;
  // for (var i = 0; i < listByYear.length; i++) {
  //   if (listByYear[i].eventYear !== year) {
  //
  //   }
  // }

  // sorting by types

  const items = <li>toto</li>;
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

const HistoryListCard = (props) => {
  if (!props.list) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    );
  }

  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;

  return (
    <div className={classes.HistoryListCard}>
      <div className={classes.Logo}>
        <i className="fas fa-clock" />
      </div>

      {titleFunction(props.title)}

      {tooltip}

      {additionalListFunction(props)}
    </div>
  );
};

export default HistoryListCard;

HistoryListCard.propTypes = {
  labelListButton: PropTypes.string,
  list: PropTypes.array,
  title: PropTypes.string,
  tooltip: PropTypes.string,
};
