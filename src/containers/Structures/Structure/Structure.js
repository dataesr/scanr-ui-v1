import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ERREUR_PATCH } from '../../../config/config';
import axios from '../../../axios';
import Addresses from './Tabs/Addresses/Addresses';
import StatusToggle from '../../../UI/StatusToggle/StatusToggle';
import TextTitle from '../../../UI/TextTitle/TextTitle';
import TabsDescription from './Tabs/TabsDescription';

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

  renderTabsTitle() {
    return TabsDescription.map(tab => (
      <li className={this.state.activeTab === tab.id ? 'is-active' : ''}>
        <a onClick={() => this.showTab(tab.id)}>
          {tab.label}
        </a>
      </li>
    ));
  }

  render() {
    const { structure } = this.state;
    if (!structure) {
      return null;
    }
    const content = TabsDescription.find(tab => tab.id === this.state.activeTab);
    const title = structure.names ? this.getMainName(structure.names) : '';

    return (
      <Fragment>
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
            {this.renderTabsTitle()}
          </ul>
        </div>
        <div className={classes.Height}>
          {content && React.cloneElement(
            content.component, { ...structure, getStructure: this.getStructure },
          )}
        </div>
      </Fragment>
    );
  }
}

export default Structure;

Structure.propTypes = {
  match: PropTypes.object.isRequired,
};
