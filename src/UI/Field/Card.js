import React from 'react';
import PropTypes from 'prop-types';

const Card = props => (
  <div className="card">
    <header className="card-header">
      <p className="card-header-title">
        RNSR ID
      </p>
    </header>
    <div className="card-content">
      <div className="content">
        <h2>{props.children}</h2>
      </div>
    </div>
  </div>
);

export default Card;

Card.propTypes = {
  children: PropTypes.string,
};
