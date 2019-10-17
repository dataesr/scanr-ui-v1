import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../Utils/getSelectKey';

import ButtonWithModal from '../Buttons/ButtonWithModal';
import SubmitBox from '../../SubmitBox/SubmitBox';

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

  // const submitBox = (
  //   <div className={`d-flex align-self-center ${classes.SubmitBox}`}>
  //     <button className="btn" type="button">
  //       Enrichir/Corriger
  //     </button>
  //   </div>
  // );

  return (
    <div
      className={`d-flex flex-column ${classes.SimpleCountListCard} ${props.masterKey.split('.')[0]}`}
      dataKey={props.masterKey.split('.')[1]}
    >
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
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={getSelectKey(props.allData, 'label', props.language, 'fr')} /> : null}
    </div>
  );
};

export default SimpleCountListCard;
SimpleCountListCard.defaultProps = {
  count: null,
  masterKey: 'default.default',
  modifyMode: false,
};

SimpleCountListCard.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
  count: PropTypes.number,
  title: PropTypes.string,
  label: PropTypes.string,
  tooltip: PropTypes.string,
  modalButtonLabel: PropTypes.string,
  modalButtonTitle: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
