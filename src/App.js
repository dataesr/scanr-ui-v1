import React, { Component, Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import ReactPiwik from 'react-piwik';
import { createBrowserHistory } from 'history';
import localeFr from 'react-intl/locale-data/fr';
import localeEn from 'react-intl/locale-data/en';
import LoadingSpinner from './Components/Shared/LoadingSpinners/RouterSpinner';
import { GlobalContext } from './GlobalContext';
import { doNotDisplay } from './config/doNotConfig';

import Footer from './Components/Shared/Footer/Footer';
import Header from './Components/Shared/Header/Header';
import PageChecker from './Components/Shared/PageChecker/PageChecker';

/* Composants */
const HomePage = lazy(() => import('./Components/Home/Home'));
const SearchPage = lazy(() => import('./Components/Search/Search'));
const EntityPage = lazy(() => import('./Components/Results/Entity/Entity'));
const ProductionPage = lazy(() => import('./Components/Results/Production/Production'));
const ProjectPage = lazy(() => import('./Components/Results/Project/Project'));
const PersonPage = lazy(() => import('./Components/Results/Person/Person'));
const FocusList = lazy(() => import('./Components/Focus/FocusList'));
const Focus = lazy(() => import('./Components/Focus/Focus'));
const AapPage = lazy(() => import('./Components/Aap/Aap'));

/* Pages froides */
const ContactPage = lazy(() => import('./Components/Abouts/Contact/Contact'));
const TutorialPage = lazy(() => import('./Components/Abouts/Tutorial/Tutorial'));
const FAQPage = lazy(() => import('./Components/Abouts/FAQ/FAQ'));
const GlossaryPage = lazy(() => import('./Components/Abouts/Glossary/Glossary'));
const LegalNoticePage = lazy(() => import('./Components/Abouts/Legal-notice/Legal-notice'));
const MediasPage = lazy(() => import('./Components/Abouts/Medias/Medias'));
const Opendata = lazy(() => import('./Components/Abouts/Opendata/Opendata'));
const Ressources = lazy(() => import('./Components/Abouts/Ressources/Ressources'));
const TeamAndProjectPage = lazy(() => import('./Components/Abouts/Team-and-project/Team-and-project'));
const Errors = lazy(() => import('./Components/Shared/Errors/Errors'));

class App extends Component {
  // eslint-disable-next-line
  static contextType = GlobalContext;

  state = {
    piwik: null,
    customHistory: null,
  }

  componentDidMount() {
    const piwik = new ReactPiwik({
      url: process.env.REACT_APP_PIWIK_URL,
      siteId: process.env.REACT_APP_PIWIK_SITE,
      trackErrors: true,
    });
    const customHistory = createBrowserHistory();
    ReactPiwik.push(['requireConsent']);
    ReactPiwik.push(['trackPageView']);
    this.setState({ piwik, customHistory });
  }

  render() {
    const { language: lang } = this.context;
    const { piwik, customHistory } = this.state;
    addLocaleData([...localeEn, ...localeFr]);
    document.documentElement.setAttribute('lang', lang);
    return (
      <IntlProvider locale={lang}>
        <React.Fragment>
          <Header />
          <Router history={(piwik) ? piwik.connectToHistory(customHistory) : null}>
            <Suspense fallback={<LoadingSpinner />}>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/recherche/:api" render={props => (<SearchPage {...props} language={lang} />)} />
                <Redirect from="/structure/:id" to="/entite/:id" />
                <Route path="/entite/:id" render={props => (<EntityPage {...props} language={lang} />)} />
                <Route
                  path="/publication/:id"
                  render={props => (
                    <PageChecker
                      type="publication"
                      id={props.match.params.id}
                      config={doNotDisplay}
                    >
                      <ProductionPage {...props} />
                    </PageChecker>
                  )}
                />
                <Route path="/project/:id" render={props => (<ProjectPage {...props} language={lang} />)} />
                <Route
                  path="/person/:id"
                  render={props => (
                    <PageChecker
                      type="person"
                      id={props.match.params.id}
                      config={doNotDisplay}
                    >
                      <PersonPage {...props} language={lang} />
                    </PageChecker>
                  )}
                />
                <Route path="/trouver-des-partenaires-pour-horizon-europe/:id" render={props => (<AapPage {...props} language={lang} />)} />
                <Route exact path="/focus" render={props => (<FocusList {...props} language={lang} />)} />
                <Route exact path="/focus/:id" render={props => (<Focus {...props} language={lang} />)} />
                <Route exact path="/mentions-legales" component={() => (<LegalNoticePage language={lang} />)} />
                <Route exact path="/l-equipe-et-son-projet" component={() => (<TeamAndProjectPage language={lang} />)} />
                <Route path="/opendata" component={() => (<Opendata language={lang} />)} />
                <Route path={['/ressources/:id', '/ressources']} component={props => (<Ressources {...props} language={lang} />)} />
                <Route exact path="/medias" component={() => (<MediasPage language={lang} />)} />
                <Route exact path={['/faq/:id', '/faq']} component={props => (<FAQPage {...props} language={lang} />)} />
                <Route exact path="/contact" component={() => (<ContactPage language={lang} />)} />
                <Route exact path="/tutorial" component={() => (<TutorialPage language={lang} />)} />
                <Route exact path="/glossaire" component={() => (<GlossaryPage language={lang} />)} />
                <Route exact path="/erreur404" component={() => (<Errors error={404} />)} />
                <Route component={() => (<Errors error={404} />)} />
              </Switch>
            </Suspense>
          </Router>
          <Footer />
        </React.Fragment>
      </IntlProvider>
    );
  }
}

export default App;
