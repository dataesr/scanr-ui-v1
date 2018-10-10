/* Composants externes */
import React from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import StatusTagMedium from '../../../../../UI/StatusTagMedium/StatusTagMedium';

/* CSS */
import classes from './Address.scss';

const addressMini = (props) => {
  let geocoded = null;
  if (props.address.geocoded) {
    geocoded = <span className={`is-info ${classes.Tags}`}>Géocodé</span>;
  }

  return (
    <div
      className={classes.Address}
      onClick={props.changeDisplayMode}
      onMouseOver={props.mouseOver}
      onMouseOut={props.mouseOut}
    >
      <div className="columns is-gapless is-multiline is-marginless">
        <div className="column is-11">
          <i className="fa fa-map-marker-alt hvr-icon" />
          <span className={classes.Text1}>
            {props.address.address_1}
          </span>
        </div>
        <div className="column is-11">
          <span className={classes.Text2}>
            {props.address.postal_code}
            -
            {props.address.city}
          </span>
        </div>
        <div className="column is-11">
          <StatusTagMedium status={props.address.status} />
          {geocoded}
        </div>
      </div>
    </div>
  );
};

export default addressMini;

addressMini.propTypes = {
  address: PropTypes.object.isRequired,
  changeDisplayMode: PropTypes.func,
  mouseOut: PropTypes.func.isRequired,
  mouseOver: PropTypes.func.isRequired,
};
