import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';
import { GlobalContext } from '../../../GlobalContext';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
// import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';

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
  let idxQuestion = 0;
  if (props.match.params.id) {
    idxQuestion = faqTerms.findIndex(term => term.key === props.match.params.id);
  }
  if (idxQuestion < 0) {
    idxQuestion = 0;
  }
  return (
    <div className={`container-fluid ${classes.FAQ}`}>
      <Header
        language={context.language}
        switchLanguage={props.switchLanguage}
      />
      <section>
        <HeaderTitle
          language={context.language}
          labelkey="faq"
        />
      </section>
      <section className={classes.Content}>
        <div className="container">
          <div className="accordion" id="accordion">
            {
              faqTerms.map((termObject, i) => (
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h2 className="mb-0">
                      <button className="btn btn-link" type="button" data-toggle="collapse" data-target={`#${termObject.key}`} aria-expanded="true" aria-controls="collapseOne">
                        <h3 className={classes.Term}>
                          <i className={termObject.icon} />
                          &nbsp;
                          {termObject.label[context.language]}
                        </h3>
                      </button>
                    </h2>
                  </div>
                  <div id={termObject.key} className={`collapse ${(i === idxQuestion) ? 'show' : ''}`} aria-labelledby="headingOne" data-parent="#accordion">
                    <div className="card-body">
                      <p className={classes.Definition}>
                        <Markdown>
                          {termObject.definition[context.language]}
                        </Markdown>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            }
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
