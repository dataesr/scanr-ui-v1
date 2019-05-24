import React from 'react';
import { IntlProvider, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Filters.scss';


const EntityFilters = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };
  console.log(props.facets);
  const typeFacets = props.facets.find(item => item.id === 'facet_natures') || {entries: []}
  console.log(typeFacets);
  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className="d-flex flex-column mt-1 mb-3 pr-3">
        <div className="p-2" />
        <div>
          <FormattedHTMLMessage id="filters.localisation" defaultMessage="filters.localisation" />
        </div>
        <div>
          <FormattedHTMLMessage id="filters.localisationDetails" defaultMessage="filters.localisationDetails" />
        </div>
        <div className="d-flex flex-column mb-3">
          <FormattedMessage id="filters.placeholder" defaultMessage="filters.placeholder">
            { placeholder => (
              <div>
                <input type="text" className={`mt-1 pl-2 ${classes.SearchBar}`} placeholder={placeholder} />
                <button className={classes.SearchButton} type="button">
                  <i className={`fas fa-search ${classes.SearchIcon}`} />
                </button>
              </div>
            )}
          </FormattedMessage>
        </div>
        <div className="d-flex flex-column mb-3">
          <FormattedHTMLMessage id="filters.entityType" defaultMessage="filters.entityType" />
          <select className={`mt-1 pl-2 ${classes.Select}`} id="inlineFormCustomSelect">
            <option selected>Choose...</option>
            {
              typeFacets.entries.map((facet) => {
                const a = 2
                return (
                  <option value={facet.value}>{`${facet.value} (${facet.count})`}</option>
                );
              })
            }
          </select>
        </div>
        <div className="d-flex flex-column mb-3">
          <FormattedHTMLMessage id="filters.caracteristics" defaultMessage="filters.caracteristics" />
          <select className={`mt-1 pl-2 ${classes.Select}`} id="inlineFormCustomSelect">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="d-flex flex-column mb-3">
          <FormattedHTMLMessage id="filters.caracteristics" defaultMessage="filters.caracteristics" />
          <select className={`mt-1 pl-2 ${classes.Select}`} id="inlineFormCustomSelect">
            <option selected>Choose...</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
      </div>
    </IntlProvider>
  );
};

export default EntityFilters;

EntityFilters.propTypes = {
  language: PropTypes.string.isRequired,
  facets: PropTypes.array,
};
