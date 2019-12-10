import React, { Component, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import ReactPiwik from 'react-piwik';
import { createBrowserHistory } from 'history';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';

import LoadingSpinner from './Components/Shared/LoadingSpinners/RouterSpinner';
import { GlobalContext } from './GlobalContext';
/* Composants */
const HomePage = lazy(() => import('./Components/Home/Home'));
const SearchPage = lazy(() => import('./Components/Search/Search'));
const EntityPage = lazy(() => import('./Components/Results/Entity/Entity'));
const ProductionPage = lazy(() => import('./Components/Results/Production/Production'));
const ProjectPage = lazy(() => import('./Components/Results/Project/Project'));
const PersonPage = lazy(() => import('./Components/Results/Person/Person'));
const FocusList = lazy(() => import('./Components/Focus/FocusList'));
const Focus = lazy(() => import('./Components/Focus/Focus'));

/* Pages froides */
// const AccessibilityPage = lazy(() => import('./Components/Abouts/Accessibility/Accessibility'));
// const ContributePage = lazy(() => import('./Components/Abouts/Contribute/Contribute'));
// const ContactPage = lazy(() => import('./Components/Abouts/Contact/Contact'));
const FAQPage = lazy(() => import('./Components/Abouts/FAQ/FAQ'));
const GlossaryPage = lazy(() => import('./Components/Abouts/Glossary/Glossary'));
const LegalNoticePage = lazy(() => import('./Components/Abouts/Legal-notice/Legal-notice'));
const MediasPage = lazy(() => import('./Components/Abouts/Medias/Medias'));
const Opendata = lazy(() => import('./Components/Abouts/Opendata/Opendata'));
const Ressources = lazy(() => import('./Components/Abouts/Ressources/Ressources'));
const TeamAndProjectPage = lazy(() => import('./Components/Abouts/Team-and-project/Team-and-project'));
const NoPage = lazy(() => import('./Components/Abouts/NoPage/NoPage'));
// const TutorialsPage = lazy(() => import('./Components/Abouts/Tutorials/Tutorials'));

class App extends Component {
  // eslint-disable-next-line
  static contextType = GlobalContext;

  state = {
    piwik: null,
    customHistory: null,
  }

  componentDidMount() {
    const piwik = new ReactPiwik({
      url: 'https://piwik.enseignementsup-recherche.pro',
      siteId: 37,
      trackErrors: true,
    });
    const customHistory = createBrowserHistory();
    ReactPiwik.push(['requireConsent']);
    ReactPiwik.push(['trackPageView']);
    this.setState({ piwik, customHistory });
  }

  render() {
    addLocaleData([...localeEn, ...localeFr]);
    document.documentElement.setAttribute('lang', this.context.language);
    return (
      <IntlProvider locale={this.context.language}>
        <Router history={(this.state.piwik) ? this.state.piwik.connectToHistory(this.state.customHistory) : null}>
          <Suspense fallback={<LoadingSpinner />}>
            <Switch>
              <Route
                exact
                path="/"
                component={props => (
                  <HomePage
                    {...props}
                  />
                )}
              />
              <Route
                path="/recherche/:api"
                render={props => (
                  <SearchPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              <Route
                path="/entite/:id"
                render={props => (
                  <EntityPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              <Route
                path="/publication/:id"
                render={props => (
                  <ProductionPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              <Route
                path="/project/:id"
                render={props => (
                  <ProjectPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              <Route
                path="/person/:id"
                render={props => (
                  <PersonPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              <Route
                exact
                path="/focus"
                component={props => (
                  <FocusList
                    {...props}
                    language={this.context.language}
                  />
                )}
              />

              <Route
                exact
                path="/focus/:id"
                component={props => (
                  <Focus
                    {...props}
                    language={this.context.language}
                  />
                )}
              />

              {/* vvv--------------- other-pages ------------------vvv  */}
              { /*
              <Route
                exact
                path="/accessibilite"
                component={props => (
                  <AccessibilityPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              /> */}
              <Route
                exact
                path="/mentions-legales"
                component={props => (
                  <LegalNoticePage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />

              <Route
                exact
                path="/l-equipe-et-son-projet"
                component={props => (
                  <TeamAndProjectPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />

              <Route
                path="/opendata"
                component={props => (
                  <Opendata
                    {...props}
                    language={this.context.language}
                  />
                )}
              />

              <Route
                path={['/ressources/:id', '/ressources']}
                component={props => (
                  <Ressources
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              <Route
                exact
                path="/medias"
                component={props => (
                  <MediasPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              { /*
              <Route
                exact
                path="/tutoriels"
                component={props => (
                  <TutorialsPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              /> */}
              <Route
                exact
                path="/faq"
                component={props => (
                  <FAQPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              { /*
              <Route
                exact
                path="/contact"
                component={props => (
                  <ContactPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              /> */}
              <Route
                exact
                path="/glossaire"
                component={props => (
                  <GlossaryPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
              { /*
              <Route
                exact
                path="/contribuer"
                component={props => (
                  <ContributePage
                    {...props}
                    language={this.context.language}
                  />
                )}
              /> */}
              <Route
                component={props => (
                  <NoPage
                    {...props}
                    language={this.context.language}
                  />
                )}
              />
            </Switch>
          </Suspense>
        </Router>
      </IntlProvider>
    );
  }
}

export default App;
