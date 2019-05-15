import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import CardToPage from '../../Shared/CardWithButton/CardToPage';
import Banner from '../../Shared/Banner/Banner';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import TutorialVideo1 from './TutorialVideo/TutorialVideo1';
import TutorialVideo2 from './TutorialVideo/TutorialVideo2';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Tutorials.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Tutorials
 * Url : /tutoriels
 * Description : Page de description des tutoriels - Comment fonctionne scanR ?
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const Tutorials = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Tutorials}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        labelkey="tutorial"
        url1="/"
        url2="#"
      />

      <section className={classes.Content}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <FormattedHTMLMessage
                id="contentTexte"
                defaultMessage="contentTexte"
              />
            </div>
          </div>
        </div>
      </section>

      <TutorialVideo1
        labelKey="titleTuto1"
        language={props.language}
      />
      <TutorialVideo2
        labelKey="titleTuto2"
        language={props.language}
      />

      <section className={classes.Cards}>
        <div className="container">
          <div className="row">
            <div className="col-lg py-5">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="consultFAQ"
                language={props.language}
                url=""
                btnText="discover"
              />
            </div>
            <div className="col-lg py-5">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="whatAreOurSources"
                language={props.language}
                url=""
                btnText="discover"
              />
            </div>
            <div className="col-lg py-5">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="openData"
                language={props.language}
                url=""
                btnText="discover"
              />
            </div>
          </div>
        </div>
      </section>

      <Banner
        cssClass="BannerDark"
        labelKey="Appear"
        language={props.language}
        url=""
      />

      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Tutorials;

Tutorials.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
