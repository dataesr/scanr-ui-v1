import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Composants
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
// import LexiconPanel from '../../Shared/Lexicon/LexiconPanel';
import GraphComponent from '../Shared/GraphComponents/GraphComponents';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import LastFocus from '../Shared/LastFocus/LastFocus';

import classes from './Focus.scss';


/**
 * Focus
 * Url : /focus/$id <br/>
 * Description : Page qui va charger GraphComponent <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

export default class FocusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      missing: false,
    };
  }

  componentDidMount() {
    const filename = `./Focus-data/${this.props.match.params.id}.json`;
    let params = '';
    try {
      params = require(`${filename}`);
      this.setState({ data: params });
    } catch (error) {
      this.setState({ missing: true });
    }
    // alert(paramsFile.name);
  }

  render() {
    return (
      <div className={`container-fluid ${classes.HomePage}`}>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <HeaderTitle
          language={this.props.language}
          labelkey="focus"
          url1="/"
          url2="/focus"
        />

        {/* <LastFocus language={props.language} /> */}

        {/* } <DiscoverDataEsr language={props.language} /> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {this.state.data ? <div>C bon chef</div> : [(this.state.missing ? <div>Erreur : ce focus est inexistant.</div> : <div>Chargement/Loading...</div>)]}
              {
                // <GraphComponent
                //   id={props.match.params.id}
                //   language={props.language}
                // />
              }
            </div>
          </div>
        </div>

        <LastFocus />

        <Footer language={this.props.language} />
      </div>
    );
  }
}


FocusList.propTypes = {
  match: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
