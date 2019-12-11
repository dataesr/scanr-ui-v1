import React from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';
import classes from './PileCard.scss';
// import styles from '../../../../style.scss';
/**
 * PileCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const PileCard = (props) => {
  const percent = `${props.percents}%`;
  let color = '#5dd99d';
  let status = 'running';
  if (props.percents === 100) {
    color = '#e74253';
    status = 'over';
  }

  return (
    <div className={classes.card}>
      <div className={classes.Title}>
        {<FormattedHTMLMessage id={`Project.PileCard.${status}`} />}
      </div>
      <div className="d-flex align-items-center justify-content-center">
        <div className={classes.Pile} style={{ borderColor: color }}>
          <div className={classes.PileFill} style={{ width: percent, backgroundColor: color }} />
        </div>
        <div className={classes.PileExtend} style={{ backgroundColor: color }} />
      </div>
    </div>
  );
};

export default PileCard;

PileCard.propTypes = {
  percents: PropTypes.number.isRequired,
};
