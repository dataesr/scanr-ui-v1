import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Shared/Header/Header-homePage';
import Search from './Search/Search';
import ScanrToday from '../Shared/ScanrToday/ScanrToday';
import ComponentToPage from '../Shared/ComponentToPage/ComponentToPage';
import MostActiveThemes from '../Shared/MostActiveThemes/MostActiveThemes';
import LastFocus from '../Shared/LastFocus/LastFocus';
import Newsletter from '../Shared/Newsletter/Newsletter';
import DiscoverDataEsr from '../Shared/DiscoverDataEsr/DiscoverDataEsr';

import Footer from '../Shared/Footer/Footer';

import Lexicon from '../Shared/Lexicon/Lexicon';

import classes from './Home-page.scss';

const HomePage = props => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />

    <Search language={props.language} />

    <ScanrToday language={props.language} />

    <ComponentToPage
      labelKey="WhatAreOurSources"
      language={props.language}
      url=""
    />

    <MostActiveThemes
      language={props.language}
      data={['Brain to computer', 'Anthropologie évolutive', 'Biotechnologie', 'Fusion nucléaire', 'Brain content', 'Cryptographie', 'Matériaux', 'Machine learning', 'Intelligence artificielle', 'Réalité virtuelle']}
    />

    <ComponentToPage
      labelKey="HowToAppearInScanR"
      language={props.language}
      url=""
    />

    <LastFocus language={props.language} />

    <Newsletter language={props.language} />

    <DiscoverDataEsr language={props.language} />

    <Footer language={props.language} />

    <Lexicon
      className={classes.HomePageLexiconTop}
      language={props.language}
    />
  </div>
);

export default HomePage;

HomePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
