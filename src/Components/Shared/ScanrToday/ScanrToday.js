import React, { Component } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import CounterCardByType from '../CounterCards/CounterCardByType';
import EvolutionCardByType from '../CounterCards/EvolutionCardByType';

import Background from './poudre-bleu_Fgris-B.jpg';

import classes from './ScanrToday.scss';

const sectionStyle = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: 'bottom 0 left 0',
};

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
    const url = 'https://scanr-preprod.sword-group.com/api/services/counts';
    Axios.get(url).then((response) => {
      this.setState({ data: response.data });
    });
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    return (
      <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
        <section style={sectionStyle} className={classes.ScanrToday}>
          <div className="container">
            <div className="row">
              <div className="col-lg">
                <span className={classes.Title}>
                  <FormattedHTMLMessage
                    id="ScanrToday.string.title"
                    defaultMessage="ScanrToday.string.title"
                  />
                  &nbsp;
                  <i
                    className="fa fa-info-circle"
                    onClick={() => this.props.lexiconHandler('glossary.glossaire4')}
                    onKeyPress={() => this.props.lexiconHandler('glossary.glossaire4')}
                    role="button"
                    tabIndex={0}
                  />
                </span>
              </div>
              <div className="col-lg">
                <CounterCardByType
                  schema="entities"
                  value={this.state.data.fullStructures.toLocaleString()}
                  language={this.props.language}
                />
              </div>
              <div className="col-lg">
                <CounterCardByType
                  schema="persons"
                  value={this.state.data.fullPersons.toLocaleString()}
                  language={this.props.language}
                />
              </div>
              <div className="col-lg">
                <CounterCardByType
                  schema="projects"
                  value={this.state.data.fullProjects.toLocaleString()}
                  language={this.props.language}
                />
              </div>
              <div className="col-lg">
                <CounterCardByType
                  schema="publications"
                  value={this.state.data.fullPublications.toLocaleString()}
                  language={this.props.language}
                />
              </div>
            </div>
            {/* /row */}
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
            {/* /row */}
            <hr style={{ marginTop: '0px' }} />
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
  lexiconHandler: PropTypes.func,
};
