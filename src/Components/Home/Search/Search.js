import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import ButtonMiniDarkToSearch from '../../Shared/Ui/Buttons/ButtonMiniDarkToSearch';
// import LogoScanrWhiteSVG from '../../Shared/svg/logo-scanr-white';
import LogoScanrWhiteSVG from '../../Shared/svg/logo-scanr-v2';

import classes from './Search.scss';

/* COULEURS */
import {
  ENTITY_COLOR,
  PERSON_COLOR,
  PROJECT_COLOR,
  PUBLICATION_COLOR,
} from '../../../config/config';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

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

  /* eslint-disable */
  renderForm = () => (
    <form onSubmit={this.submitResearch}>
      <div className="row d-flex flex-nowrap my-4">
        <div className="flex-grow-1 p-0">
          <FormattedMessage id="Search.PlaceHolder" defaultMessage="Search.PlaceHolder">
            { placeholder => <input type="text" className="form-control" id="query" placeholder={placeholder} /> }
          </FormattedMessage>
        </div>
        <div className="pl-1">
          <button
            type="submit"
            className={`btn ${classes.btn_dark}`}
            aria-label="Lancer la recherche"
            >
            <i className="fas fa-search" aria-hidden />
          </button>
        </div>
      </div>
    </form>
  );
  /* eslint-enable */

  renderFull = () => {
    const randomNumber = Math.floor(Math.random() * 4);
    const schemasPowders = ['entities', 'persons', 'projects', 'publications'];
    const schemasColors = [ENTITY_COLOR, PERSON_COLOR, PROJECT_COLOR, PUBLICATION_COLOR];
    const color = schemasColors[randomNumber];
    const bgUrl = `./img/poudre-header-home-${schemasPowders[randomNumber]}.jpg`;
    const sectionStyle = {
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: '500px',
    };
    /* eslint-disable */
    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section style={sectionStyle} className={`animated fadeIn faster ${classes.SearchFull}`}>
            <div className="container">
              <h1 className={classes.Logo} aria-label="scanr, le moteur de la recherche et de l'innovation">
                <LogoScanrWhiteSVG fill={color} />
              </h1>
              {this.renderForm()}
              <div className="row">
                <div className="col-xs">
                  <div className={classes.Suggest}>
                    <FormattedHTMLMessage id="Search.Suggest" defaultMessage="Search.Suggest" />
                    <ul>
                      {
                        this.props.suggests.map(suggest => (
                          <li>
                            <a href={`recherche/all?query=${suggest.label}`}>
                              <ButtonMiniDarkToSearch key={suggest.label}>{suggest.label}</ButtonMiniDarkToSearch>
                            </a>
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                </div>
                {/*
                <div className="col">
                  <p className={classes.HowTo}>
                    <FormattedHTMLMessage id="Search.HowTo" defaultMessage="Search.HowTo" />
                  </p>
                </div>
                */}
              </div>
            </div>
          </section>
      </IntlProvider>
    );
    /* eslint-enable */
  }

  renderMini = () => (
    <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
      <section className={`animated slideInDown faster ${classes.SearchMini}`}>
        <div className="container">
          {this.renderForm()}
        </div>
      </section>
    </IntlProvider>
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
  suggests: PropTypes.array,
};
Search.defaultProps = {
  isFull: true,
  suggests: [
    {
      label: '5G',
      url: '',
    },
    {
      label: 'Réchauffement climatique',
      url: '',
    },
    {
      label: 'Biotechnologie',
      url: '',
    },
    {
      label: 'Ebola',
      url: '',
    },
  ],
};
