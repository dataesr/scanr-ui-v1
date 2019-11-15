import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Background from '../../Shared/images/poudre-jaune_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Glossary.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const sectionStyle = {
  backgroundImage: `url(${Background})`,
};

const Glossary = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Glossary}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <section>
        <HeaderTitle
          language={props.language}
          label="glossary"
        />
      </section>
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className="row">
          bla bla
          </div>
        </div>
      </section>
      <section className={classes.ThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={props.language}
              title="Discover.TalkAboutScanr"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
            />
            <CardWithButton
              language={props.language}
              title="Discover.Sources"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
            />
            <CardWithButton
              language={props.language}
              title="Discover.Team"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
            />
          </div>
        </div>
      </section>
      <Banner
        language={props.language}
        label="Appear"
        cssClass="BannerDark"
      />
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Glossary;

Glossary.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
