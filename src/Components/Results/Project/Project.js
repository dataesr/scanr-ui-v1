import React, { Component, Fragment } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

import { API_PROJECTS_END_POINT } from '../../../config/config';
import getSelectKey from '../../../Utils/getSelectKey';

import Footer from '../../Shared/Footer/Footer';
import Header from '../../Shared/Header/Header-homePage';
import HeaderTitle from '../Entity-page/HeaderTitle/HeaderTitle';
import Description from './Sections/Description/Description';
import Participants from './Sections/Participants/Participants';
import Productions from './Sections/Productions/Productions';
import Informations from './Sections/Informations/Informations';
import Financial from './Sections/Financial/Financial';
import Programs from './Sections/Programs/Programs';


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
    modifyModePortrait: false,
    modifyModeAuthors: false,
    modifyModeAffiliations: false,
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

  modifyModeHandlePortraitstartDate = () => {
    this.setState(prevState => ({ modifyModePortrait: !prevState.modifyModePortrait }));
  }

  modifyModeHandleAuthors = () => {
    this.setState(prevState => ({ modifyModeAuthors: !prevState.modifyModeAuthors }));
  }

  modifyModeHandleAffiliations = () => {
    this.setState(prevState => ({ modifyModeAffiliations: !prevState.modifyModeAffiliations }));
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
        <Informations
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={this.modifyModeHandleAuthors}
          modifyMode={this.state.modifyModeAuthors}
        />
        <Financial
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={this.modifyModeHandleAuthors}
          modifyMode={this.state.modifyModeAuthors}
        />
        <Programs
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={this.modifyModeHandleAuthors}
          modifyMode={this.state.modifyModeAuthors}
        />
        <Description
          language={this.props.language}
          data={this.state.data.description}
          modifyModeHandle={this.modifyModeHandleAuthors}
          modifyMode={this.state.modifyModeAuthors}
        />
        <Participants
          language={this.props.language}
          data={this.state.data.participants}
          modifyModeHandle={this.modifyModeHandleAuthors}
          modifyMode={this.state.modifyModeAuthors}
        />
        <Productions
          language={this.props.language}
          data={this.state.data.publications}
          modifyModeHandle={this.modifyModeHandleAuthors}
          modifyMode={this.state.modifyModeAuthors}
        />
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
