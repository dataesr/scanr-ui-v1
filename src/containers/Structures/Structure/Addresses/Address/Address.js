/* Composants externes */
import React from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import Aux from '../../../../../hoc/Aux';
import Button from '../../../../../UI/Button/Button';

/* CSS */
import classes from './Address.scss';

const address = (props) => {
  let status = null;
  let color = '';

  switch (props.address.status) {
    case 'old':
      color = 'old_bg_color';
      break;
    case 'main':
      color = 'main_bg_color';
      break;
    case 'active':
      color = 'active_bg_color';
      break;
    default:
      color = 'undefined_bg_color';
  }

  status = <span className={`${classes.Tags} ${classes[color]}`}>{props.address.status}</span>;

  let geocoded = null;
  if (props.address.geocoded) {
    geocoded = <span className={`is-info ${classes.Tags}`}>Géocodé</span>;
  }

  return (
    <Aux>
      <div className={classes.Address}>
        <div>
          <div className={classes.ColumnLeft}>
            <i className="fa fa-map-marker-alt hvr-icon" />
            <span className={classes.Text1}>
              {props.address.address_1}
            </span>
          </div>
          <div className={classes.ColumnRight}>
            <Button onClick={null}>
              <i className="fas fa-pen" />
            </Button>
          </div>
        </div>
        <div>
          <div className={classes.ColumnLeft}>
            <span className={classes.Text2}>
              {props.address.postal_code}
              -
              {props.address.city}
            </span>
          </div>
          <div className={classes.ColumnRight}>
            <Button onClick={null}>
              <i className="fas fa-trash-alt" />
            </Button>
          </div>
        </div>
        <div>
          <div className={classes.ColumnLeft}>
            {status}
            {geocoded}
          </div>
          <div className={classes.ColumnRight}>
            <Button onClick={null}>
              ...
            </Button>
          </div>
        </div>
      </div>
    </Aux>
  );
};

export default address;

address.propTypes = {
  address: PropTypes.object.isRequired,
};
