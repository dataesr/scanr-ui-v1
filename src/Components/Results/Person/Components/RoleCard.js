import React, { Fragment } from 'react';
import ReactTooltip from 'react-tooltip';
import { FormattedHTMLMessage, FormattedDate } from 'react-intl';
import PropTypes from 'prop-types';

import classes from './RoleCard.scss';
import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';


/**
 * RoleCard component
 * Url : .
 * Description : Carte avec logo, titre, label et tooltip
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/

const RoleCard = (props) => {
  const label = props.data.description.split('_')[0];
  const id = props.data.description.split('__')[2];
  const logo = (<div className={classes.Logo}><i className="fas fa-qrcode" aria-hidden="true" /></div>);
  const singleDate = (<FormattedDate value={new Date(props.data.startDate)} year="numeric" /> === <FormattedDate value={new Date(props.data.endDate)} year="numeric" />);
  const tooltip = (props.tooltip) ? (
    <Fragment>
      <span className={classes.Tooltip_i_top_right} data-tip={props.tooltip}>i</span>
      <ReactTooltip html />
    </Fragment>
  ) : null;
  return (
    <Fragment>
      <div className={`d-flex flex-column pb-1 ${classes.RoleCard}`}>
        {logo}
        <div className={classes.Title}>
          {props.data.role}
        </div>
        <div className={classes.Title}>
          {
            (singleDate)
              ? <FormattedDate value={new Date(props.data.startDate)} year="numeric" />
              : (
                <div>
                  <FormattedDate value={new Date(props.data.startDate)} year="numeric" />
                  {
                    (props.data.endDate)
                      ? (
                        <React.Fragment>
                          <span>--</span>
                          <FormattedDate value={new Date(props.data.endDate)} year="numeric" />
                        </React.Fragment>
                      )
                      : null
                  }
                </div>
              )
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
                  <FormattedHTMLMessage id="Person.RoleCard.seePage" />
                </ButtonToPage>
              )
              : props.data.id
          }
        </div>
        {tooltip}
      </div>
    </Fragment>
  );
};

export default RoleCard;

RoleCard.propTypes = {
  data: PropTypes.object,
  tooltip: PropTypes.string,
};
