import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import CardToPage from '../../Shared/CardWithButton/CardToPage';
import Banner from '../../Shared/Banner/Banner';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Contact.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Contact
 * Url : /contact
 * Description : Page du formulaire de contact scanr
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const Contact = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Contact}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <section>
        <HeaderTitle
          language={props.language}
          labelkey="contact"
          url1="/"
          url2="#"
        />

        <section className={classes.Content}>
          <div className="container">
            <div className="row">
              <div className="col-lg-5">
                <div className={classes.Texte}>
                  <FormattedHTMLMessage
                    id="contentTexte"
                    defaultMessage="contentTexte"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                vide
              </div>
            </div>

          /*  <form action="#" className="FormContact"> */
              <div className="row">
                <div className="col-lg-5">
                    <label htmlFor="name">Votre nom et prénom*</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className="col-lg-7">
                  Formulaire
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5">
                    Texte rgpd
                </div>
                <div className="col-lg-7">
                    robot + button
                </div>
              </div>
          /*  </form> */

          </div>
        </section>

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
          target="_blank"
        />
      </section>
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Contact;

Contact.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
