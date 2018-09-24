/* Compoosants externes */
import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';

/* Composants internes */
import Addresses from './Addresses/Addresses';
import Main from './Main/Main';


class Structure extends Component {
  state = {
    activeTab: 'main',
  }

  showTab = (tab) => {
    const newState = { ...this.state };
    newState.activeTab = tab;
    this.setState(newState);
  }

  render() {
    const structure = this.props.structure;
    let content = null;

    switch (this.state.activeTab) {
      case 'main':
        content = (
          <Main
            id={structure.id}
            label={structure.label}
            mail={structure.mail}
            phone={structure.phone}
            status={structure.status}
          />);
        break;
      case 'addresses':
        content = (
          <Addresses
            addresses={structure.addresses}
            structureId={structure.id}
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
              <a onClick={this.props.returnButton}>
                <span className="icon"><i className="fas fa-angle-left" aria-hidden="true" /></span>
                <span>Retour</span>
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
