import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_PERSONS_END_POINT } from '../../../config/config';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../Entity-page/HeaderTitle/HeaderTitle';
import Description from './Sections/Description/Description';
import Informations from './Sections/Informations/Informations';


/**
 * Publication
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Person extends Component {
  state = {
    modifyModeInformations: false,
    modifyModeDescription: false,
    data: {},
  };

  componentDidMount() {
    this.getData(this.props.match.params.id);
  }

  getData(id) {
    // Récupéraion des données de l'entité
    const url = `${API_PERSONS_END_POINT}/${id}`;
    // https://scanr-preprod.sword-group.com/api/v2/publications/doi10.10072%2525F978-3-319-24195-1_10
    Axios.get(url)
      .then((response) => {
        this.setState({ data: response.data });
        /* eslint-disable-next-line */
      }).catch(e => console.log('erreur=>', e));
  }

  modifyModeHandle = (section) => {
    if (section === 'informations') {
      this.setState(prevState => ({ modifyModeInformations: !prevState.modifyModeInformations }));
    }
    if (section === 'description') {
      this.setState(prevState => ({ modifyModeDescription: !prevState.modifyModeDescription }));
    }
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
          label={this.state.data.fullName}
        />
        <Informations
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={() => this.modifyModeHandle('informations')}
          modifyMode={this.state.modifyModeInformations}
        />
        <Description
          language={this.props.language}
          data={this.state.data.description}
          modifyModeHandle={() => this.modifyModeHandle('description')}
          modifyMode={this.state.modifyModeDescription}
        />
        <Footer language={this.props.language} />
      </Fragment>
    );
  }
}

export default Person;

Person.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
