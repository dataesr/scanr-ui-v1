import React from 'react';
import PropTypes from 'prop-types';
// import CountUp from 'react-countup';

import SearchBar from './Search-bar/Search-bar';

import classes from './Header.css';


const header = props => (
  <div className={`${classes.Header}`}>

    <div className="columns">
      <div className="column">
        <SearchBar searchTextHandler={props.searchTextHandler} />
      </div>
      <div className="column">
        <nav className="level">
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Structures</p>
              <p className="title">
                {/*
                  <CountUp start={0} end={props.nStructures} />
                  */}
                {props.nStructures}
              </p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading">Conflits</p>
              <p className="title">-</p>
            </div>
          </div>
          <div className="level-item has-text-centered">
            <div>
              <p className="heading" />
              <p className="title" />
            </div>
          </div>
        </nav>
      </div>
    </div>


  </div>
);

export default header;

header.propTypes = {
  searchTextHandler: PropTypes.func.isRequired,
  nStructures: PropTypes.number.isRequired,
};
