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
    modifyModeInformations: false,
    modifyModeFinancial: false,
    modifyModePrograms: false,
    modifyModeDescription: false,
    modifyModeParticipants: false,
    modifyModeProductions: false,
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

  modifyModeHandle = (section) => {
    if (section === 'informations') {
      this.setState(prevState => ({ modifyModeInformations: !prevState.modifyModeInformations }));
    }
    if (section === 'financial') {
      this.setState(prevState => ({ modifyModeFinancial: !prevState.modifyModeFinancial }));
    }
    if (section === 'programs') {
      this.setState(prevState => ({ modifyModePrograms: !prevState.modifyModePrograms }));
    }
    if (section === 'description') {
      this.setState(prevState => ({ modifyModeDescription: !prevState.modifyModeDescription }));
    }
    if (section === 'participants') {
      this.setState(prevState => ({ modifyModeParticipants: !prevState.modifyModeParticipants }));
    }
    if (section === 'productions') {
      this.setState(prevState => ({ modifyModeProductions: !prevState.modifyModeProductions }));
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
          label={getSelectKey(this.state.data, 'label', this.props.language, 'default')}
        />
        <Informations
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={() => this.modifyModeHandle('informations')}
          modifyMode={this.state.modifyModeInformations}
        />
        <Financial
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={() => this.modifyModeHandle('financial')}
          modifyMode={this.state.modifyModeFinancial}
        />
        <Programs
          language={this.props.language}
          data={this.state.data}
          modifyModeHandle={() => this.modifyModeHandle('programs')}
          modifyMode={this.state.modifyModePrograms}
        />
        <Description
          language={this.props.language}
          data={this.state.data.description}
          modifyModeHandle={() => this.modifyModeHandle('description')}
          modifyMode={this.state.modifyModeDescription}
        />
        <Participants
          language={this.props.language}
          data={this.state.data.participants}
          modifyModeHandle={() => this.modifyModeHandle('participants')}
          modifyMode={this.state.modifyModeParticipants}
        />
        <Productions
          language={this.props.language}
          data={this.state.data.publications}
          modifyModeHandle={() => this.modifyModeHandle('productions')}
          modifyMode={this.state.modifyModeProductions}
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
