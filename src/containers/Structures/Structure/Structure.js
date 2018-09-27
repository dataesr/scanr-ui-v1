/* Compoosants externes */
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
/* Composants internes */
import axios from '../../../axios';
import Aux from '../../../hoc/Aux';
import Addresses from './Addresses/Addresses';
import Names from './Names/Names';


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

  render() {
    const { structure } = this.state;
    let content = null;
    if (!this.state.structure) {
      return null;
    }
    switch (this.state.activeTab) {
      case 'main':
        content = (
          <Names
            id={structure.esr_id}
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
          />
        );
        break;

      default:
        content = this.showMainTab(structure);
    }// /switch

    return (
      <Aux>
        <div className="tabs">
          <ul>
            <li>
              <NavLink to="/">
                <span className="icon"><i className="fas fa-angle-left" aria-hidden="true" /></span>
                <span>Retour</span>
              </NavLink>
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
