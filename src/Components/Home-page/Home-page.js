import React from 'react';
import PropTypes from 'prop-types';

import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
import LastFocus from '../Shared/LastFocus/LastFocus';
import LexiconPanel from '../Shared/Lexicon/LexiconPanel';
import MostActiveThemes from '../Shared/MostActiveThemes/MostActiveThemes';
import Newsletter from '../Shared/Newsletter/Newsletter';
import ScanrToday from '../Shared/ScanrToday/ScanrToday';
import Search from './Search/Search';
import Banner from '../Shared/Banner/Banner';

import classes from './Home-page.scss';

const HomePage = props => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />

    <Search language={props.language} />

    <ScanrToday language={props.language} />

    <Banner
      language={props.language}
      labelKey="WhatAreOurSources"
      cssClass="BannerLight"
      url=""
    />

    <MostActiveThemes
      language={props.language}
      data={['Brain to computer', 'Anthropologie évolutive', 'Biotechnologie', 'Fusion nucléaire', 'Brain content', 'Cryptographie', 'Matériaux', 'Machine learning', 'Intelligence artificielle', 'Réalité virtuelle']}
    />

    <Banner
      language={props.language}
      labelKey="Appear"
      cssClass="BannerLight"
      url=""
    />

    <LastFocus language={props.language} />

    <Newsletter language={props.language} />

    <Banner
      language={props.language}
      labelKey="DiscoverDataesr"
      cssClass="BannerDark"
      url="https://data.esr.gouv.fr/FR/"
      target="_blank"
    />

    <Footer language={props.language} />

    <LexiconPanel
      className={classes.HomePageLexiconPanelTop}
      language={props.language}
    />
  </div>
);

export default HomePage;

HomePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
