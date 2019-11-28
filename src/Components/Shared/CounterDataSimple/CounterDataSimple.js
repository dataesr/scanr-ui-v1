import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import classes from './CounterDataSimple.scss';

const CounterDataSimple = props => (
  <p className={classes.CounterDataSimple}>
    <CountUp start={0} end={props.value} />
    <div className={classes.Title}>
      {props.title}
    </div>
  </p>
);

export default CounterDataSimple;

CounterDataSimple.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
};
