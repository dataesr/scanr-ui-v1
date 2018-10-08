/* Composants externes */
import React from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import Button from '../../../../../UI/Button/Button';

import StatusTagMedium from '../../../../../UI/StatusTagMedium/StatusTagMedium';

/* CSS */
import classes from './Address.scss';

const addressMini = (props) => {
  let geocoded = null;
  if (props.address.geocoded) {
    geocoded = <span className={`is-info ${classes.Tags}`}>Géocodé</span>;
  }

  return (
    <div className={classes.Address}>
      <div className="columns is-gapless is-multiline is-marginless">
        <div className="column is-11">
          <i className="fa fa-map-marker-alt hvr-icon" />
          <span className={classes.Text1}>
            {props.address.address_1}
          </span>
        </div>
        <div className="column is-1">
          <Button onClick={null}>
            <i className="fas fa-pen" />
          </Button>
        </div>

        <div className="column is-11">
          <span className={classes.Text2}>
            {props.address.postal_code}
            -
            {props.address.city}
          </span>
        </div>
        <div className="column is-1">
          <Button onClick={null}>
            <i className="fas fa-trash-alt" />
          </Button>
        </div>

        <div className="column is-11">
          <StatusTagMedium status={props.address.status} />
          {geocoded}
        </div>
        <div className="column is-1">
          <Button onClick={() => props.changeDisplayMode('full')}>
            ...
          </Button>
        </div>
      </div>
    </div>
  );
};

export default addressMini;

addressMini.propTypes = {
  address: PropTypes.object.isRequired,
  changeDisplayMode: PropTypes.func,
};
