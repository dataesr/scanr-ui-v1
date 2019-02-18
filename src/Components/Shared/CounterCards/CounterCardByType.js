import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './CounterCardByType.scss';

class CounterCardByType extends Component {

  render() {
    return(
      <div className={classes.CounterCardByType}>
        {this.props.schema}
      </div>
    );
  }
}

export default CounterCardByType;

CounterCardByType.propTypes = {
  schema: PropTypes.string.isRequired,
};
