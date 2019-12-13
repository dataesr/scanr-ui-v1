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
  const MAX_LIST = (props.maxList) ? (props.maxList) : 5;
  const shortLi = props.data.map((item, i) => {
    // Identification du Label
    const label = (item.label)
      ? item.label
      : getSelectKey(item.structure, 'label', props.language, 'fr');
    if (i < MAX_LIST) {
      return (
        /* eslint-disable-next-line */
        <li key={`${item}_${i}`}>
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
  const buttonLabel = (
    <React.Fragment>
      {props.modalButtonLabel}
      &nbsp;
      {props.data.length}
    </React.Fragment>
  );
  let modalButton = null;
  if (props.data.length > MAX_LIST) {
    modalButton = (
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
      {listItems}
      <div className={classes.Button}>
        {modalButton}
      </div>
      {tooltip}
    </div>
  );
};

export default SimpleCountListCard;
SimpleCountListCard.defaultProps = {
  count: null,
};

SimpleCountListCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  count: PropTypes.number,
  maxList: PropTypes.number,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  modalButtonLabel: PropTypes.string,
  modalButtonTitle: PropTypes.string,
};
