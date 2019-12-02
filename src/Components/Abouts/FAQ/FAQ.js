import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'markdown-to-jsx';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';

/* Chargement du lexique */
import faqTerms from '../../Shared/terms/faq.json';

/* SCSS */
import classes from './FAQ.scss';

const FAQ = props => (
  <div className={`container-fluid ${classes.FAQ}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />
    <section>
      <HeaderTitle
        language={props.language}
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
                        {termObject.label[props.language]}
                      </h3>
                    </button>
                  </h2>
                </div>
                <div id={termObject.key} className={`collapse ${(i === 0) ? 'show' : ''}`} aria-labelledby="headingOne" data-parent="#accordion">
                  <div className="card-body">
                    <p className={classes.Definition}>
                      <Markdown>
                        {termObject.definition[props.language]}
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
            language={props.language}
            schema="scanrdeepblueColorCards"
            title="Discover.TalkAboutScanr"
            url="/medias"
            lib_button="Voir"
          />
          <CardWithButton
            language={props.language}
            schema="scanrdeepblueColorCards"
            title="Discover.Sources"
            url="/ressources"
            lib_button="Voir"
          />
          <CardWithButton
            language={props.language}
            schema="scanrdeepblueColorCards"
            title="Discover.Team"
            url="/l-equipe-et-son-projet"
            lib_button="Voir"
          />
        </div>
      </div>
    </aside>
    <Banner
      language={props.language}
      labelKey="Appear"
      cssClass="BannerDark"
      url=""
    />
    <Footer language={props.language} />
  </div>
);

export default FAQ;

FAQ.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
