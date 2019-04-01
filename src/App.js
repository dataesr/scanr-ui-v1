import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';

/* Composants */
import Contribute from './Components/Other-pages/Contribute/Contribute';
import HomePage from './Components/Home-page/Home-page';
import LegalNoticePage from './Components/Other-pages/Legal-notice/Legal-notice';
import Opendata from './Components/Other-pages/Opendata/Opendata';
import SearchPage from './Components/Search-page/Search-page';
import TeamAndProjectPage from './Components/Other-pages/Team-and-project/Team-and-project';
import TheyTalkAboutScanrPage from './Components/Other-pages/They-talk-About-Scanr/They-talk-About-Scanr';


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


            {/* vvv--------------- other-pages ------------------vvv  */}

            <Route
              exact
              path="/mentions-legales"
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
              path="/l-equipe-et-son-projet"
              component={props => (
                <TeamAndProjectPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            <Route
              exact
              path="/opendata"
              component={props => (
                <Opendata
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            <Route
              exact
              path="/ils-parlent-de-scanr"
              component={props => (
                <TheyTalkAboutScanrPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              exact
              path="/contribuer"
              component={props => (
                <Contribute
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
