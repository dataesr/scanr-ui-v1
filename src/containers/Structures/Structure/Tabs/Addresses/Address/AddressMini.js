/* Composants externes */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import StatusTagMedium from '../../../../../../UI/StatusTagMedium/StatusTagMedium';
import Tag from '../../../../../../UI/Tag/Tag';
import Button from '../../../../../../UI/Button/Button';
/* CSS */
import classes from './Address.scss';

const addressMini = (props) => {
  let displayedAddress = (
    <div className="columns" onClick={() => props.changeDisplayMode('full')} role="presentation">
      <div className="column">
        <i className="fa fa-map-marker-alt hvr-icon" />
      </div>
      <div className="column">
        <span className={classes.Text1}>
          {props.fieldValue.input_address}
        </span>
      </div>
    </div>);
  if (props.fieldValue.geocoded) {
    displayedAddress = (
      <Fragment>
        <div className="column is-11" onClick={() => props.changeDisplayMode('full')} role="presentation">
          <i className="fa fa-map-marker-alt hvr-icon" />
          <span className={classes.Text1}>
            {`${props.fieldValue.housenumber} ${props.fieldValue.street}`}
          </span>
        </div>
        <div className="column is-11" onClick={() => props.changeDisplayMode('full')} role="presentation">
          <span className={classes.Text2}>
            {props.fieldValue.postcode}
            -
            {props.fieldValue.city}
          </span>
        </div>
      </Fragment>);
  }
  return (
    /* eslint-disable */
    <div
      className={classes.Address}
      onMouseOver={props.mouseOver}
      onMouseOut={props.mouseOut}
    >
      <div className="columns is-multiline is-marginless">
        {displayedAddress}
        <div className="columns is-gapless">
          <div className="column ">
            <div className={classes.SpaceRight}>
              <StatusTagMedium status={props.status} />
            </div>
          </div>
          {props.fieldValue.geocoded
            ? (
              <div className="column ">
                <Tag tagValue="Géocodé" color="has-background-info" />
              </div>)
            : (
              <Fragment>
                <div className="column is-multiline">
                  <Tag tagValue="Non géocodé" color="has-background-danger" />
                </div>
                <div className="column ">
                  <Button onClick={() => props.changeDisplayMode('new')}>
                    Chercher la localisation
                  </Button>
                </div>
              </Fragment>)}
        </div>
      </div>
    </div>);
};
/* eslint-enable */

export default addressMini;

addressMini.propTypes = {
  fieldValue: PropTypes.object,
  changeDisplayMode: PropTypes.func,
  mouseOut: PropTypes.func,
  mouseOver: PropTypes.func,
  status: PropTypes.string,
};
