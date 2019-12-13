import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';


import CardToPage from '../../Shared/CardWithButton/CardToPage';
// import Banner from '../../Shared/Banner/Banner';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Footer from '../../Shared/Footer/Footer';
// import DiscoverScanR from './DiscoverScanR/DiscoverScanR';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Team-and-project.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

/**
 * Team-and-Project
 * Url : /l-equipe-et-son-projet
 * Description : Page de description de l'équipe - L'équipe et son projet
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
 */

const TeamAndProjectPage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.TeamAndProjectPage}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />

      <HeaderTitle
        language={props.language}
        labelkey="team"
        url1="/"
      />

      <section className={classes.Content}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 my-4">
              <img
                src="./img/logo-scanr-blue.svg"
                alt="Logo"
              />
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="topoScanR"
                  defaultMessage="contentTexte"
                />
              </div>
            </div>
            <div className={` ${classes.CardContainer} col-lg-3`}>
              <CardToPage
                cssClass="card_light"
                labelKey="Discover.TalkAboutScanr"
                language={props.language}
                messages={messages}
                url="/medias"
                btnText="Discover"
              />
              <CardToPage
                cssClass="card_light"
                labelKey="Discover.Sources"
                language={props.language}
                messages={messages}
                url="/ressources"
                btnText="Discover"
              />
              <CardToPage
                cssClass="card_light"
                labelKey="Discover.FAQ"
                language={props.language}
                messages={messages}
                url="/faq"
                btnText="Discover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={classes.Content2}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 my-4">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="newVersion"
                  defaultMessage="newVersion"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.Content3}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="project"
                  defaultMessage="project"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={classes.Content4}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 my-4">
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="team"
                  defaultMessage="contentTexte"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default TeamAndProjectPage;

TeamAndProjectPage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
