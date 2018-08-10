/*Compoosants externes*/
import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';

/*Composants internes*/
import Labels from './Labels/Labels';
import SimpleField from './SimpleField/SimpleField';
import Addresses from './Addresses/Addresses';
import Supervisors from './Supervisors/Supervisors';
import Parents from './Parents/Parents';
import Predecessors from './Predecessors/Predecessors';

/*CSS*/
//import main_classes from '../../../App.css';
import classes from './Structure.css';

class Structure extends Component {

  state = {
    activeTab : 'main'
  }

  showTab = (tab) => {
    let newState = {...this.state};
    newState.activeTab = tab;
    this.setState(newState);
  }

  showMainTab (structure){
    return(
      <ul className={classes.list_fields}>
        <li>
          <Labels labels={structure.label}
                  structureId={structure.id} />
        </li>

        <li>
          <SimpleField fieldName="Id"
                       fieldValue={structure.id}
                       name="id"
                       readOnly={true}
                       structureId={structure.id} />
        </li>

        <li>
          <SimpleField fieldName="Statut"
                       fieldValue={structure.status}
                       name="status"
                       readOnly={true}
                       structureId={structure.id} />
        </li>

        <li>
          <SimpleField fieldName="Téléphone"
                       fieldValue={structure.phone}
                       name="phone"
                       readOnly={false}
                       structureId={structure.id} />
        </li>

        <li>
          <SimpleField fieldName="Email"
                       fieldValue={structure.mail}
                       name="mail"
                       readOnly={false}
                       structureId={structure.id} />
        </li>
      </ul>
    );
  }

  showAddressesTab (structure){
    return (
      <Addresses addresses={structure.addresses}
                 structureId={structure.id} />
    );
  }

  showSupervisorsTab (structure){
    return (
      <Supervisors supervisors={structure.supervisors}
                   structureId={structure.id} />
    );
  }

  showParentsTab (structure){
    return (
      <Parents parents={structure.parents}
                   structureId={structure.id} />
    );
  }

  showPredecessorsTab (structure){
    return (
      <Predecessors predecessors={structure.predecessors}
                    structureId={structure.id} />
    );
  }

  render (){
console.log("Structure: ",this.props.structure);
    const structure = this.props.structure;
    let content = null;

    switch (this.state.activeTab) {
      case 'main':
        content = this.showMainTab(structure);
        break;
      case 'addresses':
        content = this.showAddressesTab(structure);
        break;
      case 'supervisors':
        content = this.showSupervisorsTab(structure);
        break;
      case 'parents':
        content = this.showParentsTab(structure);
        break;
      case 'predecessors':
        content = this.showPredecessorsTab(structure);
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
              <span className="icon"><i className="fas fa-angle-left" aria-hidden="true"></i></span>
              <span>Retour</span>
              </a>
            </li>
            <li className={this.state.activeTab==='main'?'is-active':''}>
              <a onClick={() => this.showTab('main')}>
                Général
              </a>
            </li>
            <li className={this.state.activeTab==='addresses'?'is-active':''}>
              <a onClick={() => this.showTab('addresses')}>
                Adresses
                &nbsp;
                <span className="tag is-light is-rounded">{structure.addresses.length}</span>
              </a>
            </li>
            <li className={this.state.activeTab==='supervisors'?'is-active':''}>
              <a onClick={() => this.showTab('supervisors')}>
                Tutelles
                &nbsp;
                <span className="tag is-light is-rounded">{structure.supervisors.length}</span>
              </a>
            </li>
            <li className={this.state.activeTab==='parents'?'is-active':''}>
              <a onClick={() => this.showTab('parents')}>
                Parents
                &nbsp;
                <span className="tag is-light is-rounded">{structure.parents.length}</span>
              </a>
            </li>
            <li className={this.state.activeTab==='predecessors'?'is-active':''}>
              <a onClick={() => this.showTab('predecessors')}>
                Prédécesseurs
                &nbsp;
                <span className="tag is-light is-rounded">{structure.predecessors.length}</span>
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
