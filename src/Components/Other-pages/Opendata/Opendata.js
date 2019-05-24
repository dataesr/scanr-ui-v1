import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import CardTwoColumns from './CardTwoColumns';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import Background from '../../Shared/images/poudre-bleu_Fgris-B.jpg';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Opendata.scss';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
};
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Opendata = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Opendata}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <HeaderTitle
        language={props.language}
        label="opendata"
      />
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className="row" style={{ padding: '0px' }}>
            <CardTwoColumns
              language={props.language}
              title="Opendata.TitleOpendata"
            >
              <FormattedHTMLMessage
                id="Opendata.TitleOpendata.content"
                defaultMessage="Opendata.TitleOpendata.content"
              />
            </CardTwoColumns>
            <CardWithButton
              language={props.language}
              schema="entitiesCards"
              title="Opendata.card01"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="entitiesCards"
              title="Opendata.card02"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
          </div>
          <div className="row">
            <CardWithButton
              language={props.language}
              schema="projectsCards"
              title="Opendata.card03"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="projectsCards"
              title="Opendata.card04"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="entitiesCards"
              title="Opendata.card05"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="personsCards"
              title="Opendata.card06"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
          </div>
          <div className="row">
            <CardWithButton
              language={props.language}
              schema="personsCards"
              title="Opendata.card07"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="entitiesCards"
              title="Opendata.card08"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="entitiesCards"
              title="Opendata.card09"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
            <CardWithButton
              language={props.language}
              schema="entitiesCards"
              title="Opendata.card10"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Voir"
            />
          </div>
          <div className="row">
            <div className="col-lg-3" style={{ padding: '0px' }}>
              <CardWithButton
                language={props.language}
                schema="personsCards"
                title="Opendata.card11"
                url="https://worldwide.espacenet.com/?locale=fr_EP"
                lib_button="Voir"
              />
            </div>
          </div>
        </div>
      </section>
      <section className={classes.Plateforme}>
        <Banner
          language={props.language}
          labelKey="Opendata"
          cssClass="BannerLight"
          url="https://data.enseignementsup-recherche.gouv.fr/pages/home/"
          target="_blank"
        />
      </section>
      <section className={classes.Api}>
        <div className="container">
          <div className="row">
            <CardTwoColumns
              language={props.language}
              title="Opendata.ApiScanr"
            >
              <FormattedHTMLMessage
                id="Opendata.ApiScanr.content"
                defaultMessage="Opendata.ApiScanr.content"
              />
            </CardTwoColumns>
            <CardWithButton
              language={props.language}
              title="Opendata.DocuApi"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Accéder"
              schema="card_dark"
            />
            <CardWithButton
              language={props.language}
              title="Opendata.EnSavoirPlusApi"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Lire"
              schema="card_dark"
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
              url="./medias"
              lib_button="Découvrir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              schema="card_dark"
              title="Discover.Sources"
              url="./ressources"
              lib_button="Découvrir"
              position="CardCenter"
            />
            <CardWithButton
              language={props.language}
              schema="card_dark"
              title="Discover.Team"
              url="./l-equipe-et-son-projet"
              lib_button="Découvrir"
              position="CardCenter"
            />
          </div>
        </div>
      </section>
      <Banner
        language={props.language}
        labelKey="Appear"
        cssClass="BannerDark"
        url=""
      />
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Opendata;

Opendata.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
