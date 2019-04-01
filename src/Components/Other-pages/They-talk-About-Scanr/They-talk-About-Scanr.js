import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import DiscoverThreeCards from '../../Shared/DiscoverThreeCards/DiscoverThreeCards';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './TalkAboutScanr.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const TalkAboutScanr = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.TalkAboutScanr}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <section>
        <HeaderTitle
          language={props.language}
          switchLanguage={props.switchLanguage}
          label="media"
        />
        <DiscoverThreeCards
          language={props.language}
          TitleCard1="Discover.TalkAboutScanr"
          TitleCard2="Discover.Sources"
          TitleCard3="Discover.Team"
        />
        <Banner
          bannerColor={classes.BannerColor}
          label="TalkAboutScanr"
          language={props.language}
        />
      </section>
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default TalkAboutScanr;

TalkAboutScanr.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
