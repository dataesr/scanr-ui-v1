import React from 'react';
import PropTypes from 'prop-types';

// Composants
import Banner from '../Shared/Banner/Banner';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import LastFocus from '../Shared/LastFocus/LastFocus';
// import Lexicon from '../Shared/Lexicon/Lexicon';
// import Search from '../Home-page/Search/Search';

import classes from '../Home/Home.scss';
// import classes from './FocusList.scss';

/**
 * FocusList
 * Url : /focus <br/>
 * Description : Page principale des focus (aperçu des différents graphs et résultats) <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests
 */

const FocusList = props => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />
    <HeaderTitle
      language={props.language}
      labelkey="focus"
      url1="/"
      url2="/focus"
    />
    <LastFocus language={props.language} />
    <Banner
      language={props.language}
      labelKey="DiscoverDataesr"
      cssClass="BannerDark"
      url={`https://data.esr.gouv.fr/${props.language.toUpperCase()}/`}
      target="_blank"
    />
    <Footer language={props.language} />
  </div>
);

export default FocusList;

FocusList.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
