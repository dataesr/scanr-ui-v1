import React, { Fragment } from 'react';
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

const RoleCard = ({ data }) => {
  const { label, id, role } = data;
  const logo = (<div className={classes.Logo}><i className="fas fa-qrcode" aria-hidden="true" /></div>);
  return (
    <Fragment>
      <div className={`d-flex flex-column pb-1 ${classes.RoleCard}`}>
        {logo}
        <div className={classes.Title}>
          {role.role}
        </div>
        <div className={classes.Title}>
          <FormattedDate value={new Date(role.fromDate)} year="numeric" />
          <span> -- ...</span>
        </div>
        <div className={`mt-auto ${classes.Label}`}>
          {label}
        </div>
        <div className="px-5 py-2">
          <ButtonToPage
            url={`entite/${id}`}
            className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
          >
            <FormattedHTMLMessage id="Person.RoleCard.seePage" />
          </ButtonToPage>
        </div>
      </div>
    </Fragment>
  );
};

export default RoleCard;

RoleCard.propTypes = {
  data: PropTypes.object,
};
