/* Composants externes */
import React from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import StatusTagMedium from '../../../../../UI/StatusTagMedium/StatusTagMedium';

/* CSS */
import classes from './Address.scss';

const addressMini = props => (
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
          {`${props.address.housenumber || props.address.house_number} ${props.address.street}`}
        </span>
      </div>
      <div className="column is-11">
        <span className={classes.Text2}>
          {props.address.postcode || props.address.post_code}
          -
          {props.address.city}
        </span>
      </div>
      <div className="column is-11">
        <StatusTagMedium status={props.status} />
        {props.geocoded
          ? <span className={`is-info ${classes.Tags}`}>Géocodé</span> : null}
      </div>
    </div>
  </div>
);

export default addressMini;

addressMini.propTypes = {
  address: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  changeDisplayMode: PropTypes.func,
  geocoded: PropTypes.bool.isRequired,
  mouseOut: PropTypes.func.isRequired,
  mouseOver: PropTypes.func.isRequired,
};
