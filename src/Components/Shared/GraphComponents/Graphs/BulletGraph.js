import React from 'react';
import PropTypes from 'prop-types';

import classes from './BulletGraph.scss';


const BulletGraph = props => (
  <div className="container-fluid">
    <div className="d-flex flex-wrap justify-content-between">
      {
        props.data.entries.map(entry => (
          <div className={`d-flex flex-column align-items-center justify-content-end pb-3 ${classes.BulletBlock}`}>
            <div className="font-weight-bold">{entry.count}</div>
            {/* eslint-disable-next-line */}
            <div style={{ lineHeight: 0, fontSize: (entry.count / 1000) + 'em' }}>
              <i className={`fas fa-circle ${classes.Bullet}`} />
            </div>
            <div>{entry.value}</div>
          </div>
        ))
      }
    </div>
  </div>
);

export default BulletGraph;

BulletGraph.propTypes = {
  // language: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};
