import React from 'react';
import { FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Header from '../Shared/Header/Header-homePage';
import Search from './Search/Search';
import ScanrToday from '../Shared/ScanrToday/ScanrToday';

import Footer from '../Shared/Footer/Footer';

import Lexicon from '../Shared/Lexicon/Lexicon';

import classes from './Home-page.scss';

const HomePage = props => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />

    <Search />

    <ScanrToday />

    <div>
      <FormattedHTMLMessage
        id="app.title"
        defaultMessage="app.title"
      />
    </div>

    <div>
      10 thèmes les plus actifs
    </div>

    <div>
      Comment apparaitre dans ScanR ?
    </div>

    <div>
      Liste des derniers focus
    </div>

    <div>
      Découvrir dataEsr
    </div>

    <Footer />

    <Lexicon className={classes.HomePageLexiconTop} />
  </div>
);

export default HomePage;

HomePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
