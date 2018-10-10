import 'moment/locale/fr';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './Field.css';

moment.locale('fr');

const lifeCycle = props => (
  <div className="column is-12">
    <div className={classes.LifeCycle}>
      Créée le&nbsp;
      <span className={classes.Text}>{moment(props.created_at).format('LL')}</span>
      {' par '}
      <span className={classes.Text}>{props.created_by}</span>
      <br />
      {props.modified_at
        ? `Modifiée le ${moment(props.modified_at).format('LL')} par ${props.modified_by}`
        : <i>Pas encore modifié</i>}
    </div>
  </div>);

export default lifeCycle;

lifeCycle.propTypes = {
  created_at: PropTypes.string.isRequired,
  created_by: PropTypes.string.isRequired,
  modified_at: PropTypes.string,
  modified_by: PropTypes.string,
};
