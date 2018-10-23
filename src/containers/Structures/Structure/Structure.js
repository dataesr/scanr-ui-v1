import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from '../../../axios';
import Aux from '../../../hoc/Aux';

import Addresses from './Tabs/Addresses/Addresses';
import StatusTag from '../../../UI/StatusTag/StatusTag';
import TextTitle from '../../../UI/TextTitle/TextTitle';
import Main from './Tabs/Main/Main';
import Resume from './Tabs/Resume/Resume';
import Supervisors from './Tabs/Supervisors/Supervisors';
import Themes from './Tabs/Themes/Themes';
import Relationship from './Tabs/Relationship/Relationship';
import Leaders from './Tabs/Leaders/Leaders';
import Deals from './Tabs/Deals/Deals';

import classes from './Structure.css';

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
    const url = `structures/${esrId}`;
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

  render() {
    const { structure } = this.state;
    let content = null;
    if (!structure) {
      return null;
    }
    const title = this.getMainName(structure.names);

    switch (this.state.activeTab) {
      case 'resume':
        content = (
          <Resume
            esrId={structure.id}
            keywords_en={structure.keywords_en}
            keywords_fr={structure.keywords_fr}
            level={structure.level ? structure.level.value : null}
            nature={structure.nature ? structure.nature.value : null}
            urlLogo={structure.logo ? structure.logo.value : null}
            urlWebsite={structure.website ? structure.website.value : null}
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
    const height = document.documentElement.clientHeight - 250;

    return (
      <Aux>
        <div className="columns is-gapless">
          <div className="column is-four-fifths">
            <TextTitle>{title}</TextTitle>
          </div>
          <div className="column has-text-right has-background-grey-darker">
            <StatusTag status={structure.status} />
          </div>
        </div>
        <div style={{ marginBottom: '12px' }} className="tabs is-marginless">
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
                <span className="tag is-light is-rounded">{structure.addresses.length}</span>
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
        <div className={classes.Container} style={{ height }}>
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
