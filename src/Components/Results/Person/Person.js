import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_PERSONS_END_POINT } from '../../../config/config';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../../Shared/Results/HeaderTitle/HeaderTitle';
import CoAuthors from './Sections/CoAuthors/CoAuthors';
import Informations from './Sections/Informations/Informations';
import Similars from './Sections/Similars/Similars';
import Thesis from './Sections/Thesis/Thesis';
import Productions from '../Shared/Productions/Productions';

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
          label={(this.state.data.fullName) ? this.state.data.fullName : ''}
          handleChangeForScroll={this.handleChange}
          idPage="Person"
        />
        <div id="Informations">
          <Informations
            language={this.props.language}
            data={this.state.data}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Thesis">
          <Thesis
            language={this.props.language}
            person={this.props.match.params.id}
            personName={this.state.data.fullName}
            id={this.props.match.params.id}
          />
        </div>
        <div id="Production">
          <Productions
            language={this.props.language}
            match={this.props.match}
            childs={[]}
            person
          />
        </div>
        <div id="CoAuthors">
          <CoAuthors
            language={this.props.language}
            data={this.state.data.coContributors}
            id={this.props.match.params.id}
          />
        </div>
        <div>
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

export default Person;

Person.propTypes = {
  language: PropTypes.string.isRequired,
  switchLanguage: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
};
