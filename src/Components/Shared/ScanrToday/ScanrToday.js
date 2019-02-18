import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';

import CounterCardByType from '../CounterCards/CounterCardByType';

import classes from './ScanrToday.scss';

const ScanrToday = () => (
  <div className={classes.ScanrToday}>
    <div className="container">
      <div className="row">
        <div className="col">
          <span className={classes.Title}>
            <FormattedHTMLMessage
              id="ScanrToday.string.title"
              defaultMessage="ScanrToday.string.title"
            />
            <i className="fa fa-info" />
          </span>
        </div>
        <div className="col">
          <CounterCardByType
            schema="entity"
          />
        </div>
        <div className="col">
          <CounterCardByType
            schema="persons"
          />
        </div>
        <div className="col">
          <CounterCardByType
            schema="projects"
          />
        </div>
        <div className="col">
          <CounterCardByType
            schema="publications"
          />
        </div>
      </div>
    </div>
  </div>
);

export default ScanrToday;
