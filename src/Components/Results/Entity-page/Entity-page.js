import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

class Entity extends Component {
  state = {
    data: {},
    id: '',
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ id });

    this.getData(id);
  }

  getData(id) {
    console.log('getData de ', id);
    // Récupéraion des données de l'entité
    const url = `https://scanr.enseignementsup-recherche.gouv.fr/api/structures/${id}`;
    Axios.get(url)
      .then(({ response }) => {
        console.log(response);
        this.setState({ data: response });
      });
  }

  render() {
    if (!this.state.data) {
      return null;
    }

    return (
      <Fragment>
        Page entité
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
