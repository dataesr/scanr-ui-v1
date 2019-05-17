import React from 'react';
import PropTypes from 'prop-types';

// Composants
import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import Lexicon from '../../Shared/Lexicon/Lexicon';
import GraphComponent from './GraphComponent';
import HeaderTitle from '../../Shared/HeaderTitle/HeaderTitle';
import LastFocus from '../../Shared/LastFocus/LastFocus';

import classes from './GraphComponent.scss';

/**
 * Focus-1 component <br/>
 * Url : /focus/$id <br/>
 * Description : Page qui va charger GraphComponent <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>
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

const FocusId = props => (
  <div className={`container-fluid ${classes.HomePage}`}>
    <Header
      language={props.language}
      switchLanguage={props.switchLanguage}
    />
    <HeaderTitle
      language={props.language}
      labelkey="focus"
      url1="/"
      url2="/focus"
    />

    {/* <LastFocus language={props.language} /> */}

    {/* } <DiscoverDataEsr language={props.language} /> */}
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <GraphComponent
            id={props.match.params.id}
            language={props.language}
          />
        </div>
      </div>
    </div>

    <LastFocus />

    <Footer language={props.language} />

    <Lexicon
      className={classes.HomePageLexiconTop}
      language={props.language}
    />
  </div>
);

export default FocusId;

FocusId.propTypes = {
  match: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
