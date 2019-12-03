import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Banner from '../../Shared/Banner/Banner';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import CardToPage from '../../Shared/CardWithButton/CardToPage';
import ComponentVideo from '../../Shared/Video/ComponentVideo';
import Footer from '../../Shared/Footer/Footer';
import FormContact from '../../Shared/FormContact/FormContact';
import Header from '../../Shared/Header/Header';
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
 * Description : Page de contribution à scanR avec avec video et formulaire de contact
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const ContributePage = props => (
  <IntlProvider messages={messages[props.language]}>
    <React.Fragment>
      <Header />

      <HeaderTitle
        language={props.language}
        labelkey="contribute"
        url1="/"
        url2="#"
      />

      <section className={`${classes.Contribute} ${classes.Content}`}>
        <div className="container">
          <div className="row pt-4">
            <div className={`card col-lg ${classes.Card} ${classes.card_light}`}>
              <i className={`fas fa-pencil-alt ${classes.Logo}`} />
              <div className={classes.Text}>
                <FormattedHTMLMessage
                  id="improveInfo.title"
                  defaultMessage="improveInfo.title"
                />
                <FormattedHTMLMessage
                  id="improveInfo.text"
                  defaultMessage="improveInfo.text"
                />
              </div>
              <i className={`fas fa-caret-right text-right ${classes.ArrowRight}`} />
            </div>
            <div className={`card col-lg p-0 ${classes.Card} ${classes.card_dark} `}>
              <ComponentVideo
                url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                poster={videoPoster}
                language={props.language}
              />
            </div>
            <div className="w-100" />
            <div className={`card col-lg ${classes.Card} ${classes.card_darkdark}`}>

              <i className={`fas fa-ruler-combined ${classes.Logo}`} />
              <div className={classes.Text}>
                <FormattedHTMLMessage
                  id="newSource.title"
                  defaultMessage="newSource.title"
                />
                <FormattedHTMLMessage
                  id="newSource.text"
                  defaultMessage="newSource.text"
                />
              </div>
              <i className={`fas fa-caret-down text-bottom ${classes.ArrowDown}`} />
            </div>
            <div className={`card col-lg ${classes.Card} ${classes.card_light}`}>
              <img src="./img/logo-Framasoft.svg" className={classes.Logo} alt="logo_framasoft" />
              <div className={classes.Text}>
                <FormattedHTMLMessage
                  id="futurScanr.title"
                  defaultMessage="futurScanr.title"
                />
                <FormattedHTMLMessage
                  id="futurScanr.text"
                  defaultMessage="futurScanr.text"
                />
                <ButtonToPage
                  className={classes.Button}
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
        <div className="container py-4">
          <FormContact language={props.language} />
        </div>
      </section>
      <section className={classes.Cards}>
        <div className="container py-3">
          <div className="row">
            <div className={`col-lg ${classes.CardContainer}`}>
              <CardToPage
                cssClass="card_lightdark"
                labelKey="consultFAQ"
                language={props.language}
                btnText="discover"
                url=""
                target="_blank"
              />
            </div>
            <div className={`col-lg ${classes.CardContainer}`}>
              <CardToPage
                cssClass="card_lightdark"
                labelKey="whatAreOurSources"
                language={props.language}
                btnText="discover"
                url=""
                target="_blank"
              />
            </div>
            <div className={`col-lg ${classes.CardContainer}`}>
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

      <Footer />

    </React.Fragment>
  </IntlProvider>
);


export default ContributePage;

ContributePage.propTypes = {
  language: PropTypes.string.isRequired,
};
