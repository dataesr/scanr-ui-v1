import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Logo from '../svg/logo-scanr-blue';
import styles from '../../../style.scss';
import classes from './ErrorBoundary.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
    // logErrorToMyService(error, errorInfo);
    /* eslint-disable */
    console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    console.log(JSON.stringify(errorInfo, Object.getOwnPropertyNames(errorInfo)));
    /* eslint-enable */
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return (
        <Fragment>
          <Header />
          <div className={`d-flex flex-column align-items-center justify-content-center ${classes.Error}`}>
            <Logo fill={styles.scanrdeepblueColor} width="300px" height="90px" />
            <div className={classes.FourOFour}>
              Oops... Une erreur est survenue.
            </div>
          </div>
          <Footer />
        </Fragment>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
