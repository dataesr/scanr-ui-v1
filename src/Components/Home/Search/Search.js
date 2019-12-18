import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedHTMLMessage } from 'react-intl';

import LexiconModal from '../../Shared/Lexicon/LexiconModal/LexiconModal';
import ButtonMiniDarkToSearch from '../../Shared/Ui/Buttons/ButtonMiniDarkToSearch';
import { suggestions } from '../../../config/CurrentThemesAndSuggestions';

import { Separator } from './styles'
import classes from './Search.scss';
import styles from '../../../style.scss';

/**
 * Search
 * Url : /
 * Description : Bloc de recherche présent sur toutes les pages
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Search = (props) => {
  const submitResearch = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    props.history.push(`/recherche/all?query=${query}`);
  };
  return (
    <section className={classes.SearchFull}>
      <div className="container py-4">
        <div className="d-flex flex-column pt-5 pb-2">
          <h1 className={classes.mainTitle}>
            <FormattedHTMLMessage id="Home.Search.title" />
          </h1>
        </div>
        <div className="d-flex w-50 m-auto">
          <Separator color="entity" />
          <Separator color="person" />
          <Separator color="projects" />
          <Separator color="production" />
        </div>
        <form onSubmit={submitResearch}>
          <div className="d-flex flex-nowrap mt-3 px-5">
            <div className="flex-grow-1 p-0">
              <FormattedHTMLMessage id="Home.Search.placeholder">
                { placeholder => (
                  <input
                    type="text"
                    className={`${classes.inputBar} form-control`}
                    id="query"
                    placeholder={placeholder}
                  />
                )}
              </FormattedHTMLMessage>
            </div>
            <div className="pl-1">
              <FormattedHTMLMessage id="Home.Search.launchNew">
                { launch => (
                  <button
                    type="submit"
                    className={`btn ${classes.btn_dark} ${classes.BtnSearch}`}
                    aria-label={launch}
                  >
                    <i className="fas fa-search" aria-hidden />
                  </button>
                )}
              </FormattedHTMLMessage>
              &nbsp;
              <LexiconModal target="Search">
                <i className="fa fa-info-circle" />
              </LexiconModal>
            </div>
          </div>
        </form>
        <div className={`pt-1 px-5 ${classes.Suggest}`}>
          <FormattedHTMLMessage id="Home.Search.suggest" />
          <ul>
            {
              suggestions.map(suggest => (
                <li>
                  <a href={`recherche/all?query=${suggest.query}`}>
                    {
                      (props.language === 'fr')
                        ? (<ButtonMiniDarkToSearch key={suggest.labelFr}>{suggest.labelFr}</ButtonMiniDarkToSearch>)
                        : (<ButtonMiniDarkToSearch key={suggest.labelEn}>{suggest.labelEn}</ButtonMiniDarkToSearch>)}
                  </a>
                </li>
              ))
              }
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Search;

Search.propTypes = {
  history: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
