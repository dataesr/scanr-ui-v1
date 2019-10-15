import React, { Fragment } from 'react';
// import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import ReactTooltip from 'react-tooltip';

import PropTypes from 'prop-types';

import classes from './PersonNameCard.scss';
import SubmitBox from '../../../Shared/SubmitBox/SubmitBox';
import ButtonWithModal from '../../../Shared/Ui/Buttons/ButtonWithModal';
/**
 * PersonCardName component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const PersonCardName = (props) => {
  const logo = (<div className={classes.Logo}><i className="fas fa-qrcode" aria-hidden="true" /></div>);
  const htmlList = (props.data.externalIds)
    ? props.data.externalIds.map(tag => (
      `${tag.type}: ${tag.id}`
    ))
    : null;
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;
  return (
    <div className={`d-flex flex-column pb-3 ${classes.PersonCardName}`}>
      {(props.modifyMode) ? <SubmitBox language={props.language} masterKey={props.masterKey} label={props.allData.fullName} /> : null}
      <div className={classes.Logo}>
        {logo}
      </div>
      <div className={classes.Title}>
        Name
      </div>
      <div className={classes.Label}>
        {props.data.fullName}
      </div>
      <div className={classes.Title}>
        Gender
      </div>
      <div className={classes.Label}>
        {props.data.gender}
      </div>
      <div className={`mt-auto pb-2 ${classes.Title}`}>
        External ids
      </div>
      {
        (props.data.externalIds && props.data.externalIds.length > 0)
          ? (
            <ButtonWithModal
              logo={logo}
              title="externalIds"
              buttonLabel="Voir tous les identifiants"
              dataHtml={htmlList}
            />
          )
          : 'No ids'
      }
      {tooltip}
    </div>
  );
};

export default PersonCardName;

PersonCardName.propTypes = {
  language: PropTypes.string,
  data: PropTypes.object,
  tooltip: PropTypes.string,
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
