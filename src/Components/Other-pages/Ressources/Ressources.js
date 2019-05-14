import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Background from '../../Shared/images/poudre-bleu_Fgris-B.jpg';
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
      <section className={classes.ThreeCards}>
        <div className="container">
          <div className="row">
            <CardWithButton
              language={this.props.language}
              title="Discover.Sources"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
              position="CardCenter"
              schema="card_dark"
            />
            <CardWithButton
              language={this.props.language}
              title="Discover.TalkAboutScanr"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
              lib_button="Découvrir"
              position="CardCenter"
              schema="card_dark"
            />
            <CardWithButton
              language={this.props.language}
              title="Discover.Opendata"
              url="https://worldwide.espacenet.com/?locale=fr_EP"
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
    return (
      <div className={`container-fluid ${classes.Ressources}`}>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <section>
          <HeaderTitle
            language={this.props.language}
            label="ressources"
          />
        </section>
        <section style={sectionStyle} className={classes.Content}>
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <IdentityCard
                  labelKey={ressource}
                  /* webSite={metadata[`${ressource}.website`]} */
                />
              </div>
              <div className="col-lg-8">
                <div className={classes.SourceTitre}>
                Rôle
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
                Description
                </div>
                <div className={classes.SourceTextenormal}>
                  <FormattedHTMLMessage
                    id={`Ressource.Description.${ressource}`}
                    defaultMessage="s"
                  />
                </div>
                <a href={metadata[`${ressource}.Source`]} target="_blank" rel="noopener noreferrer">
                  <div className={`row ${classes.SourceSource}`}>
                    Source
                  </div>
                </a>
                {/* /row */}
                <hr className={classes.SourceDemarcation} />
                <div className={classes.SourceTitre}>
                Utilisation dans scanR
                </div>
                <div className="row">
                  <div className={classes.SourceCard}>
                    <div className={classes.SourceCardTitle}>
                      <FormattedHTMLMessage
                        id={`Ressource.Utilisation1.${ressource}`}
                        defaultMessage="contentTexte"
                      />
                    </div>
                  </div>
                  <div className={classes.SourceCard}>
                    <div className={classes.SourceCardTitle}>
                      <FormattedHTMLMessage
                        id={`Ressource.Utilisation2.${ressource}`}
                        defaultMessage="contentTexte"
                      />
                    </div>
                  </div>
                </div>
                <hr className={classes.SourceDemarcation} />
                <div className={classes.SourceTitre}>
                Périmètre d'utilisation de la source dans scanR
                </div>
                <div className={classes.SourceTextenormal}>
                  <FormattedHTMLMessage
                    id={`Ressource.Perimetre.${ressource}`}
                    defaultMessage="s"
                  />
                </div>
              </div>
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
    console.log('id:', this.props.match.params.id);
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
