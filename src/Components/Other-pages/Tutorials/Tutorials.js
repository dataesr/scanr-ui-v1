import React from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
// import Tutorialvideo from './TutorialVideo/TutorialVideo';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './Tutorials.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Tutorials = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <div className={`container-fluid ${classes.Tutorials}`}>
      <Header
        language={props.language}
        switchLanguage={props.switchLanguage}
      />
      <section>
        <HeaderTitle
          language={props.language}
          label="tutorials"
        />
        {
          /*

          <Tutorialvideo
          labelKey="tuto1"
          language={props.language}
          />
          <Tutorialvideo
          labelKey="tuto2"
          language={props.language}
          />
          */
        }
      </section>
      <Footer language={props.language} />
    </div>
  </IntlProvider>
);

export default Tutorials;

Tutorials.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
