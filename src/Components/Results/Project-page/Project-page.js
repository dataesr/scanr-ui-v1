import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_PROJECTS_END_POINT } from '../../../config/config';

import HeaderTitle from '../Entity-page/HeaderTitle/HeaderTitle';
import getSelectKey from '../../../Utils/getSelectKey';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import Project from './Project/Project';
/**
 * Project
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class ProjectPage extends Component {
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
        />
        <Project
          language={this.props.language}
          data={this.state.data}
        />
        <Footer language={this.props.language} />
      </Fragment>
    );
  }
}

export default ProjectPage;

ProjectPage.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  switchLanguage: PropTypes.func.isRequired,
};
