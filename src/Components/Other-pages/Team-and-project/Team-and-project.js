import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import CardToPage from './CardToPage';
import ComponentToPage from '../../Shared/ComponentToPage/ComponentToPage';
import DiscoverScanR from './DiscoverScanR/DiscoverScanR';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';

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

        <HeaderTitle
          language={props.language}
          schema="team"
        />

        <section className={classes.Content}>
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <img
                  src="./img/logo-scanr-blue.svg"
                  alt="Logo"
                />
                <div className={classes.Texte}>
                  <FormattedHTMLMessage
                    id="Content.Texte"
                    defaultMessage="Content.Texte"
                  />
                </div>
              </div>
              <div className="col-lg-4 text-center">
                <CardToPage
                  bgColor="#fff"
                  labelKey="TheyTalkAboutScanR"
                  language={props.language}
                  url=""
                />
                <CardToPage
                  bgColor="#fff"
                  labelKey="WhatAreOurSources"
                  language={props.language}
                  url=""
                />
                <CardToPage
                  bgColor="#fff"
                  labelKey="ConsultFAQ"
                  language={props.language}
                  url=""
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
