import React from 'react';
import PropTypes from 'prop-types';

// Composants
import ComponentToPage from '../Shared/ComponentToPage/ComponentToPage';
import DiscoverDataEsr from '../Shared/DiscoverDataEsr/DiscoverDataEsr';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
import LastFocus from '../Shared/LastFocus/LastFocus';
import Lexicon from '../Shared/Lexicon/Lexicon';
import Search from '../Home-page/Search/Search';

import classes from '../Home-page/Home-page.scss';

/**
 * List-Home-page component <br/>
 * Url : /focus <br/>
 * Description : Page principale des focus (aperçu des différents graphs et résultats) <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests
 */

const Focus = props => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />

    {/* <Search language={props.language} /> */}

    <LastFocus language={props.language} />

    <ComponentToPage
      labelKey="HowToAppearInScanR"
      language={props.language}
      url=""
    />

    <LastFocus language={props.language} />

    <DiscoverDataEsr language={props.language} />

    <Footer language={props.language} />

    <Lexicon
      className={classes.HomePageLexiconTop}
      language={props.language}
    />
  </div>
);

export default Focus;

Focus.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
