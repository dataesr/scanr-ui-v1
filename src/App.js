import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/* Gestion des langues */
import { IntlProvider, addLocaleData } from 'react-intl';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

/* Composants */
import HomePage from './Components/Home-page/Home-page';
import SearchPage from './Components/Search-page/Search-page';

class App extends Component {
  state: {
    language: null,
    messages:{}
  }

  componentWillMount() {
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    const defaultLanguage = navigator.language.split(/[-_]/)[0];
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };
    this.setState({ language: defaultLanguage, messages: messages[defaultLanguage] });
  }

  switchLanguage = (lang) => {
    switch (lang) {
      case 'fr':
        this.setState({ language: lang, messages: messagesFr });
        break;
      case 'en':
        this.setState({ language: lang, messages: messagesEn });
        break;
      default:
        this.setDefaultLanguage();
    }
  }
  // <Route exact path="/" component={HomePage} />

  render() {
    addLocaleData([...localeEn, ...localeFr]);
    return (
      <IntlProvider locale={this.state.language} messages={this.state.messages}>
        <Router>
          <div>
            <Route
              exact
              path="/"
              component={props => (
                <HomePage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />)}
            />
            <Route path="/search" component={SearchPage} />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
