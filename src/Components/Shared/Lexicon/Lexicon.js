import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Lexicon.scss';

class Lexicon extends Component {
  state={
    opened: false,
  };

  showPane = () => {
    this.setState(prevState => ({ opened: !prevState.opened }));
  }

  render() {
    return (
      <div className={`${classes.Lexicon} ${this.props.className}`}>
        <span className={classes.TextInfo}>
          Glossaire/FAQ
        </span>
        <button
          type="button"
          className={classes.Button}
          onClick={this.showPane}
        >
          i
        </button>
      </div>
    );
  }
}

export default Lexicon;

Lexicon.propTypes = {
  className: PropTypes.string,
};
