import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ERREUR_PATCH } from '../../../config/config';
import axios from '../../../axios';
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
    const embedded = {
      'panels.code': 1,
      'parents.parent_id': 1,
      'leaders.leader_id': 1,
    };
    const url = `structures/${esrId}?embedded=${JSON.stringify(embedded)}`;
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

  getMain = list => list.find(item => item.status === 'main') || list[0]

  toggleStatus = (status) => {
    const dataObject = {
      status,
    };
    this.axiosCall(dataObject);
  }

  axiosCall = (dataObject) => {
    const url = `structures/${this.state.structure.id}`;
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
      <li key={tab.id} className={this.state.activeTab === tab.id ? 'is-active' : ''}>
        <a onClick={() => this.showTab(tab.id)} role="presentation">
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
    const title = structure.names ? this.getMain(structure.names).name_fr : '';
    const url = structure.websites && this.getMain(structure.websites).url;
    return (
      <Fragment>
        <div className={classes.Bg}>
          <div className="columns is-marginless is-gapless">
            <div className="column is-four-fifths">
              <TextTitle url={url}>{title}</TextTitle>
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
            content.component, { ...structure, getStructure: this.getStructure, url: `structures/${structure.id}` },
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
