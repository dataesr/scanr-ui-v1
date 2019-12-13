import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { GlobalContext } from '../../../GlobalContext';

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

const FAQ = (props) => {
  const context = useContext(GlobalContext);
  const orderedContent = GROUPKEY_ORDERED.map((groupkey) => {
    const terms = faqTerms.filter(faqTerm => faqTerm.groupkey === groupkey);
    const termsJSX = terms.map(termObject => (
      <div className="card">
        <div className="card-header" id="headingOne">
          <h3 className="mb-0">
            <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${termObject.key}`} aria-expanded="true" aria-controls="collapseOne">
              <h4 className={classes.Term}>
                <i className={termObject.icon} />
                &nbsp;
                {termObject.label[context.language]}
              </h4>
            </button>
          </h3>
        </div>
        <div id={termObject.key} className={`collapse ${(termObject.key === props.match.params.id) ? 'show' : ''}`} aria-labelledby="headingOne" data-parent="#accordion">
          <div className="card-body">
            <p className={classes.Definition}>
              <Markdown>
                {termObject.definition[context.language]}
              </Markdown>
            </p>
          </div>
        </div>
      </div>
    ));

    const contentJSX = (
      <Fragment>
        <h2 className={classes.Title}>
          {messages[context.language][groupkey]}
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
        language={context.language}
        switchLanguage={props.switchLanguage}
      />
      <section>
        <HeaderTitle
          url1="/"
          language={context.language}
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
              language={context.language}
              messages={messages}
              schema="scanrdeepblueColorCards"
              title="Discover.TalkAboutScanr"
              url="/medias"
              lib_button="Discover"
            />
            <CardWithButton
              language={context.language}
              messages={messages}
              schema="scanrdeepblueColorCards"
              title="Discover.Sources"
              url="/ressources"
              lib_button="Discover"
            />
            <CardWithButton
              language={context.language}
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
        language={context.language}
        labelKey="Appear"
        cssClass="BannerDark"
        url=""
      /> */ }
      <Footer language={context.language} />
    </div>
  );
};

export default FAQ;

FAQ.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.object,
};
