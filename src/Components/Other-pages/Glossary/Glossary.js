import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* Chargement du lexique */
import glossaryTerms from '../../Shared/Lexicon/terms/glossary.json';

/* SCSS */
import classes from './Glossary.scss';


class Glossary extends Component {
  state = {
    filter: null,
  };

  onInputChangeHandler = (e) => {
    this.setState({ filter: e.target.value });
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    let filteredGlossaryTerms = glossaryTerms;
    if (this.state.filter) {
      filteredGlossaryTerms = glossaryTerms.filter(el => (el.label[this.props.language].toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1));
    }

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div className={`container-fluid ${classes.Glossary}`}>
          <Header
            language={this.props.language}
            switchLanguage={this.props.switchLanguage}
          />
          <section>
            <HeaderTitle
              language={this.props.language}
              labelkey="glossary"
            />
          </section>
          <section className={classes.Content}>
            <div className="container">
              <div>
                <i className="fas fa-search" />
                <h2 className={classes.SearchInputTitle}><FormattedHTMLMessage id="searchInputTitle" /></h2>
              </div>
              <div>
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onInputChangeHandler}
                />
              </div>

              <ul className={classes.Content}>
                {
                  filteredGlossaryTerms.map(termObject => (
                    <li key={termObject.key} id={termObject.key} className={classes.Li}>
                      <h3 className={classes.Term}>
                        <i className="fas fa-bookmark" />
                        &nbsp;
                        {termObject.label[this.props.language]}
                      </h3>
                      <p className={classes.Definition}>
                        {termObject.definition[this.props.language]}
                      </p>
                      <hr />
                    </li>
                  ))
                }
              </ul>
            </div>
          </section>
          <aside className={classes.ThreeCards}>
            <div className="container">
              <div className="row">
                <CardWithButton
                  language={this.props.language}
                  schema="scanrdeepblueColorCards"
                  title="Discover.TalkAboutScanr"
                  url="https://worldwide.espacenet.com/?locale=fr_EP"
                  lib_button="Voir"
                />
                <CardWithButton
                  language={this.props.language}
                  schema="scanrdeepblueColorCards"
                  title="Discover.Sources"
                  url="https://worldwide.espacenet.com/?locale=fr_EP"
                  lib_button="Voir"
                />
                <CardWithButton
                  language={this.props.language}
                  schema="scanrdeepblueColorCards"
                  title="Discover.Team"
                  url="https://worldwide.espacenet.com/?locale=fr_EP"
                  lib_button="Voir"
                />
              </div>
            </div>
          </aside>
          <Banner
            language={this.props.language}
            labelKey="Appear"
            cssClass="BannerDark"
            url=""
          />
          <Footer language={this.props.language} />
        </div>
      </IntlProvider>
    );
  }
}

export default Glossary;

Glossary.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
