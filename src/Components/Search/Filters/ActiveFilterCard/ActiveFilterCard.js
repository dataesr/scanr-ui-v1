import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from '../translations/fr.json';
import messagesEn from '../translations/en.json';

import classes from './ActiveFilterCard.scss';

const ActiveFilterCard = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  const filters = (props.filters) ? props.filters : {};
  let count = 0;
  const filteredFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key].type === 'MultiValueSearchFilter') {
      filteredFilters[key] = filters[key];
    }
  });
  const activeFilters = Object.keys(filteredFilters).map(key => (
    filters[key].values.map((value) => {
      count += 1;
      return (
        <div
          key={key}
          className={`badge badge-pill p-2 mt-1 mr-2 d-flex ${classes.deleteFilter}`}
        >
          <div className={`justify-content-start ${classes.deleteFilterTxt}`}>
            {value}
          </div>
          <i
            className={`fas fa-times ml-3 ${classes.closeIcon}`}
            onClick={() => props.multiValueFilterHandler(key, value)}
            onKeyPress={() => props.multiValueFilterHandler(key, value)}
            role="button"
            tabIndex={0}
          />
        </div>
      );
    })
  ));
  const shouldPrintActiveFilters = (counter) => {
    if (counter > 0) {
      return (
        <div className={classes.FilterHeaders}>
          <div className="d-flex flex-wrap mt-2 mb-2 p-1">
            {activeFilters}
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`p-3 mb-2 ${classes.ActiveFiltersContainer}`}>
        <div className={`d-flex flex-nowrap align-items-center ${classes.FilterHeaders}`}>
          <FormattedHTMLMessage id="filterPanel.activeFilters" defaultMessage="filterPanel.activeFilters" />
          <span>{` - (${count})`}</span>
          <button
            type="button"
            onClick={() => props.activateFilters(!props.isActive)}
            className={`ml-auto mr-2 ${classes.ActivateFiltersBtn} ${classes[(props.isMobile) ? 'Visible' : 'Hidden']}`}
          >
            <i className={`fas fa-angle-${(props.isActive) ? 'down' : 'up'}`} />
          </button>
        </div>
        {shouldPrintActiveFilters(count)}
      </div>
    </IntlProvider>
  );
};

export default ActiveFilterCard;

ActiveFilterCard.propTypes = {
  language: PropTypes.string.isRequired,
  multiValueFilterHandler: PropTypes.func,
  filters: PropTypes.object,
  isActive: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  activateFilters: PropTypes.func,
};
