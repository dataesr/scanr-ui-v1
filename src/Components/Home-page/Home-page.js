import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ReactTitle } from 'react-meta-tags';

import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
import LastFocus from '../Shared/LastFocus/LastFocus';
import LexiconPanel from '../Shared/Lexicon/LexiconPanel';
import MostActiveThemes from '../Shared/MostActiveThemes/MostActiveThemes';
import Newsletter from '../Shared/Newsletter/Newsletter';
import ScanrToday from '../Shared/ScanrToday/ScanrToday';
import Search from './Search/Search';
import Banner from '../Shared/Banner/Banner';

import classes from './Home-page.scss';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lexiconTarget: null,
      isSearchFull: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isSearchFull !== this.state.isSearchFull) {
      return true;
    }
    return false;
  }

  handleScroll = () => {
    if (window.scrollY) {
      if (this.state.isSearchFull) { this.setState({ isSearchFull: false }); }
    } else {
      /* eslint-disable */
      if (!this.state.isSearchFull && window.scrollY === 0) { this.setState({ isSearchFull: true }); }
      /* eslint-enable */
    }
  }

  lexiconHandler = (lexiconTarget) => {
    this.setState({ lexiconTarget });
  }

  render() {
    return (
      <div className={`container-fluid ${classes.HomePage}`} onScroll={this.handleScroll}>

        <ReactTitle title="scanR, le moteur de la recherche et de l'innovation - Accueil" />

        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />

        <Search
          {...this.props}
          language={this.props.language}
          isFull={this.state.isSearchFull}
          lexiconHandler={this.lexiconHandler}
        />

        <ScanrToday
          language={this.props.language}
          lexiconHandler={this.lexiconHandler}
        />

        <Banner
          language={this.props.language}
          labelKey="WhatAreOurSources"
          cssClass="BannerLight"
          url="/ressources"
        />

        <MostActiveThemes
          language={this.props.language}
          data={['Brain to computer', 'Anthropologie évolutive', 'Biotechnologie', 'Fusion nucléaire', 'Brain content', 'Cryptographie', 'Matériaux', 'Machine learning', 'Intelligence artificielle', 'Réalité virtuelle']}
        />

        <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerLight"
          url=""
        />

        <LastFocus language={this.props.language} />

        <Newsletter language={this.props.language} />

        <Banner
          language={this.props.language}
          labelKey="DiscoverDataesr"
          cssClass="BannerDark"
          url="https://data.esr.gouv.fr/FR/"
          target="_blank"
        />

        <Footer language={this.props.language} />

        <LexiconPanel
          language={this.props.language}
          target={this.state.lexiconTarget}
          lexiconHandler={this.lexiconHandler}
        />

      </div>
    );
  }
}

export default HomePage;

HomePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
