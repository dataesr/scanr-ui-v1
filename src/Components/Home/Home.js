import React, { useContext } from 'react';
import { GlobalContext } from '../../GlobalContext';
import useScrollY from '../../Hooks/UseScrollY';

import ScanRMeta from '../Shared/MetaTags/ScanRMeta';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import LastFocus from '../Shared/LastFocus/LastFocus';
import MostActiveThemes from '../Shared/MostActiveThemes/MostActiveThemes';
import { currentThemes } from './CurrentThemesAndSuggestions';
// import Newsletter from '../Shared/Newsletter/Newsletter';
import ScanrToday from '../Shared/ScanrToday/ScanrToday';
import Search from './Search/Search';
import Banner from '../Shared/Banner/Banner';

import classes from './Home.scss';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

const HomePage = (props) => {
  const context = useContext(GlobalContext);
  const scrollY = useScrollY();

  return (
    <div className={`container-fluid ${classes.HomePage}`}>
      <ScanRMeta title={msg[context.language].title} />
      <Header />
      <Search
        {...props}
        language={context.language}
        isFull={scrollY === 0}
      />
      <ScanrToday
        language={context.language}
        isFull={scrollY === 0}
      />
      <Banner
        language={context.language}
        labelKey="WhatAreOurSources"
        cssClass="BannerLight"
        url="/ressources"
      />

      <MostActiveThemes
        language={context.language}
        data={currentThemes}
      />
      { /* <Banner
        language={context.language}
        labelKey="Appear"
        cssClass="BannerLight"
        url=""
      /> */}
      <LastFocus language={context.language} />
      {/* Not for Now */}
      {/* <Newsletter language={this.context.language} /> */}
      <Banner
        language={context.language}
        labelKey="DiscoverDataesr"
        cssClass="BannerDark"
        url="https://data.esr.gouv.fr/"
        target="_blank"
      />
      <Footer />
    </div>
  );
};
export default HomePage;
