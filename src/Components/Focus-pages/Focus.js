import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// Composants
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Header/Header-homePage';
// import LexiconPanel from '../../Shared/Lexicon/LexiconPanel';
import GraphComponent from '../Shared/GraphComponents/GraphComponents';
import HeaderTitle from '../Shared/HeaderTitle/HeaderTitle';
import LastFocus from '../Shared/LastFocus/LastFocus';

import classes from './Focus.scss';

const authorization = 'YWRtaW46ZGF0YUVTUjIwMTk=';

/**
 * Focus
 * Url : /focus/$id <br/>
 * Description : Page qui va charger GraphComponent <br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/

let params = '';

export default class FocusList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      meta: null,
      missing: false,
      error: false,
    };
  }


  componentDidMount() {
    const filename = `./Focus-data/${this.props.match.params.id}.json`;
    try {
      params = require(`${filename}`);
      this.setState({ meta: params });
    } catch (error) {
      this.setState({ missing: true });
      return;
    }
    axios.post(params.url, {
      query: 'beta',
    })
      .then((res) => {
        this.setState({ data: res.data.facets });
        // if (params.type !== 'map') {
        //   this.setState({ data: params.data });
        // }
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
        console.log("Couldn't retrieve API data");
      });
    // axios.get(params.url, {
    //   headers: {
    //     Authorization: `Basic ${authorization}`,
    //   },
    // })
    //   .then((res) => {
    //     this.setState({ data: res.data });
    //     if (params.type !== 'map') {
    //       this.setState({ data: params.data });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //     console.log(error);
    //     console.log("Couldn't retrieve API data");
    //   });
  }

  render() {
    const TextComponent = () => (
      <div>
        <p className={`${classes.Text}`}>
          {params.text}
        </p>
        <div className="container">
          <div className="row">
            <p className={`col-8 ${classes.Subtext}`}>
              {params.subtext}
            </p>
          </div>
        </div>
      </div>
    );
    return (
      <div className={`container-fluid ${classes.HomePage}`} style={{ backgroundColor: '#EBEEF0' }}>
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
        <div className="container" style={{ backgroundColor: 'white', marginBottom: '50px' }}>
          <div className="row">
            <div className="col-lg-12" style={{ backgroundColor: 'white' }}>
              {
            // const TextComponent = () => (
            //   <div>
            //     <p className={`${classes.Text}`}>
            //       {paramsFile.elems[id].text}
            //     </p>
            //     <p>
            //       {paramsFile.elems[id].subtext}
            //     </p>
            //   </div>
            // );
          }
              {this.state.data ? (
                <div style={{ backgroundColor: 'white' }}>
                  <GraphComponent
                    title={this.state.meta.title}
                    subtitle={this.state.meta.subtitle}
                    type={this.state.meta.type}
                    tags={this.state.meta.tags}
                    data={this.state.data}
                    language={this.props.language}
                  />
                </div>
              )
                : [(this.state.missing ? <div>Erreur : ce focus est inexistant.</div> : [this.state.error ? <div>{"Erreur: ce focus n'a pas pu être chargé"}</div> : <div>Chargement/Loading...</div>])]}
              {
                // <GraphComponent
                //   id={props.match.params.id}
                //   language={props.language}
                // />
              }
            </div>
            {this.state.error ? null : <TextComponent />}
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
