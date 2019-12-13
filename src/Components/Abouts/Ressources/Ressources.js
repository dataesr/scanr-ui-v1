import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
// import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Background from '../../Shared/images/poudre-bleu_Fgris-B.jpg';
import Backgroundblanc from '../../Shared/images/poudre-bleu_Fblanc-A.jpg';
import RedirectingLogoCard from '../../Shared/Ui/RedirectingLogoCard/RedirectingLogoCard';
import IdentityCard from './IdentityCard';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* Import des métadonnées */
import metadata from './metadata.json';

/* SCSS */
import classes from './Ressources.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const sectionStyle = {
  backgroundImage: `url(${Background})`,
};
const sectionStyleblanc = {
  backgroundImage: `url(${Backgroundblanc})`,
};

class Ressources extends Component {
  renderRessources = () => (
    <div className={`container-fluid ${classes.Ressources}`}>
      <Header
        language={this.props.language}
        switchLanguage={this.props.switchLanguage}
      />
      <section>
        <HeaderTitle
          url1="/"
          language={this.props.language}
          labelkey="ressources"
        />
      </section>
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                {(this.props.language === 'fr') ? 'RÉFÉRENTIELS' : 'REFERENTIALS' }
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="doi"
              imageName="logo-doi.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="grid"
              imageName="logo-grid.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="insee"
              imageName="logo-insee.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="rnsr"
              imageName="logo-rnsr.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="idref"
              imageName="logo-idref.png"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="orcid"
              imageName="logo-orcid.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="wikidata"
              imageName="logo-wikidata.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="cpc"
              imageName="logo-cpc.jpg"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                SOURCES
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="unpaywall"
              imageName="logo-unpaywall.png"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="sudoc"
              imageName="logo-sudoc.jpg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="thesesfr"
              imageName="logo-thesesfr.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="bso"
              imageName="logo-bso.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="wikipedia"
              imageName="logo-wikipedia.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="opendata"
              imageName="logo-opendata.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-europe.svg"
              labelKey="europe"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="hceres"
              imageName="logo-hceres.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="inpi"
              imageName="logo-inpi.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="patstat"
              imageName="logo-patstat.gif"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="core"
              imageName="logo-core.png"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="swh"
              imageName="swh-logo.jpg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="datainfogreffe"
              imageName="logo-datainfogreffe.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="casdar"
              imageName="logo-casdar.png"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="anr"
              imageName="logo-anr.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="phc"
              imageName="logo-phc.svg"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                {(this.props.language === 'fr') ? 'ARCHIVES OUVERTES' : 'OPEN REPOSITORIES' }
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="hal"
              imageName="logo-hal.svg"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                {(this.props.language === 'fr') ? 'OUTILS' : 'TOOLS' }
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="adresse"
              imageName="logo-adresse-data-gouv.svg"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                {(this.props.language === 'fr') ? 'ONT CONTRIBUÉ À SCANR' : 'CONTRIBUTED TO SCANR' }
              </div>
            </div>
            <RedirectingLogoCard
              imageName="logo-3cr.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-afssi.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-asrc.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-irstea.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-simv.svg"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                {(this.props.language === 'fr') ? 'ONT CONTRIBUÉ AU REPÉRAGE DE LEUR PROPRES ARTICIPANTS DES PROJETS H2020' : 'CONTRIBUTED TO THE IDENTIFICATION OF THEIR OWN PARTICIPANTS IN H2020 PROJECTS' }
              </div>
            </div>
            <RedirectingLogoCard
              imageName="logo-inra.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-inria.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-cnrs.svg"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-onera.png"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              imageName="logo-cea.svg"
              cssClass="CardLogo"
            />
          </div>
        </div>
      </section>
      <section style={sectionStyleblanc} className={classes.ThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={this.props.language}
              messages={messages}
              title="Discover.TalkAboutScanr"
              url="./medias"
              lib_button="Voir"
              position="CardCenter"
              schema="card_dark"
            />
            <CardWithButton
              language={this.props.language}
              messages={messages}
              title="Discover.Opendata"
              url="./opendata"
              lib_button="Voir"
              position="CardCenter"
              schema="card_dark"
            />
            <CardWithButton
              language={this.props.language}
              messages={messages}
              title="Discover.Team"
              url="./l-equipe-et-son-projet"
              lib_button="Voir"
              position="CardCenter"
              schema="card_dark"
            />
          </div>
        </div>
      </section>
      <Footer language={this.props.language} />
    </div>
  )

  renderOneRessource = () => {
    const ressource = this.props.match.params.id;
    const imageName = metadata[`${ressource}.ImageName`];
    const message = messages[this.props.language];
    const source = (metadata[`${ressource}.Source`]) ? (
      <a href={metadata[`${ressource}.Source`]} target="_blank" rel="noopener noreferrer">
        <div className={`row ${classes.SourceSource}`}>
          Source
        </div>
      </a>
    ) : null;
    const utilisation2 = (message[`Ressource.Utilisation2.${ressource}`]) ? (
      <div className={classes.SourceCard}>
        <div className={classes.SourceCardTitle}>
          <FormattedHTMLMessage
            id={`Ressource.Utilisation2.${ressource}`}
            defaultMessage="contentTexte"
          />
        </div>
      </div>
    ) : null;
    const utilisation3 = (message[`Ressource.Utilisation3.${ressource}`]) ? (
      <div className={classes.SourceCard}>
        <div className={classes.SourceCardTitle}>
          <FormattedHTMLMessage
            id={`Ressource.Utilisation3.${ressource}`}
            defaultMessage="contentTexte"
          />
        </div>
      </div>
    ) : null;
    const utilisation4 = (message[`Ressource.Utilisation4.${ressource}`]) ? (
      <div className={classes.SourceCard}>
        <div className={classes.SourceCardTitle}>
          <FormattedHTMLMessage
            id={`Ressource.Utilisation4.${ressource}`}
            defaultMessage="contentTexte"
          />
        </div>
      </div>
    ) : null;
    const utilisation = (message[`Ressource.Utilisation1.${ressource}`]) ? (
      <Fragment>
        <div className={classes.SourceTitre}>
          <FormattedHTMLMessage
            id="Ressource.Utilisation.Titre"
            defaultMessage="s"
          />
        </div>
        <div className={`row ${classes.Utilisation}`}>
          <div className={classes.SourceCard}>
            <div className={classes.SourceCardTitle}>
              <FormattedHTMLMessage
                id={`Ressource.Utilisation1.${ressource}`}
                imageName={imageName}
                defaultMessage="contentTexte"
              />
            </div>
          </div>
          {utilisation2}
          {utilisation3}
          {utilisation4}
        </div>
        <hr className={classes.SourceDemarcation} />
      </Fragment>
    ) : null;
    const retraitements2 = (message[`Ressource.Retraitements2.${ressource}`]) ? (
      <div className={classes.SourceCard}>
        <div className={classes.SourceCardTitle}>
          <FormattedHTMLMessage
            id={`Ressource.Retraitements2.${ressource}`}
            defaultMessage="contentTexte"
          />
        </div>
      </div>
    ) : null;
    const retraitements = (message[`Ressource.Retraitements.${ressource}`]) ? (
      <Fragment>
        <div className={classes.SourceTitre}>
          <FormattedHTMLMessage
            id="Ressource.Retraitements.Titre"
            defaultMessage=" "
          />
        </div>
        <div className={`row ${classes.Utilisation}`}>
          <div className={classes.SourceCard}>
            <div className={classes.SourceCardTitle}>
              <FormattedHTMLMessage
                id={`Ressource.Retraitements.${ressource}`}
                defaultMessage="contentTexte"
              />
            </div>
          </div>
          {retraitements2}
        </div>
        <hr className={classes.SourceDemarcation} />
      </Fragment>
    ) : null;
    const perimetre = (message[`Ressource.Perimetre.${ressource}`]) ? (
      <Fragment>
        <div className={classes.SourceTitre}>
          <FormattedHTMLMessage
            id="Ressource.Perimetre.Titre"
            defaultMessage=" "
          />
        </div>
        <div className={classes.SourceTextenormal}>
          <FormattedHTMLMessage
            id={`Ressource.Perimetre.${ressource}`}
            defaultMessage=" "
          />
        </div>
      </Fragment>
    ) : null;
    const actualisation = (message[`Ressource.Actualisation.${ressource}`]) ? (
      <Fragment>
        <div className={classes.SourceTitre}>
          <FormattedHTMLMessage
            id="Ressource.Actualisation.Titre"
            defaultMessage=" "
          />
        </div>
        <div className={classes.SourceTextenormal}>
          <FormattedHTMLMessage
            id={`Ressource.Actualisation.${ressource}`}
            defaultMessage=" "
          />
        </div>
      </Fragment>
    ) : null;
    return (
      <div className={`container-fluid ${classes.Ressources}`}>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <section>
          <HeaderTitle
            language={this.props.language}
            labelkey="ressources"
            url1="/"
            url2="/ressources"
          />
        </section>
        <section style={sectionStyle} className={classes.Content}>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <IdentityCard
                  labelKey={ressource}
                  imageName={imageName}
                  /* webSite={metadata[`${ressource}.website`]} */
                />
              </div>
              <div className="col-sm-8">
                <div className={classes.SourceTitre}>
                  <FormattedHTMLMessage
                    id="Ressource.Role.Titre"
                    defaultMessage=" "
                  />
                </div>
                <div className={classes.SourceTexteGras}>
                  <FormattedHTMLMessage
                    id={`Ressource.Role.${ressource}`}
                    defaultMessage=" "
                  />
                </div>
                {/* /row */}
                <hr className={classes.SourceDemarcation} />
                <div className={classes.SourceTitre}>
                  <FormattedHTMLMessage
                    id="Ressource.Description.Titre"
                    defaultMessage=" "
                  />
                </div>
                <div className={classes.SourceTextenormal}>
                  <FormattedHTMLMessage
                    id={`Ressource.Description.${ressource}`}
                    defaultMessage=" "
                  />
                </div>
                {source}
                {/* /row */}
                <hr className={classes.SourceDemarcation} />
                {utilisation}
                {perimetre}
                {actualisation}
                {retraitements}
              </div>
            </div>
          </div>
        </section>
        <section style={sectionStyleblanc} className={classes.SourceThreeCards}>
          <div className="container">
            <div className="row">
              <CardWithButton
                language={this.props.language}
                messages={messages}
                title="Discover.FAQ"
                url="/faq"
                lib_button="Voir"
                position="CardCenter"
                schema="card_dark"
              />
              <CardWithButton
                language={this.props.language}
                messages={messages}
                title="Discover.Opendata"
                url="/opendata"
                lib_button="Voir"
                position="CardCenter"
                schema="card_dark"
              />
              <CardWithButton
                language={this.props.language}
                messages={messages}
                title="Discover.Team"
                url="/l-equipe-et-son-projet"
                lib_button="Voir"
                position="CardCenter"
                schema="card_dark"
              />
            </div>
          </div>
        </section>
        <Footer language={this.props.language} />
      </div>
    );
  }

  render() {
    let content = this.renderRessources();
    if (this.props.match.params.id) {
      content = this.renderOneRessource();
    }

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <Fragment>
          {content}
        </Fragment>
      </IntlProvider>
    );
  }
}

export default Ressources;

Ressources.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.any,
};
