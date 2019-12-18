import React from 'react';
import PropTypes from 'prop-types';

import ButtonWithModal from '../Buttons/ButtonWithModal';
import PersonCard from '../../../Search/Results/ResultCards/PersonCard';
import AffiliationCard from '../../../Search/Results/ResultCards/EntityCard';

import classes from './CounterListCard.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};
/**
 * CounterListCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const CounterListCard = (props) => {
  const itemsToShow = [];
  for (let i = props.limit; i < props.data.length; i += 1) {
    itemsToShow.push(props.data[i]);
  }
  const title = (props.title) ? <h3 className={classes.Title}>{props.title}</h3> : null;
  const items = itemsToShow.map((item) => {
    if (props.isPerson) {
      return (
        <li key={item}>
          <PersonCard
            language={props.language}
            data={item}
            small
          />
        </li>
      );
    }
    if (props.isEntity) {
      return (
        <li key={item}>
          <AffiliationCard
            language={props.language}
            data={item}
            small
          />
        </li>
      );
    }
    return null;
  });

  const itemsHtml = <ul className={`list-group list-group-flush ${classes.Ul}`}>{items}</ul>;
  return (
    <div className={`d-flex flex-column ${classes.CounterListCard} ${classes[props.color]}`}>
      {title}
      <p className={classes.Label}>
        <p className={classes.Counter}>
          <span>{messages[props.language].and}</span>
          &nbsp;
          {itemsToShow.length}
        </p>
        <div>
          {messages[props.language][props.labelKey]}
        </div>
      </p>

      <div className="mt-auto">
        <div className={classes.Button}>
          <ButtonWithModal
            title={messages[props.language][props.modalTitleKey]}
            buttonLabel={messages[props.language]['authors.button.label']}
            dataHtml={itemsHtml}
          />
        </div>
      </div>
    </div>
  );
};

export default CounterListCard;

CounterListCard.defaultProps = {
  title: '',
  // roleKey: '',
  modalTitleKey: 'authors.modal.title',
  isEntity: false,
  isPerson: false,
};

CounterListCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string,
  limit: PropTypes.number,
  title: PropTypes.string,
  modalTitleKey: PropTypes.string,
  labelKey: PropTypes.string,
  // objectType: PropTypes.string,
  // roleKey: PropTypes.string,
  color: PropTypes.string,
  isEntity: PropTypes.bool,
  isPerson: PropTypes.bool,
};
