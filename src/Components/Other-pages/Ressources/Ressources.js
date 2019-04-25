import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import Banner from '../../Shared/Banner/Banner';
import CardWithButton from '../../Shared/CardWithButton/CardWithButton';
import Background from '../../Shared/images/poudre-bleu_Fgris-B.jpg';
import SimpleCard from './SimpleCard';
import LogoCard from '../../Shared/Ui/LogoCard/LogoCard';

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
          label="ressources"
        />
      </section>
      <section style={sectionStyle} className={classes.Content}>
        <div className="container">
          <div className="row">
            <SimpleCard
              labelKey="Ressources.Ref"
            />
            <LogoCard
              label="crossref"
              cssClass="CardLogo"
            />
            <LogoCard
              label="datainfogreffe"
              cssClass="CardLogo"
            />
            <LogoCard
              label="grid"
              cssClass="CardLogo"
            />
            <LogoCard
              label="insee"
              cssClass="CardLogo"
            />
            <LogoCard
              label="rnsr"
              cssClass="CardLogo"
            />
            <LogoCard
              label="wikidata"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.parts}`}>
            <SimpleCard
              labelKey="Ressources.Sources"
            />
            <LogoCard
              label="anr"
              cssClass="CardLogo"
            />
            <LogoCard
              label="cnrs"
              cssClass="CardLogo"
            />
            <LogoCard
              label="etalab"
              cssClass="CardLogo"
            />
            <LogoCard
              label="europe"
              cssClass="CardLogo"
            />
            <LogoCard
              label="hceres"
              cssClass="CardLogo"
            />
            <LogoCard
              label="ilab"
              cssClass="CardLogo"
            />
            <LogoCard
              label="innovation2030"
              cssClass="CardLogo"
            />
            <LogoCard
              label="inpi"
              cssClass="CardLogo"
            />
            <LogoCard
              label="inra"
              cssClass="CardLogo"
            />
            <LogoCard
              label="inserm"
              cssClass="CardLogo"
            />
            <LogoCard
              label="institutdefrance"
              cssClass="CardLogo"
            />
            <LogoCard
              label="minrecherche"
              cssClass="CardLogo"
            />
            <LogoCard
              label="minsante"
              cssClass="CardLogo"
            />
            <LogoCard
              label="obssts"
              cssClass="CardLogo"
            />
            <LogoCard
              label="opendata"
              cssClass="CardLogo"
            />
            <LogoCard
              label="thesesfr"
              cssClass="CardLogo"
            />
            <LogoCard
              label="wikipedia"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.parts}`}>
            <SimpleCard
              labelKey="Ressources.Arch"
            />
            <LogoCard
              label="hal"
              cssClass="CardLogo"
            />
            <LogoCard
              label="prodinra"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.parts}`}>
            <SimpleCard
              labelKey="Ressources.Outils"
            />
            <LogoCard
              label="adresse-data-gouv"
              cssClass="CardLogo"
            />
          </div>
          <div className={`row ${classes.parts}`}>
            <SimpleCard
              labelKey="Ressources.Contrib"
            />
            <LogoCard
              label="3cr"
              cssClass="CardLogo"
            />
            <LogoCard
              label="afssi"
              cssClass="CardLogo"
            />
            <LogoCard
              label="agoranov"
              cssClass="CardLogo"
            />
            <LogoCard
              label="asrc"
              cssClass="CardLogo"
            />
            <LogoCard
              label="audiar"
              cssClass="CardLogo"
            />
            <LogoCard
              label="cea"
              cssClass="CardLogo"
            />
            <LogoCard
              label="cradar"
              cssClass="CardLogo"
            />
            <LogoCard
              label="irstea"
              cssClass="CardLogo"
            />
            <LogoCard
              label="simv"
              cssClass="CardLogo"
            />
            <LogoCard
              label="univ-droit"
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

        {this.props.match.params.id}

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
