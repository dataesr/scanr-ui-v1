import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../Shared/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import PackedBubbleChart from '../../../Shared/GraphComponents/Graphs/HighChartsPackedbubble';
import Select from '../../../Shared/Ui/Select/Select';

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
    viewMode: 'list',
    modifyMode: false,
    viewListFilters: {
      nature: 'all',
      frInt: 'all',
      type: 'all',
    },
    selectedStructure: {},
  }

  getDataGraph = () => {
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
        color: '#119fd4',
      };
      const objFo = {
        name: `${dataFo.length} internationales`,
        data: dataFo,
        color: '#4fc4c0',
      };

      dataGraph[nature] = [objFr, objFo];
    });
    return dataGraph;
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  renderViewList = (messages) => {
    const natures = [];
    this.props.data.forEach((e) => {
      if (e.structure.nature) {
        natures.push(e.structure.nature);
      }
    });
    const dataByNature = [...new Set(natures)];

    dataByNature.forEach((nature) => {
      dataByNature[nature] = [];
    });

    this.props.data.forEach((e) => {
      if (e.structure.nature) {
        dataByNature[e.structure.nature].push(e);
      }
    });

    console.log(dataByNature);
    const filteredData = dataByNature;

    let nature = null;
    const content = filteredData.map((item, i) => (
      <Fragment key={item}>
        <div>
          {filteredData[i]}
          {item.length}
        </div>

      </Fragment>
    ));

    return (
      <Fragment>
        <div className="row">
          <div className="col-md">
            <Select
              allLabel="all label"
              count="8"
              title="Type recherché"
              placeHolder="Tous les types"
              data={[]}
              onSubmit=""
            />
          </div>
          <div className="col-md">
            <Select
              allLabel="all label"
              count="8"
              title="France/Internationnal"
              placeHolder="Toutes collaborations"
              data={[]}
              onSubmit=""
            />
          </div>
          <div className="col-md">
            <Select
              allLabel="all label"
              count="8"
              title="Nature recherchée"
              placeHolder="Toutes les natures"
              data={[]}
              onSubmit=""
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            {content}
          </div>
          <div className="col-md">
            detail
          </div>
        </div>
      </Fragment>
    );
  }


  renderViewGraph = data => (
    <div className="row">
      <div className="col-md">
        <PackedBubbleChart text="GE" series={data.GE} />
      </div>
      <div className="col-md">
        <PackedBubbleChart text="Facility" series={data.Facility} />
      </div>
    </div>
  );

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

    const dataGraph = this.getDataGraph();
    console.log('dataGraph', dataGraph);

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Ecosystem}`}>
            <div className="container">
              <div className={`row ${classes.SectionTitle}`}>
                <div className="col">
                  <i className="fas fa-th" />
                  <span className={classes.Label}>
                    {messagesEntity[this.props.language]['Entity.Section.Ecosystem.label']}
                  </span>
                </div>
                <div className="col text-right">
                  <div className="btn-group text-left" role="group">
                    {
                      (this.state.viewMode === 'list')
                        ? (
                          <Fragment>
                            <button type="button" onClick={() => this.viewModeClickHandler('list')} className={`btn  btn-sm ${classes.btn_scanrBlue}`}>
                              <i className="fas fa-list" />
                              &nbsp;
                              Liste des résultats
                            </button>
                            <button type="button" onClick={() => this.viewModeClickHandler('graph')} className={`btn  btn-sm ${classes.btn_scanrlightgrey}`}>
                              <i className="fas fa-chart-pie" />
                              &nbsp;
                              Visualisation des résultats
                            </button>
                          </Fragment>
                        )
                        : (
                          <Fragment>
                            <button type="button" onClick={() => this.viewModeClickHandler('list')} className={`btn  btn-sm ${classes.btn_scanrlightgrey}`}>
                              <i className="fas fa-list" />
                              &nbsp;
                              Liste des résultats
                            </button>
                            <button type="button" onClick={() => this.viewModeClickHandler('graph')} className={`btn  btn-sm ${classes.btn_scanrBlue}`}>
                              <i className="fas fa-chart-pie" />
                              &nbsp;
                              Visualisation des résultats
                            </button>
                          </Fragment>
                        )
                    }
                  </div>
                </div>
              </div>
              {/* /row */}
              <hr />
              {
                (this.state.viewMode === 'list')
                  ? this.renderViewList(messages)
                  : this.renderViewGraph(dataGraph)
              }
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
