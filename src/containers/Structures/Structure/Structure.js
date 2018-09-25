/* Compoosants externes */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* Composants internes */
import Aux from '../../../hoc/Aux';
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
    const { structure } = this.props;
    let content = null;

    switch (this.state.activeTab) {
      case 'main':
        console.log('structure:', structure);
        content = (
          <Main
            id={structure.esr_id}
            names={structure.names}
            mail={structure.mail.value}
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

Structure.propTypes = {
  structure: PropTypes.object,
};
