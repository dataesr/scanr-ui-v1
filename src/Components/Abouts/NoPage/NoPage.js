import React from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styles from '../../../style.scss';
import Logo from '../../Shared/svg/logo-scanr-blue';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* SCSS */
import classes from './NoPage.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const NoPage = props => (
  <IntlProvider locale={props.language} messages={messages[props.language]}>
    <React.Fragment>
      <Header />
      <div className={`d-flex flex-column align-items-center justify-content-center ${classes.NoPage}`}>
        <Logo fill={styles.scanrdeepblueColor} width="300px" height="90px" />
        <div className={classes.FourOFour}>
          <FormattedHTMLMessage
            id="Error404"
            defaultMessage="Error404"
          />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  </IntlProvider>
);

export default NoPage;

NoPage.propTypes = {
  language: PropTypes.string.isRequired,
};
