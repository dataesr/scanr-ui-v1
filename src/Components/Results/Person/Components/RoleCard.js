import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
// import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { IntlProvider } from 'react-intl';
import moment from 'moment';
import 'moment/locale/fr';

import PropTypes from 'prop-types';

import classes from './RoleCard.scss';
import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * RoleCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const RoleCard = (props) => {
  moment.locale(props.language);
  const label = props.data.description.split('_')[0];
  const id = props.data.description.split('__')[2];
  const logo = (<div className={classes.Logo}><i className="fas fa-qrcode" aria-hidden="true" /></div>);
  const singleDate = (moment(props.data.startDate).format('YYYY') === moment(props.data.endDate).format('YYYY'));
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;
  return (
    <Fragment>
      <IntlProvider locale={props.language} messages={messages[props.language]}>
        <div className={`d-flex flex-column pb-1 ${classes.RoleCard}`}>
          {logo}
          <div className={classes.Title}>
            {props.data.role}
          </div>
          <div className={classes.Title}>
            {
              (singleDate)
                ? moment(props.data.startDate).format('YYYY')
                : `${moment(props.data.startDate).format('YYYY')} -- ${moment(props.data.endDate).format('YYYY')}`
            }
          </div>
          <div className={`mt-auto ${classes.Label}`}>
            {label}
          </div>
          <div className="px-5 py-2">
            {
              (id)
                ? (
                  <ButtonToPage
                    url={`entite/${id}`}
                    className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                  >
                  Voir la fiche
                  </ButtonToPage>
                )
                : props.data.id
            }
          </div>
          {tooltip}
        </div>
      </IntlProvider>
    </Fragment>
  );
};

export default RoleCard;

RoleCard.propTypes = {
  language: PropTypes.string,
  data: PropTypes.object,
  tooltip: PropTypes.string,
};
