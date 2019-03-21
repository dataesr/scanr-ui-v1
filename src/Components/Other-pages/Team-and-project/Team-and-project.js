import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ComponentToPage from '../../Shared/ComponentToPage/ComponentToPage';
import CardToPage from './CardToPage';
import Header from '../../Shared/Header/Header-homePage';
import Footer from '../../Shared/Footer/Footer';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Team-and-project.scss';


const TeamAndProjectPage = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`container-fluid ${classes.TeamAndProjectPage}`}>
        <Header
          language={props.language}
          switchLanguage={props.switchLanguage}
        />

        <section className={classes.Content}>
          <div className="container">
            <div className="row">
              <div className="col-8">
                <h2> Observez le monde de la Recherche avec ScanR</h2>
                <p> ScanR moteur de recherche </p>
                <p> En combinant les informations </p>
                <p> Par son moteur de recherche </p>
                <p> ScanR est proposé  en version beta </p>
              </div>
              <div className="col-4">
                  <CardToPage
                    labelKey="TheyTalkAboutScanR"
                    language={props.language}
                    url=""
                  />
                  <CardToPage
                    labelKey="WhatAreOurSources"
                    language={props.language}
                    url=""
                  />
                  <CardToPage
                    labelKey="ConsultFAQ"
                    language={props.language}
                    url=""
                  />
              </div>
            </div>
          </div>
        </section>

        <ComponentToPage
          labelKey="HowToAppearInScanR"
          language={props.language}
          url=""
        />

        <Footer language={props.language} />
      </div>
    </IntlProvider>
  );
};

export default TeamAndProjectPage;

TeamAndProjectPage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
