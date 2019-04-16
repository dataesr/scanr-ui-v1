import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_STRUCTURES_END_POINT } from '../../../config/config';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from './HeaderTitle/HeaderTitle';
import Portrait from './Portrait/Portrait';

import DataSample from './dataSample.json';

/**
 * Portrait
 * Url : ex: /entite/200711886U
 * Description : Correspond à une entité (structure)
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Entity extends Component {
  state = {
    data: DataSample,
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
      });
  }

  render() {
    if (!this.state.data) {
      return <Fragment>No data</Fragment>;
    }

    return (
      <Fragment>
        <Header
          language={this.props.language}
          switchLanguage={this.props.switchLanguage}
        />
        <HeaderTitle
          language={this.props.language}
        />
        <Portrait
          language={this.props.language}
          data={this.state.data}
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
