import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import BlueBanner from '../../Shared/BlueBanner/BlueBanner';
import DiscoverThreeCards from '../../Shared/DiscoverThreeCards/DiscoverThreeCards';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './TalkAboutScanr.scss';


const TalkAboutScanr = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
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
            schema="media"
          />
          <DiscoverThreeCards
            language={props.language}
            TitleCard1="Discover.TalkAboutScanr"
            TitleCard2="Discover.Sources"
            TitleCard3="Discover.Team"
          />
          <BlueBanner
            language={props.language}
            schema="TalkAboutScanr"
          />
        </section>
        <Footer language={props.language} />
      </div>
    </IntlProvider>
  );
};

export default TalkAboutScanr;

TalkAboutScanr.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
