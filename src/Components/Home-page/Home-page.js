import React from 'react';

import Header from '../Shared/Header/Header-homePage';
import Footer from '../Shared/Footer/Footer';

import Lexicon from '../Shared/Lexicon/Lexicon';

import classes from './Home-page.scss';

const HomePage = () => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header />

    <div>
      ScanR aujourd hui
    </div>

    <div>
      Quelles sont les sources de données ?
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
