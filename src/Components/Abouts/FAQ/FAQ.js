import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';

import { GROUPKEY_ORDERED } from '../../../config/config';

/* Chargement du lexique */
import faqTerms from '../../Shared/terms/faq.json';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './FAQ.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

class FAQ extends Component {
  state = {
    loaded: false,
  };

  componentDidMount() {
    this.setState({ loaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.match.params.id && (prevState.loaded !== this.state.loaded)) {
      document.getElementById(`${this.props.match.params.id}_header`).scrollIntoView(true);
      window.scrollBy(0, -80);
    }
  }

  render() {
    const orderedContent = GROUPKEY_ORDERED.map((groupkey) => {
      const terms = faqTerms.filter(faqTerm => faqTerm.groupkey === groupkey);
      const termsJSX = terms.map(termObject => (
        <div className="card">
          <div className="card-header" id="headingOne">
            <h3 className="mb-0" id={`${termObject.key}_header`}>
              <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${termObject.key}`} aria-expanded="true" aria-controls="collapseOne">
                <h4 className={classes.Term}>
                  <i className={termObject.icon} />
                  &nbsp;
                  {termObject.label[this.props.language]}
                </h4>
              </button>
            </h3>
          </div>
          <div id={termObject.key} className={`collapse ${(termObject.key === this.props.match.params.id) ? 'show' : ''}`} aria-labelledby="headingOne" data-parent="#accordion">
            <div className="card-body">
              <p className={classes.Definition}>
                <Markdown>
                  {termObject.definition[this.props.language]}
                </Markdown>
              </p>
            </div>
          </div>
        </div>
      ));

      const contentJSX = (
        <Fragment>
          <h2 className={classes.Title}>
            {messages[this.props.language][groupkey]}
          </h2>
          <div>
            {termsJSX}
          </div>
        </Fragment>
      );

      return contentJSX;
    });

    return (
      <div className={`container-fluid ${classes.FAQ}`}>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <section>
          <HeaderTitle
            url1="/"
            language={this.props.language}
            labelkey="faq"
          />
        </section>
        <section className={classes.Content}>
          <div className="container">
            <div className="accordion" id="accordion">
              {orderedContent}
            </div>
          </div>
        </section>
        <aside className={classes.ThreeCards}>
          <div className="container">
            <div className="row">
              <CardWithButton
                language={this.props.language}
                messages={messages}
                schema="scanrdeepblueColorCards"
                title="Discover.TalkAboutScanr"
                url="/medias"
                lib_button="Discover"
              />
              <CardWithButton
                language={this.props.language}
                messages={messages}
                schema="scanrdeepblueColorCards"
                title="Discover.Sources"
                url="/ressources"
                lib_button="Discover"
              />
              <CardWithButton
                language={this.props.language}
                messages={messages}
                schema="scanrdeepblueColorCards"
                title="Discover.Team"
                url="/l-equipe-et-son-projet"
                lib_button="Discover"
              />
            </div>
          </div>
        </aside>
        {/* <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerDark"
          url=""
        /> */ }
        <Footer language={this.props.language} />
      </div>
    );
  }
}

export default FAQ;

FAQ.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.object,
  language: PropTypes.string.isRequired,
};
