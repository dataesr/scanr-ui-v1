import React from 'react';
import PropTypes from 'prop-types';

import ButtonToPage from '../Buttons/ButtonToPage';

import classes from './AffiliationCard.scss';

/**
 * AffiliationCard
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const AffiliationCard = props => (
  <div className={classes.Card}>
    <div className={classes.Title}>
      {
        props.label
      }
    </div>
    <div className={classes.Content}>
      {
        (props.address)
          ? (
            <div>
              <i className="fas fa-map-marker" />
              <span>
                {
                  props.address
                }
              </span>
            </div>
          ) : null
      }
      {
        (props.nature)
          ? (
            <div>
              <i className="fas fa-flask" />
              <span>
                {props.nature}
              </span>
            </div>
          ) : null
      }
      {
        (props.id)
          ? (
            <div>
              <i className="fas fa-th-large" />
              <span>
                {props.id}
              </span>
            </div>
          ) : null
      }
      <div className={classes.ButtonContainer}>
        <ButtonToPage
          className={`${classes.btn_scanrBlue} ${classes.Button}`}
          url={`entite/${props.id}`}
        >
          Fiche
        </ButtonToPage>
      </div>
    </div>
  </div>
);

export default AffiliationCard;

AffiliationCard.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  nature: PropTypes.string,
  id: PropTypes.string,
};
