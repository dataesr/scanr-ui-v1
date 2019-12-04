import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Logo from '../svg/logo-scanr-blue';
/* Style */
import styles from '../../../style.scss';
import classes from './Errors.scss';


const Errors = () => (
  <React.Fragment>
    <Header />
    <div className={`d-flex flex-column align-items-center justify-content-center ${classes.Error}`}>
      <Logo fill={styles.scanrdeepblueColor} width="300px" height="90px" />
      <div className={classes.FourOFour}>
        Oops... Une erreur est survenue.
      </div>
    </div>
    <Footer />
  </React.Fragment>
);

export default Errors;
