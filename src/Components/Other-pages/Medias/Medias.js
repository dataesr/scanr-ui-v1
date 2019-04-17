import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import Background from './poudre-bleu_Fgris-B.jpg';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import MediasCard from '../../Shared/CardWithButton/MediasCard';

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

const Medias = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Medias}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        label="media"
      />
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className={`row ${classes.periode}`}>
               en 2017
          </div>
          <div className="row">
            <MediasCard
              language={props.language}
              article="Medias.article1"
              url="https://punktokomo.abes.fr/2017/11/27/quand-scanr-et-idref-sassocient-pour-identifier-les-acteurs-de-la-recherche-et-de-linnovation/"
            />
          </div>
          <div className={`row ${classes.periode}`}>
             en 2016
          </div>
          <div className="row">
            <MediasCard
              language={props.language}
              article="Medias.article2"
              url="https://www.lagazettedescommunes.com/472571/estelle-grelier-lopen-data-rapproche-laction-publique-des-citoyens/"
            />
            <MediasCard
              language={props.language}
              article="Medias.article3"
              url="https://www.lemoniteur.fr/article/place-a-la-mise-en-uvre-de-la-loi-pour-une-republique-numerique.1332739"
            />
            <MediasCard
              language={props.language}
              article="Medias.article4"
              url="https://politiques-innovation.org/scanr-un-moteur-de-lopen-innovation-en-france/"
            />
          </div>
        </div>
      </section>
      <section className={classes.ThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={props.language}
              schema="card_dark"
              title="Discover.TalkAboutScanr"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              schema="card_dark"
              title="Discover.Sources"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              schema="card_dark"
              title="Discover.Team"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
              position="CardCenter"
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

export default Medias;

Medias.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
