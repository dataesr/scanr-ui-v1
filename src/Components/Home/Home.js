import React, { useContext } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import { GlobalContext } from '../../GlobalContext';

import ScanRMeta from '../Shared/MetaTags/ScanRMeta';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
// import LastFocus from '../Shared/LastFocus/LastFocus';
// import MostActiveThemes from './MostActiveThemes/MostActiveThemes';
// import { currentThemes } from '../../config/CurrentThemesAndSuggestions';
// import Newsletter from '../Shared/Newsletter/Newsletter';
import ScanrToday from './ScanrToday/ScanrToday';
import ScanrIs from './ScanrIs/ScanrIs';
import Search from './Search/Search';
import Banner from '../Shared/Banner/Banner';
import WelcomeModal from './WelcomeModal';

import logo from '../Shared/svg/logo-ministere.svg';

import classes from './Home.scss';

import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const msg = {
  fr: messagesFr,
  en: messagesEn,
};

const HomePage = (props) => {
  const context = useContext(GlobalContext);
  return (
    <IntlProvider locale={context.language} messages={msg[context.language]}>
      <div className={`container-fluid ${classes.HomePage}`}>
        <FormattedHTMLMessage id="Home.title">
          {logoLabel => (<ScanRMeta title={logoLabel} />)}
        </FormattedHTMLMessage>
        <WelcomeModal />
        <Header />
            <div className={`col-md ${classes.LogoHome}`}>
              <img
                src={logo}
                alt="Logo MESRI"
                className={classes.Logo}
              />
            </div>
        <Search
          {...props}
          language={context.language}
        />
        <ScanrToday />
        <ScanrIs />
        {/* <ScanrToday language={context.language} />


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
        <Banner
          language={context.language}
          labelKey="Appear"
          cssClass="BannerLight"
          url=""
          <LastFocus language={context.language} />
        /> */}
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
    </IntlProvider>
  );
};
export default HomePage;
