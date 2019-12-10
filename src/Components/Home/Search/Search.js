import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedHTMLMessage } from 'react-intl';

import ButtonMiniDarkToSearch from '../../Shared/Ui/Buttons/ButtonMiniDarkToSearch';
import LogoScanrWhiteSVG from '../../Shared/svg/logo-scanr-white';
import background from '../../../images/img/poudre-blanche_Fbleu-A.jpg';
import { suggestions } from '../../../config/CurrentThemesAndSuggestions';

import classes from './Search.scss';

/* COULEURS */
import styles from '../../../style.scss';

/**
 * Search
 * Url : /
 * Description : Bloc de recherche présent sur toutes les pages
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Search extends Component {
  submitResearch = (e) => {
    e.preventDefault();
    const query = e.target.query.value;
    this.props.history.push(`/recherche/all?query=${query}`);
  }

  renderForm = () => (
    <form onSubmit={this.submitResearch}>
      <div className="d-flex flex-nowrap mt-3">
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
        </div>
      </div>
    </form>
  );

  renderFull = () => {
    const sectionStyle = {
      backgroundImage: `url(${background})`,
      backgroundSize: '900px',
    };

    return (
      <section style={sectionStyle} className={`animated fadeIn faster ${classes.SearchFull}`}>
        <div className="container">
          <FormattedHTMLMessage id="Home.Search.logo.aria">
            { label => (
              <h1 className={classes.Logo} aria-label={label}>
                <LogoScanrWhiteSVG fill={styles.entityColor} width="280px" />
              </h1>
            )}
          </FormattedHTMLMessage>

          {this.renderForm()}
          <div className={`pt-1 pl-1 ${classes.Suggest}`}>
            <FormattedHTMLMessage id="Home.Search.suggest" />
            <ul>
              {
                suggestions.map(suggest => (
                  <li>
                    <a href={`recherche/all?query=${suggest.query}`}>
                      {
                        (this.props.language === 'fr')
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
  }

  renderMini = () => (
    <section className={`animated slideInDown faster ${classes.SearchMini}`}>
      <div className="container pb-3">
        {this.renderForm()}
      </div>
    </section>
  );

  render() {
    const content = (this.props.isFull) ? (this.renderFull()) : (this.renderMini());

    return (
      <Fragment>
        {content}
      </Fragment>
    );
  }
}

export default Search;

Search.propTypes = {
  history: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  isFull: PropTypes.bool,
};
