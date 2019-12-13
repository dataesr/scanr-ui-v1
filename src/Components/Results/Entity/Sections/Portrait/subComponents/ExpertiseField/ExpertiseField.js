import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

import classes from './ExpertiseField.scss';


/**
 * ExpertiseField
 * Url : ex: /entite/200711886U
 * Description : Bloc Domaines d'expertise visible dans la section Protrait
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const ExpertiseField = (props) => {
  let styleCss = null;
  if (props.data.length === 0) {
    styleCss = {
      display: 'none',
    };
  }

  return (
    <div className="col-6" style={styleCss}>
      <div className={classes.ExpertiseField}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle
              title={<FormattedHTMLMessage id="Entity.Portrait.ExpertiseField.title" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertiseField;
ExpertiseField.defaultProps = {
  data: [],
};
ExpertiseField.propTypes = {
  data: PropTypes.array,
};
