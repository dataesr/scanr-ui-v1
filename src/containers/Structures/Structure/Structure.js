import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from '../../../axios';
import Aux from '../../../hoc/Aux';

import Addresses from './Addresses/Addresses';
import StatusTag from '../../../UI/StatusTag/StatusTag';
import TextTitle from '../../../UI/TextTitle/TextTitle';
import Main from './Main/Main';

class Structure extends Component {
  state = {
    activeTab: 'main',
    structure: null,
  }

  componentDidMount() {
    this.getStructures();
  }

  getStructures = () => {
    const esrId = this.props.match.params.esr_id;
    const url = `structures/${esrId}`;
    axios.get(url)
      .then(response => this.setState({ structure: response.data.data }));
  }

  showTab = (tab) => {
    const newState = { ...this.state };
    newState.activeTab = tab;
    this.setState(newState);
  }

  getMainName = (names) => {
    // Recherche du nom principal
    const mainName = names.find(item => item.status === 'main') || names[0];
    return mainName.label;
  }

  render() {
    const { structure } = this.state;
    let content = null;
    if (!structure) {
      return null;
    }

    const title = this.getMainName(structure.names);

    switch (this.state.activeTab) {
      case 'main':
        content = (
          <Main
            structureId={structure.esr_id}
            getStructures={this.getStructures}
            mail={structure.mail.value}
            names={structure.names}
            phone={structure.phone.value}
            status={structure.status}
          />);
        break;
      case 'addresses':
        content = (
          <Addresses
            addresses={structure.addresses}
            structureId={structure.esr_id}
            getStructures={this.getStructures}
          />
        );
        break;

      default:
        content = this.showMainTab(structure);
    }// /switch

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
        <div className="tabs">
          <ul>
            <li>
              <Link to="/">
                <span className="icon"><i className="fas fa-angle-left" aria-hidden="true" /></span>
                <span>Retour</span>
              </Link>
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

          </ul>
        </div>
        <div className="container is-fluid">
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
