import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import ButtonWithModal from '../../../../../../Shared/Ui/Buttons/ButtonWithModal';

import classes from './History.scss';

/**
 * HistoryListCard component
 * Url : .
 * Description : Carte avec logo, titre, label, tooltip et bouton qui ouvre une modale affichant une liste d'items trié par année et par type
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const titleFunction = title => (
  (title) ? <div className={classes.Title}>{title}</div> : null
);

const additionalListFunction = (allProps) => {
  // sorting by years
  const listByYear = allProps.list.sort((a, b) => (a.eventYear - b.eventYear));

  const objFinal = [];
  const objYear = {};
  let year = '';
  for (let i = 0; i < listByYear.length; i += 1) {
    if (listByYear[i].eventYear !== year) {
      year = listByYear[i].eventYear;
      objYear.year = year;
      objYear.data = [];
      objFinal.push(objYear);
    }

    const data = {};
    if (listByYear[i].eventType && listByYear[i].structure && listByYear[i].structure.id && listByYear[i].structure.label && listByYear[i].structure.label.fr) {
      data.type = listByYear[i].eventType;
      data.id = listByYear[i].structure.id;
      data.label = listByYear[i].structure.label.fr;
      objYear.data.push(data);
    }
  }

  // sorting by types
  // TODO si pas fait par API

  const itemsHtml = objFinal.map((itemYear) => {
    let title = '';
    const dataHtml = itemYear.data.map((item) => {
      title = `${itemYear.year} - ${item.type}`;
      return (
        <div className="row">
          <div className="col">
            {item.id}
          </div>
          <div className="col">
            {item.label}
          </div>
        </div>
      );
    });
    return (
      <div>
        <h2>{title}</h2>
        {dataHtml}
      </div>
    );
  });

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
    return null;
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
  list: PropTypes.array,
  title: PropTypes.string,
  tooltip: PropTypes.string,
};
