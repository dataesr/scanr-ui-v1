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
  const activeFilters = Object.keys(filters).map(key => (
    filters[key].values.map((value) => {
      count += 1;
      return (
        <div
          key={key}
          className={`badge badge-pill p-2 mt-1 d-flex ${classes.deleteFilter}`}
        >
          <div className={`justify-content-start ${classes.deleteFilterTxt}`}>
            {value}
          </div>
          <i
            className={`fas fa-times ml-auto ${classes.closeIcon}`}
            onClick={() => props.multiValueFilterHandler(key, value)}
            onKeypress={() => props.multiValueFilterHandler(key, value)}
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
          <div className="d-flex flex-column mt-2 mb-2 p-1">
            {activeFilters}
          </div>
        </div>
      );
    }
    return null;
  };


  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`p-3 mb-2 mr-1 ${classes.ActiveFiltersContainer}`}>
        <div className={classes.FilterHeaders}>
          <FormattedHTMLMessage id="filterPanel.activeFilters" defaultMessage="filterPanel.activeFilters" />
          <span>{` - (${count})`}</span>
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
};
