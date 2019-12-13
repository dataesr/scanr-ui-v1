import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';


import classes from './ActiveFilterCard.scss';

const ActiveFilterCard = (props) => {
  const filters = (props.filters) ? props.filters : {};
  let count = 0;
  const filteredFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key].type === 'MultiValueSearchFilter') {
      filteredFilters[key] = filters[key];
    } else {
      count += 1;
    }
  });
  Object.keys(filteredFilters).map(key => (
    filters[key].values.forEach(() => { count += 1; })
  ));


  return (
    <div className={`p-3 mb-2 ${classes.ActiveFiltersContainer}`}>
      <div className={`d-flex flex-nowrap align-items-center ${classes.FilterHeaders}`}>
        <FormattedHTMLMessage id="Search.Filters.activeFilters" />
        <div className="pl-2">{` - ${count}`}</div>
        <button
          type="button"
          onClick={() => props.activateFilters(!props.isActive)}
          className={`ml-auto mr-2 ${classes.ActivateFiltersBtn} ${classes[(props.isMobile) ? 'Visible' : 'Hidden']}`}
        >
          <i className={`fas fa-angle-${(props.isActive) ? 'down' : 'up'}`} />
        </button>
      </div>
    </div>
  );
};

export default ActiveFilterCard;

ActiveFilterCard.propTypes = {
  filters: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  activateFilters: PropTypes.func,
};
