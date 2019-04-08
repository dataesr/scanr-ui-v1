import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ComponentToPage from '../../Shared/ComponentToPage/ComponentToPage';

import CardToPage from '../../Shared/CardWithButton/CardToPage';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Footer from '../../Shared/Footer/Footer';
import DiscoverScanR from './DiscoverScanR/DiscoverScanR';


/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Team-and-project.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};


const TeamAndProjectPage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.TeamAndProjectPage}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />

      <HeaderTitle
        language={props.language}
        label="legal"
      />

      <section className={classes.Content}>
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <img
                src="./img/logo-scanr-blue.svg"
                alt="Logo"
              />
              <div className={classes.Texte}>
                <FormattedHTMLMessage
                  id="contentTexte"
                  defaultMessage="contentTexte"
                />
              </div>
            </div>
            <div className="col-lg-3">
              <CardToPage
                cssClass="card_light"
                labelKey="theyTalkAboutScanR"
                language={props.language}
                url=""
                btnText="discover"
              />
              <CardToPage
                cssClass="card_light"
                labelKey="whatAreOurSources"
                language={props.language}
                url=""
                btnText="discover"
              />
              <CardToPage
                cssClass="card_light"
                labelKey="consultFAQ"
                language={props.language}
                url=""
                btnText="discover"
              />
            </div>
          </div>
        </div>
      </section>

      <DiscoverScanR
        labelKey="title"
        language={props.language}
      />

      <ComponentToPage
        labelKey="HowToAppearInScanR"
        url=""
        language={props.language}
      />

      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default TeamAndProjectPage;

TeamAndProjectPage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
