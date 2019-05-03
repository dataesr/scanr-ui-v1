import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';

// Composants
import DiscoverDataEsr from '../../Shared/DiscoverDataEsr/DiscoverDataEsr';
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import Lexicon from '../../Shared/Lexicon/Lexicon';


// import D3Bar from './D3Bar';
// import D3BarRounded from './D3BarRounded';
// import LMap from './LeafletMap';
// import HighChartsBar from './HighChartsBar';

import classes from '../../Home-page/Home-page.scss';

/**
 * Focus-1 component <br/>
 * Url : /focus/$id <br/>
 * Description : Page présentant les graphs correspondant au focus $id <br/>
 * Tableau de types afin de savoir quel graph charger
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests
 */

// class Focus extends Component {
//   render() {
//     var str = window.location.href.split('/');
//     var test = <p>There is no focus id</p>
//     var id = str[str.length-1]
//     if (id != '' && str.length == 5) {
//         test = <p>Focus id is {id}</p>
//     }
//     return (
//       <div>
//           <p>Focus page</p>
//           {test}
//       </div>
//     );
//   }
// }

// const graphTypes = ['map', 'bar', 'donut', 'bubbles', 'treemap', 'histBubbles', 'cloudBubbles'];

const paramsFile = require('../focus.json');

const path = window.location.pathname.split('/');

let BlockComponent = '';

let GraphComponent = '';

// const LoadableComponent = Loadable({
//   loader: () => import(component),
//   loading: () => <div>{component}</div>
// });

class FocusId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch('http://10.243.98.74/organizations/scanr?where=%7B%22badges.code%22:%20%22ResCurie%22%7D')
      .then(res => res.json())
      .then(json => alert(json.data[0].id));
  }

  render() {
    const id = Number(this.props.match.params.id);
    try {
      switch (paramsFile.elems[id].type) {
        case 'map':
          GraphComponent = Loadable({
            loader: () => import('./LeafletMap'),
            loading: () => <div>Chargement en cours...</div>,
          });
          break;
        case 'bar':
          GraphComponent = Loadable({
            loader: () => import('./HighChartsBar'),
            loading: () => <div>Chargement en cours...</div>,
          });
          break;
        default:
          GraphComponent = '';
      }

      const TitleComponent = () => (
        <div>{paramsFile.elems[id].name}</div>
      );

      const TextComponent = () => (
        <div>{paramsFile.elems[id].text}</div>
      );

      BlockComponent = () => (
        <div>
          <TitleComponent />
          <GraphComponent />
          <TextComponent />
        </div>
      );
    } catch (error) {
      BlockComponent = () => (
        <p>{"Désolé, ce focus n'existe pas..."}</p>
      );
    }
    return (
      <div className={`container-fluid ${classes.HomePage}`}>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />

        {/* <LastFocus language={props.language} /> */}

        <DiscoverDataEsr language={this.props.language} />

        <div>
          <p>BlaBlaBla</p>
          <br />
          <p>BlaBlaBla</p>
          <br />
          <p>BlaBlaBla</p>
          <br />
        </div>

        <BlockComponent />

        <div id="d3" />
        {
      // <D3Bar />
      //
      // <D3BarRounded />
      //
      // <LMap />
      //
      // <HighChartsBar />

        // <LoadableComponent />
      }

        <Footer language={this.props.language} />

        <Lexicon
          className={classes.HomePageLexiconTop}
          language={this.props.language}
        />
      </div>
    );
  }
}

// const FocusId = props => (
  // <div className={`container-fluid ${classes.HomePage}`}>
  //   <Header
  //     language={props.language}
  //     switchLanguage={props.switchLanguage}
  //   />
  //
  //   {/* <LastFocus language={props.language} /> */}
  //
  //   <DiscoverDataEsr language={props.language} />
  //
  //   <div>
  //     <p>BlaBlaBla</p>
  //     <br />
  //     <p>BlaBlaBla</p>
  //     <br />
  //     <p>BlaBlaBla</p>
  //     <br />
  //   </div>
  //
  //   <BlockComponent />
  //
  //   <Test />
  //
  //   <div id="d3" />
  //   {
  // // <D3Bar />
  // //
  // // <D3BarRounded />
  // //
  // // <LMap />
  // //
  // // <HighChartsBar />
  //
  //   // <LoadableComponent />
  // }
  //
  //   <Footer language={props.language} />
  //
  //   <Lexicon
  //     className={classes.HomePageLexiconTop}
  //     language={props.language}
  //   />
  // </div>
// );

export default FocusId;

FocusId.propTypes = {
  match: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
