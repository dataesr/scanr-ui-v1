import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
// import Banner from '../../Shared/Banner/Banner';
import Background from './poudre-bleu_Fgris-B.jpg';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import MediasCard from '../../Shared/CardWithButton/MediasCard2';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Medias.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const sectionStyle = {
  backgroundImage: `url(${Background})`,
};
// eslint-disable-next-line
const filename = './data.json';
// eslint-disable-next-line
const data = require(`${filename}`).medias;

const Medias = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Medias}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        labelkey="media"
        url1="/"
      />
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className="row">
            {
              data.map(media => (
                <div className={`col-md-6 col-sm-12 ${classes.CardContainer}`}>
                  <MediasCard
                    language={props.language}
                    messages={messages}
                    title={media.title}
                    source={media.source}
                    date={media.date}
                    url={media.url}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </section>
      <section className={classes.ThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={props.language}
              messages={messages}
              schema="card_dark"
              title="Discover.Sources"
              url="./ressources"
              lib_button="Voir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              messages={messages}
              schema="card_dark"
              title="Discover.Team"
              url="./l-equipe-et-son-projet"
              lib_button="Voir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              messages={messages}
              schema="card_dark"
              title="Discover.FAQ"
              url="./faq"
              lib_button="Voir"
              position="CardCenter"
            />
          </div>
        </div>
      </section>
      { /* <Banner
        language={props.language}
        labelKey="Appear"
        cssClass="BannerDark"
        url=""
      /> */}
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Medias;

Medias.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
