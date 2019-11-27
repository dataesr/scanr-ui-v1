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
import faqTerms from '../../Shared/Lexicon/terms/faq.json';

/* SCSS */
import classes from './FAQ.scss';


class FAQ extends Component {
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

    let filteredFaqTerms = faqTerms;
    if (this.state.filter) {
      filteredFaqTerms = faqTerms.filter(el => (el.label[this.props.language].toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1));
    }

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <div className={`container-fluid ${classes.FAQ}`}>
          <Header
            language={this.props.language}
            switchLanguage={this.props.switchLanguage}
          />
          <section>
            <HeaderTitle
              language={this.props.language}
              labelkey="faq"
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
                  filteredFaqTerms.map(termObject => (
                    <li key={termObject.key} id={termObject.key} className={classes.Li}>
                      <h3 className={classes.Term}>
                        <i className={termObject.icon} />
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
                  url="/medias"
                  lib_button="Voir"
                />
                <CardWithButton
                  language={this.props.language}
                  schema="scanrdeepblueColorCards"
                  title="Discover.Sources"
                  url="/ressources"
                  lib_button="Voir"
                />
                <CardWithButton
                  language={this.props.language}
                  schema="scanrdeepblueColorCards"
                  title="Discover.Team"
                  url="/l-equipe-et-son-projet"
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

export default FAQ;

FAQ.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
