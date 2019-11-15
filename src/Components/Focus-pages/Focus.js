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
import getSelectKey from '../../Utils/getSelectKey';

import classes from './Focus.scss';

// const authorization = 'YWRtaW46ZGF0YUVTUjIwMTk=';

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
      style: null,
      meta: null,
      missing: false,
      error: false,
    };
  }


  componentDidMount() {
    const filename = `./Focus-data/${this.props.match.params.id}.json`;
    try {
      // eslint-disable-next-line
      params = require(`${filename}`);
      this.setState({ meta: params });
    } catch (error) {
      this.setState({ missing: true });
      return;
    }
    const queryField = params.queryField;
    const filters = {};
    filters[queryField] = {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: params.queryValue,
    };
    axios.post(params.url_api,
      {
        filters,
      })
      .then((res) => {
        if (this.state.meta.type === 'map') {
          const mapStyle = {
            height: '32.5vh',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
            borderBottom: '5px solid #ffd138',
          };
          this.setState({ style: mapStyle });


          const mapdata = [];
          res.data.results.forEach((e) => {
            try {
              const dataElement = {
                id: e.value.id,
                position: [e.value.address[0].gps.lat, e.value.address[0].gps.lon],
                infos: [getSelectKey(e.value, 'label', this.props.language, 'default')],
              };
              mapdata.push(dataElement);
            } catch (error) {
              // eslint-disable-no-empty
            }
          });

          this.setState({ data: mapdata });
        }
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  render() {
    const TextComponent = () => (
      <div style={{
        backgroundColor: 'white', borderRadius: '0 0 15px 15px', marginTop: '-15px', marginBottom: '40px',
      }}
      >
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
    const errorMsg = "Erreur: ce focus n'a pas pu être chargé";
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
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
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
                <div>
                  <GraphComponent
                    title={this.state.meta.title.fr}
                    subtitle={this.state.meta.subtitle.fr}
                    type={this.state.meta.type}
                    tags={this.state.meta.tags}
                    data={this.state.data}
                    style={this.state.style}
                    language={this.props.language}
                  />
                </div>
              )
                : [(this.state.missing ? <div>Erreur : ce focus est inexistant.</div> : [this.state.error ? <div>{errorMsg}</div> : <div>Chargement/Loading...</div>])]}
              {
                // <GraphComponent
                //   id={props.match.params.id}
                //   language={props.language}
                // />
              }
            </div>
          </div>
          {this.state.error ? null : <TextComponent />}
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
