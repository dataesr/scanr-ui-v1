import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
/* import ReCAPTCHA from 'react-google-recaptcha'; */

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
 * Description : Page du formulaire de contact scanR
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
                  id="scanrTexte"
                  defaultMessage="scanrTexte"
                />
              </div>
            </div>
          </div>

          <form action="#">
            <div className="row">
              <div className={`col-lg-5 ${classes.FormContact}`}>
                <label htmlFor="name">
                  <div className={classes.Texte}>
                    <FormattedHTMLMessage
                      id="FormContact.name"
                      defaultMessage="FormContact.name"
                    />
                  </div>
                  <input className="form-control" type="text" placeholder="Ex: Péglion Jéremy" id="name" required />
                </label>
                <label htmlFor="organisation">
                  <div className={classes.Texte}>
                    <FormattedHTMLMessage
                      id="FormContact.organisation"
                      defaultMessage="FormContact.organisation"
                    />
                  </div>
                  <input className="form-control" type="text" placeholder="Ex: Institut Pasteur" id="organisation" name="organisation" />
                </label>
                <label htmlFor="fonction">
                  <div className={classes.Texte}>
                    <FormattedHTMLMessage
                      id="FormContact.fonction"
                      defaultMessage="FormContact.fonction"
                    />
                  </div>
                  <input className="form-control" type="text" placeholder="Ex: Directrice de Centre" id="fonction" name="fonction" required />
                </label>
                <label htmlFor="email">
                  <div className={classes.Texte}>
                    <FormattedHTMLMessage
                      id="FormContact.email"
                      defaultMessage="FormContact.email"
                    />
                  </div>
                  <input className="form-control" type="email" placeholder="Ex: jerem@gmail.com" id="email" name="email" required />
                </label>
              </div>
              <div className={`col-lg-7 ${classes.FormContact}`}>
                <label htmlFor="message">
                  <div className={classes.Texte}>
                    <FormattedHTMLMessage
                      id="FormContact.message"
                      defaultMessage="FormContact.message"
                    />
                  </div>
                  <textarea className="form-control" placeholder="..." rows="10" id="message" name="message" />
                </label>
              </div>
            </div>
            <div className="row">
              <div className={`col-lg-5 ${classes.FormContact}`}>
                <div className={classes.Texte}>
                  <FormattedHTMLMessage
                    id="FormContact.dataText"
                    defaultMessage="FormContact.dataText"
                  />
                </div>
              </div>
              <div className="col-lg-7">
                <div className={`form-inline ${classes.FormContact}`}>
                  <div className="g-recaptcha col-7 flex-grow-1" data-sitekey="">
                    <img
                      src="./img/RecaptchaLogo.svg"
                      alt="ReCAPTCHA"
                    />
                  </div>
                  <button type="submit" value="send" className="col-5">
                    <FormattedHTMLMessage
                      id="FormContact.btnText"
                      defaultMessage="FormContact.btnText"
                    />
                    <span className="col-5 text-right">
                      <i className="fas fa-paper-plane" color="white" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </form>
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
                btnText="discover"
                url=""
                target="_blank"
              />
            </div>
            <div className="col-lg py-5">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="whatAreOurSources"
                language={props.language}
                btnText="discover"
                url=""
                target="_blank"
              />
            </div>
            <div className="col-lg py-5">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="openData"
                language={props.language}
                btnText="discover"
                url=""
                target="_blank"
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

      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Contact;

Contact.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
