import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage, IntlProvider } from 'react-intl';

/* SCSS */
import classes from '../../Projects/Components/FilterPanel.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const message = {
  fr: messagesFr,
  en: messagesEn,
};

const SuggestionSearchForm = (props) => {
  const {
    language, fetchData, updateQuery, querySuggestionData: query,
  } = props;
  const waitInterval = 800;
  let timer = null;

  useEffect(() => {
    updateQuery(query);
  }, []);

  const onChange = useCallback((e) => {
    updateQuery(e.target.value);
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (query) {
        fetchData({ query });
      }
    }, waitInterval);
    return () => clearTimeout(timer);
  }, []);

  return (
    <IntlProvider locale={language} messages={message[language]}>
      <div className="search-suggested-productions">
        <label htmlFor="search-production" className={`${classes.TitleFilter} w-100 col-form-label-sm`}>
          <div><FormattedHTMLMessage id="search_label" /></div>
          <input type="text" value={query} className={`${classes.SearchBar} form-control form-control-sm`} id="search-production" onChange={onChange} />
        </label>
      </div>
    </IntlProvider>
  );
};

export default SuggestionSearchForm;

SuggestionSearchForm.propTypes = {
  language: PropTypes.string.isRequired,
  querySuggestionData: PropTypes.string,
  fetchData: PropTypes.func.isRequired,
  updateQuery: PropTypes.func.isRequired,
};
