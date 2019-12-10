import React from 'react';
import PropTypes from 'prop-types';

import ButtonWithModal from '../Buttons/ButtonWithModal';
import ButtonToPage from '../Buttons/ButtonToPage';

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
    let bt = null;
    if (item.person && item.person.id) {
      bt = (
        <div>
          <ButtonToPage
            className={classes.Component_dark}
            url={`/person/${item.person.id}`}
          >
            {messages[props.language]['authors.buttonToPage.label']}
          </ButtonToPage>
        </div>
      );
    }

    let itemRole = props.roleKey;
    if (item.role) {
      itemRole = item.role.concat('-', `${props.objectType}`);
    }

    return (
      <li className="d-flex m-2" key={item}>
        <p className={`mr-auto ${classes.ModalLabel}`}>
          {
            (props.isEntity) ? item.label : item.fullName
          }
        </p>
        <p className={classes.Role}>
          {
            (props.isEntity) ? item.country : messages[props.language][itemRole]
          }
        </p>
        {bt}
      </li>
    );
  });

  const itemsHtml = <ul className="list-group list-group-flush">{items}</ul>;
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
  roleKey: '',
  modalTitleKey: 'authors.modal.title',
  isEntity: false,
};

CounterListCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string,
  limit: PropTypes.number,
  title: PropTypes.string,
  modalTitleKey: PropTypes.string,
  labelKey: PropTypes.string,
  objectType: PropTypes.string,
  roleKey: PropTypes.string,
  color: PropTypes.string,
  isEntity: PropTypes.bool,
};
