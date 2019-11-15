import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_PROJECTS_END_POINT } from '../../../config/config';
import getSelectKey from '../../../Utils/getSelectKey';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/Results/HeaderTitle/HeaderTitle';
import Description from './Sections/Description/Description';
import Participants from './Sections/Participants/Participants';
import Productions from './Sections/Productions/Productions';
import Informations from './Sections/Informations/Informations';
import Financial from './Sections/Financial/Financial';
import Programs from './Sections/Programs/Programs';
import Similars from './Sections/Similars/Similars';


/**
 * Publication
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Project extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    // Récupéraion des données de l'entité
    const url = `${API_PROJECTS_END_POINT}/${id}`;
    // https://scanr-preprod.sword-group.com/api/v2/publications/doi10.10072%2525F978-3-319-24195-1_10
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
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <HeaderTitle
          language={this.props.language}
          label={getSelectKey(this.state.data, 'label', this.props.language, 'default')}
          handleChangeForScroll={this.handleChange}
          idPage="Project"
        />
        <div id="Informations">
          <Informations
            language={this.props.language}
            data={this.state.data}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Financial">
          <Financial
            language={this.props.language}
            data={this.state.data}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Programs">
          <Programs
            language={this.props.language}
            data={this.state.data}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Description">
          <Description
            language={this.props.language}
            data={this.state.data.description}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Participants">
          <Participants
            language={this.props.language}
            data={this.state.data.participants}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Productions">
          <Productions
            language={this.props.language}
            data={this.state.data.publications}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Similars">
          <Similars
            language={this.props.language}
            data={this.state.data}
          />
        </div>
        <Footer language={this.props.language} />
      </Fragment>
    );
  }
}

export default Project;

Project.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
