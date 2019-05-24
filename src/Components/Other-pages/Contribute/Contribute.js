import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Banner from '../../Shared/Banner/Banner';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import CardToPage from '../../Shared/CardWithButton/CardToPage';
import ComponentVideo from '../../Shared/Video/ComponentVideo';
import Footer from '../../Shared/Footer/Footer';
import FormContact from '../../Shared/FormContact/FormContact';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';


/* SCSS */
import classes from './Contribute.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const videoPoster = 'img/video-poster/Tai-Ji-gravure-paysage-Chine.gif';

/**
 * Contribute
 * Url : /contact
 * Description : Page de contribution à ScanR avec avec video et formulaire de contact
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const ContributePage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Contribute}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />

      <HeaderTitle
        language={props.language}
        labelkey="contribute"
        url1="/"
        url2="#"
      />

      <section className={classes.Content}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <FormattedHTMLMessage
                id="howToContribute"
                defaultMessage="howToContribute"
              />
            </div>
            <div className="w-100" /> 

            <div className={`card col-lg ${classes.Card}`}>
              <div className={`card-body ${classes.card_light}`}>
                <i className={`fas fa-pencil-alt ${classes.CardLogo}`} />
                <div className="card-title">
                  <FormattedHTMLMessage
                    id="improveInfo.title"
                    defaultMessage="improveInfo.title"
                  />
                </div>
                <div className="card-text">
                  <FormattedHTMLMessage
                    id="improveInfo.text"
                    defaultMessage="improveInfo.text"
                  />
                  <i className={`fas fa-play text-right ${classes.CardLogo}`} />
                </div>
              </div>
            </div>

            <div className={`card col-lg ${classes.Card} ${classes.card_dark}`}>
              <div className={`card-body ${classes.Video}`}>
                <ComponentVideo
                  url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                  poster={videoPoster}
                  language={props.language}
                />
              </div>
            </div>
            <div className="w-100" />
            <div className={`card col-lg ${classes.Card} ${classes.card_dark}`}>
              <div className="card-body">
                <i className={`fas fa-ruler-combined ${classes.CardLogo}`} />
                <div className="card-title">
                  <FormattedHTMLMessage
                    id="newSource.title"
                    defaultMessage="newSource.title"
                  />
                </div>
                <div className="card-text">
                  <FormattedHTMLMessage
                    id="newSource.text"
                    defaultMessage="newSource.text"
                  />
                </div>
                <i className={`fas fa-play text-bottom ${classes.CardArrow}`} />
              </div>
            </div>

            <div className={`card col-lg ${classes.Card} ${classes.card_light}`}>
              <div className="card-body">
                <img src="./img/logo-Framasoft.svg" className="CardLogo" alt="logo_framasoft" />
                <div className="card-title">
                  <FormattedHTMLMessage
                    id="futurScanr.title"
                    defaultMessage="futurScanr.title"
                  />
                </div>
                <div className="card-text">
                  <FormattedHTMLMessage
                    id="futurScanr.text"
                    defaultMessage="futurScanr.text"
                  />
                </div>
                <ButtonToPage
                  className={`${classes.Button}`}
                  url="#"
                  target="_blank"
                >
                  <FormattedHTMLMessage
                    id="futurScanr.button"
                    defaultMessage="futurScanr.button"
                  />
                </ButtonToPage>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.FormContact}>
        <div className="container">
          <FormContact
            language={props.language}
            name="name"
            organisation="organisation"
            fonction="fonction"
            email="email"
            message="message"
            text="text"
            btnText="btnText"
          />
        </div>
      </section>

      <section className={classes.Cards}>
        <div className="container">
          <div className="row">
            <div className="col-lg pt-3">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="consultFAQ"
                language={props.language}
                btnText="discover"
                url=""
                target="_blank"
              />
            </div>
            <div className="col-lg pt-3">
              <CardToPage
                cssClass="card_lightdark"
                labelKey="whatAreOurSources"
                language={props.language}
                btnText="discover"
                url=""
                target="_blank"
              />
            </div>
            <div className="col-lg py-3">
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


export default ContributePage;

ContributePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.string.isRequired,
};
