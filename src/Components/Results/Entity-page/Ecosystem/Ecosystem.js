import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../Shared/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import PackedBubbleChart from '../../../Shared/GraphComponents/Graphs/HighChartsPackedbubble';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../translations/fr.json';
import messagesEntityEn from '../translations/en.json';

import getSelectKey from '../../../../Utils/getSelectKey';

import classes from './Ecosystem.scss';

/**
 * Ecosystem
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Ecosystem extends Component {
  state = {
    // dataGraph: [],
    modifyMode: false,
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const messagesEntity = {
      fr: messagesEntityFr,
      en: messagesEntityEn,
    };

    if (!this.props.data) {
      return (
        <Fragment>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <section className={`container-fluid ${classes.Ecosystem}`}>
              <div className="container">
                <SectionTitle
                  icon="fas fa-th"
                  modifyModeHandle={this.modifyModeHandle}
                  modifyMode={this.state.modifyMode}
                  emptySection
                >
                  {messagesEntity[this.props.language]['Entity.Section.Ecosystem.label']}
                </SectionTitle>
                <div className="row">
                  <div className="col">
                    <EmptySection
                      language={this.props.language}
                      masterKey="Ecosystem"
                      modifyMode={this.state.modifyMode}
                      modifyModeHandle={this.modifyModeHandle}
                    />
                  </div>
                </div>
              </div>
            </section>
          </IntlProvider>
        </Fragment>
      );
    }

    const natures = [];
    this.props.data.forEach(e => (natures.push(e.structure.nature)));
    const distinctNatures = [...new Set(natures)];

    const dataGraph = [];

    distinctNatures.forEach((nature) => {
      // Recherche des structures qui on cette nature
      const structuresListFr = this.props.data.filter(el => (el.structure.nature === nature && el.structure.isFrench));
      const structuresListFo = this.props.data.filter(el => (el.structure.nature === nature && !el.structure.isFrench));

      const dataFr = [];
      structuresListFr.forEach((el) => {
        dataFr.push({ name: getSelectKey(el.structure, 'label', this.props.language, 'fr'), value: el.weight });
      });
      const dataFo = [];
      structuresListFo.forEach((el) => {
        dataFo.push({ name: getSelectKey(el.structure, 'label', this.props.language, 'fr'), value: el.weight });
      });

      const objFr = {
        name: `${dataFr.length} françaises`,
        data: dataFr,
      };
      const objFo = {
        name: `${dataFo.length} internationales`,
        data: dataFo,
      };

      dataGraph[nature] = [objFr, objFo];
    });

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Ecosystem}`}>
            <div className="container">
              <SectionTitle
                icon="fas fa-th"
                modifyModeHandle={this.modifyModeHandle}
                modifyMode={this.state.modifyMode}
              >
                {messagesEntity[this.props.language]['Entity.Section.Ecosystem.label']}
              </SectionTitle>
              <div>
                {
                  /* dataGraph.ETI[0].name */
                }
                <div className="row">
                  <div className="col-md">
                    <PackedBubbleChart series={dataGraph.Education} text="Education" />
                  </div>
                  <div className="col-md">
                    <PackedBubbleChart series={dataGraph.ETI} text="ETI" />
                  </div>
                  <div className="col-md">
                    <PackedBubbleChart series={dataGraph.GE} text="GE" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default Ecosystem;

Ecosystem.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
