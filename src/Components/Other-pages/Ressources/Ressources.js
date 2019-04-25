import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Background from '../../Shared/images/poudre-bleu_Fgris-B.jpg';
import SimpleCard from './SimpleCard';
import RedirectingLogoCard from '../../Shared/Ui/RedirectingLogoCard/RedirectingLogoCard';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

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
          <div className="row">
            <SimpleCard
              labelKey="Ressources.Ref"
            />
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
          <div className={`row ${classes.Parts}`}>
            <SimpleCard
              labelKey="Ressources.Sources"
            />
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
          <div className={`row ${classes.Parts}`}>
            <SimpleCard
              labelKey="Ressources.Arch"
            />
            <RedirectingLogoCard
              labelKey="hal"
              cssClass="CardLogo"
            />
            <RedirectingLogoCard
              labelKey="prodinra"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.Parts}`}>
            <SimpleCard
              labelKey="Ressources.Outils"
            />
            <RedirectingLogoCard
              labelKey="adresse-data-gouv"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.Parts}`}>
            <SimpleCard
              labelKey="Ressources.Contrib"
            />
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

  renderOneRessource() {
    const ressource = (this.props.match.params.id);
    const role = `Ressource.role.${ressource}`;
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
                {ressource}
              </div>
              <div className={`col-lg-8 ${classes.Titre}`}>
                Rôle
                <div className={classes.TexteGras}>
                  <FormattedHTMLMessage
                    id={role}
                    defaultMessage="contentTexte"
                  />
                </div>
                <div className={classes.Titre}>
                Utilisation dans scanR
                </div>
                <div className={classes.Card}>
                  <div className={classes.CardTitle}>
                    <FormattedHTMLMessage
                      id="contentTexte"
                      defaultMessage="contentTexte"
                    />
                  </div>
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
    const content = (this.props.match.params.id) ? this.renderOneRessource() : this.renderRessources();
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
};
