import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import ReactPiwik from 'react-piwik';
import { createBrowserHistory } from 'history';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';

/* Composants */
import HomePage from './Components/Home/Home';
import SearchPage from './Components/Search/Search';
import EntityPage from './Components/Results/Entity/Entity';
import ProductionPage from './Components/Results/Production/Production';
import ProjectPage from './Components/Results/Project/Project';
import PersonPage from './Components/Results/Person/Person';
import FocusList from './Components/Focus-pages/FocusList';
import Focus from './Components/Focus-pages/Focus';
import CurieHome from './Components/Shared/GraphCurie/CurieHome';

/* Pages froides */
import AccessibilityPage from './Components/Abouts/Accessibility/Accessibility';
import ContributePage from './Components/Abouts/Contribute/Contribute';
import ContactPage from './Components/Abouts/Contact/Contact';
import FAQPage from './Components/Abouts/FAQ/FAQ';
import GlossaryPage from './Components/Abouts/Glossary/Glossary';
import LegalNoticePage from './Components/Abouts/Legal-notice/Legal-notice';
import MediasPage from './Components/Abouts/Medias/Medias';
import Opendata from './Components/Abouts/Opendata/Opendata';
import Ressources from './Components/Abouts/Ressources/Ressources';
import TeamAndProjectPage from './Components/Abouts/Team-and-project/Team-and-project';
import TutorialsPage from './Components/Abouts/Tutorials/Tutorials';

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
    const piwik = new ReactPiwik({
      url: 'https://piwik.enseignementsup-recherche.pro',
      siteId: 37,
      trackErrors: true,
    });
    // track the initial pageview
    ReactPiwik.push(['trackPageView']);

    const customHistory = createBrowserHistory();
    addLocaleData([...localeEn, ...localeFr]);
    document.documentElement.setAttribute('lang', this.state.language);
    return (
      <IntlProvider>
        <Router history={piwik.connectToHistory(customHistory)}>
          <React.Fragment>
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
              path="/person/:id"
              render={props => (
                <PersonPage
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
