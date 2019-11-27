import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Axios from 'axios';
import Markdown from 'markdown-to-jsx';
// Composants
import MetaFocus from '../Shared/MetaTags/MetaFocus';
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
import Banner from '../Shared/Banner/Banner';
import ButtonToPage from '../Shared/Ui/Buttons/ButtonToPage';
// import LexiconPanel from '../../Shared/Lexicon/LexiconPanel';
import getSelectKey from '../../Utils/getSelectKey';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import EntityMap from '../Shared/StandaloneGraphs/EntityMap';
import PublicationsKeywords from '../Shared/StandaloneGraphs/PublicationsKeywords';
import PublicationsPacketBubble from '../Shared/StandaloneGraphs/PublicationsPacketBubble';
import SimpleAggregationGraph from '../Shared/StandaloneGraphs/SimpleAggregationGraph';
import LastFocus from '../Shared/LastFocus/LastFocus';
import classes from './Focus.scss';

// const EntityMap = lazy(() => import('./Components/EntityMap'));
// const authorization = 'YWRtaW46ZGF0YUVTUjIwMTk=';

/**
 * Focus
 * Url : /focus/$id <br/>
 *  Description : Page qui va charger GraphComponent <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

const Components = {
  EntityMap,
  PublicationsKeywords,
  PublicationsPacketBubble,
  SimpleAggregationGraph,
};

export default class Focus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      title: null,
      text: null,
      href: null,
      hrefX: null,
      tags: [],
      components: [],
    };
  }

  componentDidMount() {
    const filename = `./Configs/${this.props.match.params.id}.json`;
    try {
      // eslint-disable-next-line
      const params = require(`${filename}`);
      this.setState(params);
    } catch (error) {
      this.setState({ error: true });
    }
  }

  buildFocusFromConfig = () => {
    const componentsData = [];
    this.state.components.forEach((component) => {
      const properties = {
        request: component.request,
        api: component.api,
        aggSize: component.aggSize,
        aggField: component.aggField,
        filename: component.filenam,
        graphType: component.graphType,
        title: getSelectKey(component, 'title', this.props.language, 'fr'),
        subtitle: getSelectKey(component, 'subtitle', this.props.language, 'fr'),
        language: this.props.language,
      };
      const Comp = Components[component.componentType];
      componentsData.push(<React.Fragment key={component.title.fr}><Comp {...properties} /></React.Fragment>);
    });
    return componentsData;
  }

  render() {
    if (!this.state.title || this.state.error) {
      return null;
    }
    const htmlList = this.buildFocusFromConfig();
    const pageTitle = 'Scanr | Focus | '.concat(getSelectKey(this.state, 'title', this.props.language, 'fr'));
    const pageDescription = "ScanR est un outil d'aide à l'exploration, au suivi et à la caractérisation des activités de recherche et d'innovation des acteurs français (publics et privés) de la recherche";
    const pageImage = '../Shared/svg/logo-scanr-blue.svg';
    // const exporting = true;
    const href1 = './';
    const href2 = './focus';
    const href3 = './focus/'.concat(this.props.match.params.id);
    return (
      <div className="d-flex flex-column h-100">
        <MetaFocus
          pageDescription={pageDescription}
          pageTitle={pageTitle}
          pageImage={pageImage}
          href1={href1}
          href2={href2}
          href3={href3}
          title={getSelectKey(this.state, 'title', this.props.language, 'fr')}
        />
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <HeaderTitle
          language={this.props.language}
          title={getSelectKey(this.state, 'title', this.props.language, 'fr')}
          labelkey="focus"
          url1="/"
          url2="/focus"
        />
        <section className={classes.FocusSection}>
          <div className="container d-flex flex-column pb-4">
            <div className="py-3 px-2">
              <Markdown>{getSelectKey(this.state, 'text', this.props.language, 'fr')}</Markdown>
              <div className="container d-flex py-1 align-items-center">
                <div className="flex-grow-1">
                  {
                    (this.state.tags)
                      ? getSelectKey(
                        this.state,
                        'tags',
                        this.props.language,
                        'fr',
                      ).map(tag => <a key={tag} href={`/recherche/all?query=${tag}`} className="pr-1">{`#${tag} `}</a>)
                      : null
                  }
                </div>
                <div className="pl-2">
                  {
                    (this.state.href)
                      ? (
                        <ButtonToPage
                          className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                          target="_blank"
                          url={this.state.href}
                        >
                          {(this.props.language === 'fr') ? 'Explorer dans scanR' : 'Explore in scanR'}
                        </ButtonToPage>
                      )
                      : null
                  }
                </div>
                <div className="pl-2">
                  {
                    (this.state.hrefOpenData)
                      ? (
                        <ButtonToPage
                          className={`${classes.RectangleButton} ${classes.btn_scanrBlue}`}
                          target="_blank"
                          url={this.state.href}
                        >
                          {(this.props.language === 'fr') ? 'Explorer le jeu Opendata' : 'Explore in Opendata'}
                        </ButtonToPage>
                      )
                      : null
                  }
                </div>
              </div>
            </div>
            {htmlList.map(elem => elem)}
          </div>
        </section>
        <Banner
          language={this.props.language}
          labelKey="Explore"
          cssClass="BannerDark"
          url={this.state.hrefX}
          target="_blank"
        />
        <LastFocus language={this.props.language} />
        <Footer language={this.props.language} />
      </div>
    );
  }
}

Focus.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
