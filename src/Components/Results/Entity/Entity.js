import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { ReactTitle } from 'react-meta-tags';

import { API_STRUCTURES_END_POINT } from '../../../config/config';
import getSelectKey from '../../../Utils/getSelectKey';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/Results/HeaderTitle/HeaderTitle';
import Portrait from './Sections/Portrait/Portrait';
import Network from './Sections/Network/Network';
import Team from './Sections/Team/Team';
import Projects from './Sections/Project/Projects';
import Productions from './Sections/Productions/Productions';
import Ecosystem from './Sections/Ecosystem/Ecosystem';
import Awards from './Sections/Awards/Awards';
import SimilarEntities from './Sections/SimilarEntities/SimilarEntities';
import LastEntityFocus from './Sections/LastEntityFocus/LastEntityFocus';

import Banner from '../../Shared/Banner/Banner';

// import DataSample from './dataSample.json';

/**
 * Entity
 * Url : ex: /entite/200711886U
 * Description : Correspond à une entité (structure)
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Entity extends Component {
  state = {
    data: {
      projects: null,
    },
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getData(id);
  }

  getData(id) {
    // Récupéraion des données de l'entité
    const url = `${API_STRUCTURES_END_POINT}/structure/${id}`;
    Axios.get(url)
      .then((response) => {
        this.setState({ data: response.data });
        /* eslint-disable-next-line */
      }).catch(e => console.log('erreur=>', e));
  }

  handleChange = (sectionName) => {
    document.getElementById(sectionName).scrollIntoView(true);
    window.scrollBy({ top: -120, behavior: 'smooth' });
  };

  render() {
    if (!this.state.data) {
      return <Fragment>Chargement ...</Fragment>;
    }
    return (
      <Fragment>
        <ReactTitle title={getSelectKey(this.state.data, 'label', this.props.language, 'fr')} />

        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />

        <HeaderTitle
          language={this.props.language}
          label={getSelectKey(this.state.data, 'label', this.props.language, 'fr')}
          handleChangeForScroll={this.handleChange}
          idPage="Entity"
        />

        <div id="Portrait">
          <Portrait
            language={this.props.language}
            data={this.state.data}
          />
        </div>

        <div id="Network">
          <Network
            language={this.props.language}
            data={this.state.data}
          />
        </div>

        <div id="Team">
          <Team
            language={this.props.language}
            data={this.state.data}
          />
        </div>

        <div id="Projects">
          <Projects
            language={this.props.language}
            match={this.props.match}
          />
        </div>

        <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerDark"
          url=""
        />

        <div id="Productions">
          <Productions
            language={this.props.language}
            match={this.props.match}
          />
        </div>

        <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerDeep"
          url=""
        />

        <div id="Ecosystem">
          <Ecosystem
            language={this.props.language}
            data={this.state.data.graph}
          />
        </div>

        <div id="Awards">
          <Awards
            language={this.props.language}
            data={this.state.data}
          />
        </div>

        <div id="SimilarEntities">
          <SimilarEntities
            language={this.props.language}
            data={this.state.data}
          />
        </div>

        {
          (this.state.lastFocus)
            ? (
              <div id="LastEntityFocus">
                <LastEntityFocus
                  language={this.props.language}
                  data={this.state.data}
                />
              </div>
            ) : null
        }

        <Banner
          language={this.props.language}
          labelKey="Appear"
          cssClass="BannerLight"
          url=""
        />

        <Footer language={this.props.language} />
      </Fragment>
    );
  }
}

export default Entity;

Entity.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
