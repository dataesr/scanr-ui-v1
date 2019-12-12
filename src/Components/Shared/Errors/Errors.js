import React, { useContext } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import { GlobalContext } from '../../../GlobalContext';
import Logo from '../svg/logo-scanr-blue';
/* Style */
import styles from '../../../style.scss';
import classes from './Errors.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const Errors = (props) => {
  const context = useContext(GlobalContext);
  const msgId = `Error${props.error}`;
  return (
    <IntlProvider locale={context.language} messages={messages[context.language]}>
      <React.Fragment>
        <Header />
        <div className={`d-flex flex-column align-items-center justify-content-center ${classes.Error}`}>
          <Logo fill={styles.scanrdeepblueColor} width="300px" height="90px" />
          <div className={classes.FourOFour}>
            <FormattedHTMLMessage
              id={msgId}
            />
          </div>
        </div>
        <Footer />
      </React.Fragment>
    </IntlProvider>
  );
};

export default Errors;

Errors.propTypes = {
  error: PropTypes.number.isRequired,
};
