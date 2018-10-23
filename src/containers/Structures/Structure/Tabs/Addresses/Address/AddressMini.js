/* Composants externes */
import React from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import StatusTagMedium from '../../../../../../UI/StatusTagMedium/StatusTagMedium';
import Aux from '../../../../../../hoc/Aux';
import Tag from '../../../../../../UI/Tag/Tag';
import Button from '../../../../../../UI/Button/Button';
/* CSS */
import classes from './Address.scss';

const addressMini = (props) => {
  let displayedAddress = (
    <div className="columns" onClick={() => props.changeDisplayMode('full')}>
      <div className="column is-narrow">
        <i className="fa fa-map-marker-alt hvr-icon" />
      </div>
      <div className="column">
        <span className={classes.Text1}>
          {props.address.input_address}
        </span>
      </div>
    </div>);
  if (props.address.geocoded) {
    displayedAddress = (
      <Aux>
        <div className="column is-11" onClick={() => props.changeDisplayMode('full')}>
          <i className="fa fa-map-marker-alt hvr-icon" />
          <span className={classes.Text1}>
            {`${props.address.housenumber} ${props.address.street}`}
          </span>
        </div>
        <div className="column is-11" onClick={() => props.changeDisplayMode('full')}>
          <span className={classes.Text2}>
            {props.address.postcode}
            -
            {props.address.city}
          </span>
        </div>
      </Aux>);
  }
  return (
    <div
      className={classes.Address}
      onMouseOver={props.mouseOver}
      onMouseOut={props.mouseOut}
    >
      <div className="columns is-gapless is-multiline is-marginless">
        {displayedAddress}
        <div className="columns is-gapless">
          <div className="column is-narrow">
            <StatusTagMedium status={props.address.status} />
          </div>
          {props.address.geocoded
            ? (
              <div className="column is-narrow">
                <Tag tagValue="Géocodé" color="has-background-info" />
              </div>)
            : (
              <Aux>
                <div className="column is-multiline">
                  <Tag tagValue="Non géocodé" color="has-background-danger" />
                </div>
                <div className="column is-narrow">
                  <Button onClick={() => props.changeDisplayMode('new')}>
                    Chercher la localisation
                  </Button>
                </div>
              </Aux>)}
        </div>
      </div>
    </div>);
};

export default addressMini;

addressMini.propTypes = {
  address: PropTypes.object.isRequired,
  changeDisplayMode: PropTypes.func,
  mouseOut: PropTypes.func.isRequired,
  mouseOver: PropTypes.func.isRequired,
};
