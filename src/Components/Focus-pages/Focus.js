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
      cData: [],
      error: false,
    };
  }


  componentDidMount() {
    const filename = `./Focus-data/${this.props.match.params.id}.json`;
    try {
      // eslint-disable-next-line
      params = require(`${filename}`);
    } catch (error) {
      return;
    }

    const componentsData = [];
    params.components.forEach((component) => {
      const queryField = component.queryField;
      const filters = {};
      filters[queryField] = {
        type: 'MultiValueSearchFilter',
        op: 'all',
        values: component.queryValue,
      };
      axios.post(component.url_api,
        {
          filters,
        })
        .then((res) => {
          if (component.type === 'map') {
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
            componentsData.push({
              data: mapdata,
              type: component.type,
              title: component.title,
              subtitle: component.subtitle,
              label: component.label,
            });
            this.setState({ cData: componentsData });
          }
        })
        .catch(() => {
          this.setState({ error: true });
        });
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

          {
            this.state.cData.map(component => (
              <div className="row" key={component.label}>
                <div className="col-lg-12">
                  <GraphComponent
                    title={component.title}
                    subtitle={component.subtitle}
                    type={component.type}
                    data={component.data}
                    style={component.style}
                    language={this.props.language}
                  />
                </div>
              </div>
            ))
          }
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
