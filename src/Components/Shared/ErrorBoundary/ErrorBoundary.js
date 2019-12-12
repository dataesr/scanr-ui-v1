import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Axios from 'axios';
import { API_ERRORS_SCANR } from '../../../config/config';
import Errors from '../Errors/Errors';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
    const errorJSON = {
      type: 'React boundary',
      url: window.location.href.toString(),
      agent: window.navigator.userAgent.toString(),
      msg: error.toString(),
      info: info.componentStack,
    };
    Axios.post(API_ERRORS_SCANR, errorJSON);
  }

  render() {
    if (this.state.hasError) {
      return <Errors error={500} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
