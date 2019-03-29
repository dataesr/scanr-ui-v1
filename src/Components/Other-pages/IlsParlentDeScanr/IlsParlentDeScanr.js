import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import DiscoverDataEsr from '../../Shared/DiscoverDataEsr/DiscoverDataEsr';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './IlsParlentDeScanr.scss';


const IlsParlentDeScanr = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  return (
    <IntlProvider locale={props.language} messages={messages[props.language]}>
      <div className={`container-fluid ${classes.IlsParlentDeScanr}`}>
        <Header
          language={props.language}
          switchLanguage={props.switchLanguage}
        />
        <section>
          <HeaderTitle
            language={props.language}
            switchLanguage={props.switchLanguage}
            schema="IlsParlentDeScanr"
          />
        </section>
        <section>
        blabla
        </section>
        <DiscoverDataEsr language={props.language} />
        <Footer language={props.language} />
      </div>
    </IntlProvider>
  );
};

export default IlsParlentDeScanr;

IlsParlentDeScanr.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
