'Person.js'
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { ERREUR_PATCH } from '../../../config/config';
import axios from '../../../axios';
import TextTitle from '../../../UI/TextTitle/TextTitle';
import TabsDescription from './Tabs/TabsDescription';

import classes from './Person.scss';

class Person extends Component {
  state = {
    activeTab: 'main',
    person: null,
  }

  componentDidMount() {
    this.getPerson();
  }

  getPerson = () => {
    const url = `persons/${this.props.match.params.id}`;
    axios.get(url)
      .then((response) => {
        this.setState({ person: response.data });
      });
  }

  showTab = (tab) => {
    const newState = { ...this.state };
    newState.activeTab = tab;
    this.setState(newState);
  }

  axiosCall = (dataObject) => {
    const url = `persons/${this.state.person.id}`;
    axios.patch(url, dataObject)
      .then(
        (response) => {
          if (response.status === 200) {
            this.setState({
              errorMessage: null,
            });
            this.getPerson();
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
    const { person } = this.state;
    if (!person) {
      return null;
    }
    const content = TabsDescription.find(tab => tab.id === this.state.activeTab);
    const title = `${person.last_name} ${person.first_name}`;

    return (
      <Fragment>
        <div className={classes.Bg}>
          <div className="columns is-marginless is-gapless">
            <div className="column">
              <TextTitle>{title}</TextTitle>
            </div>
          </div>
        </div>
        <div className={`tabs is-marginless ${classes.Tabs}`}>
          <ul>
            <li>
              <Link to="/persons">
                <span className="icon"><i className="fas fa-angle-left" aria-hidden="true" /></span>
                <span>Retour</span>
              </Link>
            </li>
            {this.renderTabsTitle()}
          </ul>
        </div>
        <div className={classes.Height}>
          {content && React.cloneElement(
            content.component, { ...person, getPerson: this.getPerson, url: `persons/${person.id}` },
          )}
        </div>
      </Fragment>
    );
  }
}

export default Person;

Person.propTypes = {
  match: PropTypes.object.isRequired,
};
