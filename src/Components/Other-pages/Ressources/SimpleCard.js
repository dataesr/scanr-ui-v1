import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* SCSS */
import classes from './SimpleCard.scss';

/**
 * SimpleCard
 * Url :
 * Description :
 * Accessible : .
 * Tests unitaires : .
*/
const SimpleCard = props => (
  <div className={classes.card}>
    <div className={classes.Title}>
      <FormattedHTMLMessage
        id={props.labelKey}
        defaultMessage={props.labelKey}
      />
    </div>
  </div>
);


export default SimpleCard;

SimpleCard.propTypes = {
  labelKey: PropTypes.string,
};
