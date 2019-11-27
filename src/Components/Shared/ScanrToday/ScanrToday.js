import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';
import {
  API_STRUCTURES_SEARCH_END_POINT,
  API_PERSONS_SEARCH_END_POINT,
  API_PROJECTS_SEARCH_END_POINT,
  API_PUBLICATIONS_SEARCH_END_POINT,
} from '../../../config/config';

import LexiconModal from '../Lexicon/LexiconModal/LexiconModal';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import CounterCardByType from '../CounterCards/CounterCardByType';
// import EvolutionCardByType from '../CounterCards/EvolutionCardByType';

import Background from './poudre-bleu_Fgris-B.jpg';

import classes from './ScanrToday.scss';

class ScanrToday extends Component {
  state = {
    data: {
      fullStructures: 0,
      fullPersons: 0,
      fullProjects: 0,
      fullPublications: 0,
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const countData = {
      fullStructures: 0,
      fullPersons: 0,
      fullProjects: 0,
      fullPublications: 0,
    };

    const params = { query: '' };
    const url1 = API_STRUCTURES_SEARCH_END_POINT;
    const url2 = API_PERSONS_SEARCH_END_POINT;
    const url3 = API_PROJECTS_SEARCH_END_POINT;
    const url4 = API_PUBLICATIONS_SEARCH_END_POINT;

    Axios.post(url1, params).then((response) => {
      countData.fullStructures = response.data.total;
      this.setState({ data: countData });
    });
    Axios.post(url2, params).then((response) => {
      countData.fullPersons = response.data.total;
      this.setState({ data: countData });
    });
    Axios.post(url3, params).then((response) => {
      countData.fullProjects = response.data.total;
      this.setState({ data: countData });
    });
    Axios.post(url4, params).then((response) => {
      countData.fullPublications = response.data.total;
      this.setState({ data: countData });
    });
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const sectionStyle = {
      backgroundImage: `url(${Background})`,
      backgroundPosition: 'bottom 0 left 0',
    };

    if (!this.props.isFull) {
      sectionStyle.paddingTop = '230px';
    }

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section style={sectionStyle} className={classes.ScanrToday}>
          <div className="container">
            <div className="row">
              <div className="col-lg">
                <h2 className={classes.Title}>
                  <FormattedHTMLMessage
                    id="ScanrToday.string.title"
                    defaultMessage="ScanrToday.string.title"
                  />
                  &nbsp;
                  <LexiconModal language={this.props.language} target="ScanrToday">
                    <i className="fa fa-info-circle" />
                  </LexiconModal>
                </h2>
              </div>
              <div className={`col-lg ${classes.CardContainer}`}>
                <a href="recherche/structures">
                  <CounterCardByType
                    schema="entities"
                    value={this.state.data.fullStructures.toLocaleString()}
                    language={this.props.language}
                  />
                </a>
              </div>
              <div className={`col-lg ${classes.CardContainer}`}>
                <a href="recherche/persons">
                  <CounterCardByType
                    schema="persons"
                    value={this.state.data.fullPersons.toLocaleString()}
                    language={this.props.language}
                  />
                </a>
              </div>
              <div className={`col-lg ${classes.CardContainer}`}>
                <a href="recherche/projects">
                  <CounterCardByType
                    schema="projects"
                    value={this.state.data.fullProjects.toLocaleString()}
                    language={this.props.language}
                  />
                </a>
              </div>
              <div className={`col-lg ${classes.CardContainer}`}>
                <a href="recherche/publications">
                  <CounterCardByType
                    schema="publications"
                    value={this.state.data.fullPublications.toLocaleString()}
                    language={this.props.language}
                  />
                </a>
              </div>
            </div>
            {/*
            <hr style={{ marginBottom: '8px' }} />
            <div className="row">
              <div className="col-lg">
                <span className={classes.SubTitle}>
                  <FormattedHTMLMessage
                    id="ScanrToday.string.evolution"
                    defaultMessage="ScanrToday.string.evolution"
                  />
                </span>
              </div>
              <div className="col-lg">
                <EvolutionCardByType
                  schema="entities"
                  value="-2"
                  language={this.props.language}
                />
              </div>
              <div className="col-lg">
                <EvolutionCardByType
                  schema="persons"
                  value="+154"
                  language={this.props.language}
                />
              </div>
              <div className="col-lg">
                <EvolutionCardByType
                  schema="projects"
                  value="+45"
                  language={this.props.language}
                />
              </div>
              <div className="col-lg">
                <EvolutionCardByType
                  schema="publications"
                  value="+26"
                  language={this.props.language}
                />
              </div>
            </div>
            <hr style={{ marginTop: '0px' }} />
            { */}
          </div>
          {/* /container */}
        </section>
      </IntlProvider>
    );
  }
}
export default ScanrToday;

ScanrToday.propTypes = {
  language: PropTypes.string.isRequired,
  isFull: PropTypes.bool,
};
