import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
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
          language={this.props.language}
          labelkey="ressources"
        />
      </section>
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                RÉFÉRENTIELS
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="crossref"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="datainfogreffe"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="grid"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="insee"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="rnsr"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="wikidata"
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
              labelKey="anr"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="cnrs"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="etalab"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="europe"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="hceres"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="ilab"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="innovation2030"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="inpi"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="inra"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="inserm"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="institutdefrance"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="minrecherche"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="minsante"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="obssts"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="opendata"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="thesesfr"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="wikipedia"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                ARCHIVES OUVERTES
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="hal"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="prodinra"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                OUTILS
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="adresse-data-gouv"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.SourcesPart}`}>
            <div className={classes.SourcesCard}>
              <div className={classes.Title}>
                ONT CONTRIBUÉ À SCANR
              </div>
            </div>
            <RedirectingLogoCard
              labelKey="3cr"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="afssi"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="agoranov"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="asrc"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="audiar"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="cea"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="cradar"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="irstea"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="simv"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="univ-droit"
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
              title="Discover.TalkAboutScanr"
              url="./medias"
              lib_button="Découvrir"
              position="CardCenter"
              schema="card_dark"
            />
            <CardWithButton
              language={this.props.language}
              title="Discover.Opendata"
              url="./opendata"
              lib_button="Découvrir"
              position="CardCenter"
              schema="card_dark"
            />
            <CardWithButton
              language={this.props.language}
              title="Discover.Team"
              url="./l-equipe-et-son-projet"
              lib_button="Découvrir"
              position="CardCenter"
              schema="card_dark"
            />
          </div>
        </div>
      </section>
      <Banner
        language={this.props.language}
        labelKey="Appear"
        cssClass="BannerDark"
      />
      <Footer language={this.props.language} />
    </div>
  )

  renderOneRessource = () => {
    const ressource = this.props.match.params.id;
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
            defaultMessage="s"
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
            defaultMessage="s"
          />
        </div>
        <div className={classes.SourceTextenormal}>
          <FormattedHTMLMessage
            id={`Ressource.Perimetre.${ressource}`}
            defaultMessage="s"
          />
        </div>
      </Fragment>
    ) : null;
    const actualisation = (message[`Ressource.Actualisation.${ressource}`]) ? (
      <Fragment>
        <div className={classes.SourceTitre}>
          <FormattedHTMLMessage
            id="Ressource.Actualisation.Titre"
            defaultMessage="s"
          />
        </div>
        <div className={classes.SourceTextenormal}>
          <FormattedHTMLMessage
            id={`Ressource.Actualisation.${ressource}`}
            defaultMessage="s"
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
          />
        </section>
        <section style={sectionStyle} className={classes.Content}>
          <div className="container">
            <div className="row">
              <div className="col-sm-4">
                <IdentityCard
                  labelKey={ressource}
                  /* webSite={metadata[`${ressource}.website`]} */
                />
              </div>
              <div className="col-sm-8">
                <div className={classes.SourceTitre}>
                  <FormattedHTMLMessage
                    id="Ressource.Role.Titre"
                    defaultMessage="s"
                  />
                </div>
                <div className={classes.SourceTexteGras}>
                  <FormattedHTMLMessage
                    id={`Ressource.Role.${ressource}`}
                    defaultMessage="s"
                  />
                </div>
                {/* /row */}
                <hr className={classes.SourceDemarcation} />
                <div className={classes.SourceTitre}>
                  <FormattedHTMLMessage
                    id="Ressource.Description.Titre"
                    defaultMessage="s"
                  />
                </div>
                <div className={classes.SourceTextenormal}>
                  <FormattedHTMLMessage
                    id={`Ressource.Description.${ressource}`}
                    defaultMessage="s"
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
                title="Discover.Github"
                url=""
                lib_button="Découvrir"
                position="CardCenter"
                schema="card_lightdark"
              />
              <CardWithButton
                language={this.props.language}
                title="Discover.Opendata"
                url="../opendata"
                lib_button="Découvrir"
                position="CardCenter"
                schema="card_lightdark"
              />
              <CardWithButton
                language={this.props.language}
                title="Discover.Team"
                url="../l-equipe-et-son-projet"
                lib_button="Découvrir"
                position="CardCenter"
                schema="card_lightdark"
              />
            </div>
          </div>
        </section>
        <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerDark"
        />
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
