import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../Shared/Header/Header-homePage';
import Footer from '../../Shared/Footer/Footer';
import ButtonToPage from '../../Shared/Ui/Buttons/ButtonToPage';
import LogoCard from '../../Shared/Ui/LogoCard/LogoCard';


/* SCSS */
import classes from './Legal-notice.scss';

const LegalNoticePage = props => (
  <div className={`container-fluid ${classes.LegalNoticePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />

    <LogoCard />

    <ButtonToPage
      className={classes.MarginTop}
      url=""
    >
      Découvrir
    </ButtonToPage>
    <Footer language={props.language} />
  </div>

);

export default LegalNoticePage;

LegalNoticePage.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
