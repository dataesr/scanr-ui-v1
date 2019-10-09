import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';

/* Composants */
import HomePage from './Components/Home-page/Home-page';
import SearchPage from './Components/Search-page/Search-page';
import EntityPage from './Components/Results/Entity-page/Entity-page';
import ProductionPage from './Components/Results/Production-page/Production-page';
import ProjectPage from './Components/Results/Project/Project';
import FocusList from './Components/Focus-pages/FocusList';
import Focus from './Components/Focus-pages/Focus';
import CurieHome from './Components/Shared/GraphCurie/CurieHome';

/* Pages froides */
import AccessibilityPage from './Components/Other-pages/Accessibility/Accessibility';
import ContributePage from './Components/Other-pages/Contribute/Contribute';
import ContactPage from './Components/Other-pages/Contact/Contact';
import FAQPage from './Components/Other-pages/FAQ/FAQ';
import GlossaryPage from './Components/Other-pages/Glossary/Glossary';
import LegalNoticePage from './Components/Other-pages/Legal-notice/Legal-notice';
import MediasPage from './Components/Other-pages/Medias/Medias';
import Opendata from './Components/Other-pages/Opendata/Opendata';
import Ressources from './Components/Other-pages/Ressources/Ressources';
import TeamAndProjectPage from './Components/Other-pages/Team-and-project/Team-and-project';
import TutorialsPage from './Components/Other-pages/Tutorials/Tutorials';

import TestAPI from './Components/TestAPI';

class App extends Component {
  state: {
    language: null,
  }

  componentWillMount() {
    this.setDefaultLanguage();
  }

  setDefaultLanguage() {
    this.setState({ language: navigator.language.split(/[-_]/)[0] });
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

  render() {
    addLocaleData([...localeEn, ...localeFr]);
    return (
      <IntlProvider>
        <Router>
          <React.Fragment>
            <Route
              exact
              path="/test"
              component={() => (
                <TestAPI />
              )}
            />
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
            <Route
              path="/recherche/:api"
              render={props => (
                <SearchPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              path="/entite/:id"
              render={props => (
                <EntityPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              path="/publication/:id"
              render={props => (
                <ProductionPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              path="/project/:id"
              render={props => (
                <ProjectPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            <Route
              exact
              path="/focus"
              component={props => (
                <FocusList
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            <Route
              exact
              path="/focus/:id"
              component={props => (
                <Focus
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            <Route
              exact
              path="/curie"
              component={props => (
                <CurieHome
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />

            {/* vvv--------------- other-pages ------------------vvv  */}
            <Route
              exact
              path="/accessibilite"
              component={props => (
                <AccessibilityPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
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
              path={['/ressources/:id', '/ressources']}
              component={props => (
                <Ressources
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              exact
              path="/medias"
              component={props => (
                <MediasPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              exact
              path="/tutoriels"
              component={props => (
                <TutorialsPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              exact
              path="/faq"
              component={props => (
                <FAQPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              exact
              path="/contact"
              component={props => (
                <ContactPage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
            <Route
              exact
              path="/glossaire"
              component={props => (
                <GlossaryPage
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
                <ContributePage
                  {...props}
                  language={this.state.language}
                  switchLanguage={this.switchLanguage}
                />
              )}
            />
          </React.Fragment>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
