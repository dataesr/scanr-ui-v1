import React from 'react';
import PropTypes from 'prop-types';

import classes from './CounterCardByType.scss';

import entityLogo from '../../../../images/svg/icon-entities.svg';
import personLogo from '../../../../images/svg/icon-persons.svg';
import projectLogo from '../../../../images/svg/icon-projects.svg';
import productionLogo from '../../../../images/svg/icon-publications.svg';

const logos = {
  entities: entityLogo,
  persons: personLogo,
  projects: projectLogo,
  publications: productionLogo,
};

const CounterCardByType = props => (
  <div className={classes.CounterCardByType}>
    <div className={classes.Img}>
      <img
        src={logos[props.logo]}
        alt="Logo MESRI"
        className={classes.Logo}
        aria-hidden
      />
    </div>
    <div className={classes.Value}>
      {props.count}
    </div>
    <div className={classes.Label}>
      {props.title}
    </div>
  </div>
);


export default CounterCardByType;

CounterCardByType.propTypes = {
  logo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  count: PropTypes.string.isRequired,
};
