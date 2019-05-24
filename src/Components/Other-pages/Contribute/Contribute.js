import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Banner from '../../Shared/Banner/Banner';
import CardToPage from '../../Shared/CardWithButton/CardToPage';
import Footer from '../../Shared/Footer/Footer';
import FormContact from '../../Shared/FormContact/FormContact';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import SimpleCard from '../../Shared/Ui/SimpleCard/SimpleCard';
import ComponentVideo from '../../Shared/Video/ComponentVideo';

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
            <div className={classes.Title}>
              <FormattedHTMLMessage
                id="howToContribute"
                defaultMessage="howToContribute"
              />
            </div>

              <div className="card-columns">

                <div className={`card-body ${classes.CardBody}`}>
                  <div className={`card-title ${classes.CardTitle}`}>
                    <FormattedHTMLMessage
                      id="improveInfo.title"
                      defaultMessage="improveInfo.title"
                    />
                  </div>
                  <div className={`card-text ${classes.CardText}`}>
                    <FormattedHTMLMessage
                      id="improveInfo.text"
                      defaultMessage="improveInfo.text"
                    />
                  </div>
                </div>

                <div className={`card-body ${classes.CardBody}`}>
                  <div className={`card-title ${classes.CardTitle}`}>
                    <FormattedHTMLMessage
                      id="newSource.title"
                      defaultMessage="newSource.title"
                    />
                  </div>
                  <div className={`card-text ${classes.CardText}`}>
                    <FormattedHTMLMessage
                      id="newSource.text"
                      defaultMessage="newSource.text"
                    />
                  </div>
                </div>

                <div className={`card-body ${classes.CardBody}`}>
                  <ComponentVideo
                    url="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    poster={videoPoster}
                    language={props.language}
                  />
                </div>

                <SimpleCard
                  title={messages[props.language]['futurScanr.title']}
                  label="futurScanr.text"
                />

                <div className={`card-body ${classes.CardBody}`}>
                  <div className={`card-title ${classes.CardTitle}`}>
                    <FormattedHTMLMessage
                      id="futurScanr.title"
                      defaultMessage="futurScanr.title"
                    />
                  </div>
                  <div className={`card-text ${classes.CardText}`}>
                    <FormattedHTMLMessage
                      id="futurScanr.text"
                      defaultMessage="futurScanr.text"
                    />
                  </div>
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
  cssClass: PropTypes.string.isRequired,
};
