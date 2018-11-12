import 'moment/locale/fr';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classes from './Field.scss';

moment.locale('fr');

const lifeCycle = props => (
  <div className={classes.LifeCycle} style={{ fontSize: props.size }}>
    {props.created_by || props.created_at ? 'Créé ' : ''}
    {props.created_at && (
      <span>
        le&nbsp;
        <strong>{moment(props.created_at).format('LL')}</strong>
        &nbsp;
      </span>)}
    {props.created_by && (
      <span>
        par&nbsp;
        <strong>{props.created_by}</strong>
        <br />
      </span>)}
    {props.modified_by || props.modified_at ? 'Modifié ' : ''}
    {props.modified_at && (
      <span>
        le&nbsp;
        <strong>{moment(props.modified_at).format('LL')}</strong>
        &nbsp;
      </span>)}
    {props.modified_by && (
      <span>
        par&nbsp;
        <strong>{props.modified_by}</strong>
      </span>)}
  </div>);

export default lifeCycle;

lifeCycle.propTypes = {
  created_at: PropTypes.string,
  created_by: PropTypes.string,
  modified_at: PropTypes.string,
  modified_by: PropTypes.string,
  size: PropTypes.string,
};
