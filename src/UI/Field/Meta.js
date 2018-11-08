import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import classes from './Field.css';

const meta = props => (
  <div className={classes.Meta}>
    {props.fieldValue && (
    <p
      data-tip={`Créé le <b>${moment(props.fieldValue.created_at).format('LL')}</b>
      par <b>${props.fieldValue.created_by}</b>
      <br/> Modifié le <b>${moment(props.fieldValue.modified_at).format('LL')}</b>
      par <b>${props.fieldValue.modified_by}</b>`}
    >
      <i className="fas fa-info-circle" />
    </p>)}
    <ReactTooltip html />
  </div>
);

export default meta;

meta.propTypes = {
  fieldValue: PropTypes.object,
};
