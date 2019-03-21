import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';

/* Composants */
import HomePage from './Components/Home-page/Home-page';
import SearchPage from './Components/Search-page/Search-page';
import LegalNoticePage from './Components/Other-pages/Legal-notice/Legal-notice';
import TeamAndProjectPage from './Components/Other-pages/Team-and-project/Team-and-project';


class App extends Component {
  state: {
    language: null,
  }

  componentWillMount() {
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    const defaultLanguage = navigator.language.split(/[-_]/)[0];

    this.setState({ language: defaultLanguage });
  }

  switchLanguage = (lang) => {
    switch (lang) {
      case 'fr':
        this.setState({ language: lang });
        break;
      case 'en':
        this.setState({ language: lang });
        break;
      default:
        this.setDefaultLanguage();
    }
  }
  // <Route exact path="/" component={HomePage} />

  render() {
    addLocaleData([...localeEn, ...localeFr]);
    return (
      <IntlProvider>
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
                />
              )}
            />

            <Route path="/search" component={SearchPage} />

            <Route
              exact
              path="/legal_notice"
              component={props => (
                <LegalNoticePage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            <Route
              exact
              path="/team_and_project"
              component={props => (
                <TeamAndProjectPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
