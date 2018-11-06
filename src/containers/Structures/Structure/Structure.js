import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ERREUR_PATCH } from '../../../config/config';
import axios from '../../../axios';
import Aux from '../../../hoc/Aux';
import Addresses from './Tabs/Addresses/Addresses';
import StatusToggle from '../../../UI/StatusToggle/StatusToggle';
import TextTitle from '../../../UI/TextTitle/TextTitle';
import Main from './Tabs/Main/Main';
import Resume from './Tabs/Resume/Resume';
import Supervisors from './Tabs/Supervisors/Supervisors';
import Themes from './Tabs/Themes/Themes';
import Relationship from './Tabs/Relationship/Relationship';
import Leaders from './Tabs/Leaders/Leaders';
import Deals from './Tabs/Deals/Deals';

import classes from './Structure.scss';

class Structure extends Component {
  state = {
    activeTab: 'main',
    structure: null,
  }

  componentDidMount() {
    this.getStructure();
  }

  getStructure = () => {
    const esrId = this.props.match.params.esr_id;
    const url = `structures/${esrId}?embedded=${encodeURIComponent(`{"panels.code": 1}`)}`;
    axios.get(url)
      .then((response) => {
        this.setState({ structure: response.data });
      });
  }

  showTab = (tab) => {
    const newState = { ...this.state };
    newState.activeTab = tab;
    this.setState(newState);
  }

  getMainName = (names) => {
    // Recherche du nom principal
    const mainName = names.find(item => item.status === 'main') || names[0];
    return mainName.name_fr;
  }

  toggleStatus = (status) => {
    const dataObject = {
      status,
    };
    this.axiosCall(dataObject);
  }

  axiosCall = (dataObject) => {
    const url = `structures/${this.state.structure.id}?embedded=${encodeURIComponent(`{"panels.code": 1}`)}`;
    axios.patch(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              errorMessage: null,
            });
            this.getStructure();
          }
        },
      )
      .catch(() => this.setState({ errorMessage: ERREUR_PATCH }));
  };

  render() {
    if (this.props.renderList) {
      this.props.history.push('/structures')
    }
    const { structure } = this.state;
    let content = null;
    if (!structure) {
      return null;
    }
    const title = structure.names ? this.getMainName(structure.names) : '';

    switch (this.state.activeTab) {
      case 'resume':
        content = (
          <Resume
            esrId={structure.id}
            keywords_en={structure.keywords_en}
            keywords_fr={structure.keywords_fr}
            level={structure.level && structure.level.value}
            nature={structure.nature && structure.nature.value}
            urlLogo={structure.logo && structure.logo.value}
            urlWebsite={structure.website && structure.website.value}
          />
        );
        break;
      case 'main':
        content = (
          <Main
            structureId={structure.id}
            getStructure={this.getStructure}
            alias={structure.alias}
            codeNumbers={structure.code_numbers}
            names={structure.names}
            emails={structure.emails}
            phones={structure.phones}
            social_medias={structure.social_medias}
            status={structure.status}
          />);
        break;
      case 'addresses':
        content = (
          <Addresses
            addresses={structure.addresses}
            structureId={structure.id}
            getStructure={this.getStructure}
          />
        );
        break;
      case 'supervisors':
        content = (
          <Supervisors />
        );
        break;
      case 'themes':
        content = (
          <Themes
            structureId={structure.id}
            getStructure={this.getStructure}
            keywordsEn={structure.keywords_en}
            keywordsFr={structure.keywords_fr}
            panels={structure.panels}
          />
        );
        break;
      case 'relationship':
        content = (
          <Relationship />
        );
        break;
      case 'leaders':
        content = (
          <Leaders />
        );
        break;
      case 'deals':
        content = (
          <Deals />
        );
        break;

      default:
        content = this.showMainTab(structure);
    }// /switch

    return (
      <Aux>
        <div className={classes.Bg}>
          <div className="columns is-marginless is-gapless">
            <div className="column is-four-fifths">
              <TextTitle>{title}</TextTitle>
            </div>
            <div className="column has-text-right">
              <StatusToggle status={structure.status} toggleStatus={this.toggleStatus} />
            </div>
          </div>
        </div>
        <div className={`tabs is-marginless ${classes.Tabs}`}>
          <ul>
            <li>
              <Link to="/">
                <span className="icon"><i className="fas fa-angle-left" aria-hidden="true" /></span>
                <span>Retour</span>
              </Link>
            </li>
            <li className={this.state.activeTab === 'resume' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('resume')}>
                Résumé
              </a>
            </li>
            <li className={this.state.activeTab === 'main' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('main')}>
                Général
              </a>
            </li>
            <li className={this.state.activeTab === 'addresses' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('addresses')}>
                Adresses
                &nbsp;
                <span className="tag is-light is-rounded">{structure.addresses ? structure.addresses.length : ''}</span>
              </a>
            </li>
            <li className={this.state.activeTab === 'supervisors' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('supervisors')}>
                Tutelles
              </a>
            </li>
            <li className={this.state.activeTab === 'themes' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('themes')}>
                Thématiques
              </a>
            </li>
            <li className={this.state.activeTab === 'relationship' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('relationship')}>
                Relations
              </a>
            </li>
            <li className={this.state.activeTab === 'leaders' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('leaders')}>
                Dirigeants
              </a>
            </li>
            <li className={this.state.activeTab === 'deals' ? 'is-active' : ''}>
              <a onClick={() => this.showTab('deals')}>
                Offres
              </a>
            </li>

          </ul>
        </div>
        <div className={classes.Height}>
          {content}
        </div>
      </Aux>
    );
  }
}

export default Structure;

Structure.propTypes = {
  match: PropTypes.object.isRequired,
};
