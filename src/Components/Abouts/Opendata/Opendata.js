import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
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
        labelkey="opendata"
      />
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className={` ${classes.CardContainer}`}>
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
            </div>
          </div>
          <div className={`${classes.CardContainer}`}>
            <div className="row" style={{ padding: '0px' }}>
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="entitiesCards"
                title={messages[props.language]['Opendata.StructuresActives']}
                url="http://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-structures-recherche-publiques-actives/"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="entitiesCards"
                title={messages[props.language]['Opendata.PrincipauxEtab']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-principaux-etablissements-enseignement-superieur/information/?disjunctive.type_d_etablissement"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="publicationsCards"
                title={messages[props.language]['Opendata.BSO']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/open-access-monitor-france/information/?disjunctive.oa_host_type&disjunctive.year"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="publicationsCards"
                title={messages[props.language]['Opendata.CIR']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-cir-et-cii-organismes-et-bureaux-de-style-agrees/information/"
                lib_button="Voir"
                target="_blank"
              />
            </div>
          </div>
          <div className={`${classes.CardContainer}`}>
            <div className="row">
              <CardWithButton
                language={props.language}
                messages={messages}
                title={messages[props.language]['Opendata.AppelANR']}
                schema="projectsCards"
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-aap-anr-projets-retenus-participants-identifies/information/?disjunctive.identifiant_de_partenaire"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="projectsCards"
                title={messages[props.language]['Opendata.ParticipationsH2020']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-h2020_participations-dans-les-contrats-signes/information/"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="entitiesCards"
                title={messages[props.language]['Opendata.iLAB']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-laureats-concours-national-i-lab/information/"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="personsCards"
                title={messages[props.language]['Opendata.MT180']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-finalistes-et-laureats-du-concours-ma-these-en-180-secondes-france/information/"
                lib_button="Voir"
                target="_blank"
              />
            </div>
          </div>
          <div className={`${classes.CardContainer}`}>
            <div className="row">
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="personsCards"
                title={messages[props.language]['Opendata.etoiles']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-etoile-de-l-europe/information/"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="entitiesCards"
                title={messages[props.language]['Opendata.RNSR']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-repertoire-national-structures-recherche/information/"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="entitiesCards"
                title={messages[props.language]['Opendata.ED']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-ecoles_doctorales_annuaire/information/"
                lib_button="Voir"
                target="_blank"
              />
              <CardWithButton
                language={props.language}
                messages={messages}
                schema="personsCards"
                title={messages[props.language]['Opendata.IUF']}
                url="https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-iuf-les-membres/information/"
                lib_button="Voir"
                target="_blank"
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
              messages={messages}
              title={messages[props.language]['Opendata.DocuApi']}
              // url="http://scanr-api.enseignementsup-recherche.gouv.fr/swagger-ui"
              target="_blank"
              url="https://scanr-preprod.sword-group.com/api/swagger-ui.html"
              lib_button="Acceder"
              schema="card_dark"
            />
            <CardWithButton
              language={props.language}
              messages={messages}
              title={messages[props.language]['Opendata.EnSavoirPlusApi']}
              url="https://fr.wikipedia.org/wiki/Interface_de_programmation"
              lib_button="Lire"
              target="_blank"
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
              messages={messages}
              schema="card_dark"
              title="Discover.TalkAboutScanr"
              url="./medias"
              lib_button="Voir"
              position="CardCenter"
            />
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
          </div>
        </div>
      </section>
      { /*
      <Banner
        language={props.language}
        labelKey="Appear"
        cssClass="BannerDark"
        url=""
      /> */}
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Opendata;

Opendata.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
