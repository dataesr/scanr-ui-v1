import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

export class GlobalContextProvider extends Component {
  constructor(props) {
    super(props);
    this.switchLanguage = this.switchLanguage.bind(this);
    const localLanguage = ['fr', 'en'].includes(navigator.language.split(/[-_]/)[0])
      ? navigator.language.split(/[-_]/)[0]
      : 'en';
    this.state = {
      language: localStorage.getItem('scanr_lang') || localLanguage,
      switchLanguage: this.switchLanguage,
    };
  }


  switchLanguage = (lang) => {
    localStorage.setItem('scanr_lang', lang);
    this.setState({ language: lang });
  }

  render() {
    return (
      <GlobalContext.Provider
        value={{ language: this.state.language, switchLanguage: this.state.switchLanguage }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

GlobalContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
