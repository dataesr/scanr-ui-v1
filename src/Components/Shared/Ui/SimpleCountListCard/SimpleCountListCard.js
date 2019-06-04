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
const SimpleCountListCard = (props) => {
  const MAX_LIST = 2;
  const shortLi = props.data.map((item, i) => {
    // Identification du Label
    const label = (item.label)
      ? item.label
      : getSelectKey(item.structure, 'label', props.language, 'fr');
    if (i < MAX_LIST) {
      return (
        <li key={item}>
          <span className="fa-li">
            <i className="fas fa-chevron-circle-right" />
          </span>
          {label}
        </li>
      );
    }
    return null;
  });

  const FullLi = props.data.map((item) => {
    // Identification du Label
    const label = (item.label)
      ? item.label
      : getSelectKey(item.structure, 'label', props.language, 'fr');
    return (
      <li key={item}>
        <span className="fa-li">
          <i className="fas fa-chevron-circle-right" />
        </span>
        {label}
      </li>
    );
  });
  const dataHtmlList = <ul className="fa-ul">{FullLi}</ul>;

  let modalButton = null;
  if (props.data.length > MAX_LIST) {
    modalButton = (
      <ButtonWithModal
        logo="fas fa-qrcode"
        title={props.modalButtonTitle}
        buttonLabel={`${props.modalButtonLabel} (${props.data.length})`}
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
    <div className={classes.SimpleCountListCard}>
      <div className={classes.Title}>
        {props.title}
      </div>
      <div className={classes.Value}>
        {props.data.length}
      </div>
      <div className={classes.Label}>
        {props.label}
      </div>
      {listItems}
      {modalButton}
      {tooltip}
    </div>
  );
};

export default SimpleCountListCard;

SimpleCountListCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  modalButtonLabel: PropTypes.string,
  modalButtonTitle: PropTypes.string,
};
