import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../Utils/getSelectKey';

import ButtonWithModal from '../Buttons/ButtonWithModal';

import classes from './SimpleCountListCard.scss';

/**
 * SimpleCountListCard component
 * Url : .
 * Description : Carte avec count, titre, label, list et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const getLabel = (item, lang) => {
  const label = (item.label)
    ? item.label
    : getSelectKey(item.structure, 'label', lang, 'fr');

  let label2 = label;
  if (item.id) {
    label2 = (
      <a title={label} href={`/entite/${item.id}`} className={classes.Link}>
        {label}
      </a>
    );
  } else if (item.structure && item.structure.id) {
    label2 = (
      <a title={label} href={`/entite/${item.structure.id}`} className={classes.Link}>
        {label}
      </a>
    );
  }
  return label2;
};

const SimpleCountListCard = (props) => {
  const MAX_LIST_CARD = props.maxList;

  const MAX_LIST_MODAL = 15;

  const shortLi = props.data.map((item, i) => {
    if (i < MAX_LIST_CARD) {
      return (
        /* eslint-disable-next-line */
        <li key={`${item}_${i}`}>
          <i className={`fas fa-chevron-circle-right pr-2 ${classes.Puce}`} />
          {getLabel(item, props.language)}
        </li>
      );
    }
    return null;
  });

  const FullLi = props.data.map((item) => {
    const label = getLabel(item, props.language);
    if (label) {
      return (
        <li key={item}>
          <span className="fa-li">
            <i className={`fas fa-chevron-circle-right ${classes.Puce}`} />
          </span>
          {label}
        </li>
      );
    }
    return null;
  });

  const dataHtmlList = <ul className="fa-ul">{FullLi}</ul>;

  const buttonLabel = (
    <React.Fragment>
      {props.modalButtonLabel}
    </React.Fragment>
  );

  let actionButton = null;

  if (props.data.length > MAX_LIST_CARD && props.data.length < MAX_LIST_MODAL) {
    actionButton = (
      <ButtonWithModal
        logo="fas fa-qrcode"
        title={props.modalButtonTitle}
        buttonLabel={buttonLabel}
        dataHtml={dataHtmlList}
      />
    );
  } else if (props.data.length > MAX_LIST_MODAL && props.entityLabel) {
    actionButton = (
      <a
        className={`btn ${classes.btn_scanrBlue}`}
        type="button"
        href={`/recherche/structures?filters=%7B%22institutions.structure.label.fr%22%3A%7B%22type%22%3A%22MultiValueSearchFilter%22%2C%22op%22%3A%22all%22%2C%22values%22%3A%5B%22${props.entityLabel}%22%5D%7D%7D&query=&sort&view=list`}
      >
        {buttonLabel}
        <i className="fas fa-search ml-2" />
      </a>
    );
  } else if (props.data.length > MAX_LIST_MODAL && !props.entityLabel) {
    actionButton = (
      <ButtonWithModal
        logo="fas fa-qrcode"
        title={props.modalButtonTitle}
        buttonLabel={buttonLabel}
        dataHtml={dataHtmlList}
      />
    );
  }

  const listItems = (shortLi) ? <ul className="fa-ul">{shortLi}</ul> : null;

  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
    </Fragment>
  ) : null;

  return (
    <div className={`d-flex flex-column ${classes.SimpleCountListCard}`}>
      <div className={classes.Title}>
        {props.title}
      </div>
      <div className={classes.Value}>
        {(props.count || props.data.length)}
      </div>
      <div className={classes.Label}>
        {props.label}
      </div>
      <hr className={classes.Hr} />
      {listItems}
      <div className={classes.Button}>
        {actionButton}
      </div>
      {tooltip}
    </div>
  );
};

export default SimpleCountListCard;

SimpleCountListCard.defaultProps = {
  count: null,
  maxList: 4,
  tooltip: '',
};

SimpleCountListCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  count: PropTypes.number,
  maxList: PropTypes.number,
  title: PropTypes.string,
  label: PropTypes.string,
  entityLabel: PropTypes.string,
  tooltip: PropTypes.string,
  modalButtonLabel: PropTypes.string,
  modalButtonTitle: PropTypes.string,
};
