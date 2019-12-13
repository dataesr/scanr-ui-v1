import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import { GRAPH_ITEMS_LIST, ECOSYSTEM_LIMIT } from '../../../../../config/config';

import ButtonToPage from '../../../../Shared/Ui/Buttons/ButtonToPage';
import EmptySection from '../../../Shared/EmptySection/EmptySection';
import PackedBubbleChart from '../../../../Shared/GraphComponents/Graphs/HighChartsPackedbubble';
import SectionTitleViewMode from '../../../Shared/SectionTitle';
import CounterDataSimple from '../../../../Shared/CounterDataSimple/CounterDataSimple';
import FranceFlag from '../../../../Shared/images/france-flag-icon-32.png';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import getSelectKey from '../../../../../Utils/getSelectKey';

import classes from './Ecosystem.scss';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

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
    data: this.props.data,
    viewMode: 'graph', // list
    kindFilter: [],
    frIntFilter: [],
    selectedCollaboration: {},
  }

  componentDidMount() {
    this.setState({ data: this.props.data });
    this.createKindFilter();
    this.createFrIntFilter();
  }

  getDataGraph = () => {
    const dataGraph = ['fr', 'fo'];
    dataGraph.fr = [];
    dataGraph.fo = [];

    GRAPH_ITEMS_LIST.forEach((graphType) => {
      const dataSorted = this.props.data.sort((a, b) => {
        const prodA = ((a.details.Project) ? a.details.Project : 0) + ((a.details.publication) ? a.details.publication : 0);
        const prodB = ((b.details.Project) ? b.details.Project : 0) + ((b.details.publication) ? b.details.publication : 0);
        return prodB - prodA;
      });

      const structuresListFr = dataSorted.filter(el => (el.structure.kind && el.structure.kind.find(item => item === graphType) && el.structure.isFrench));
      const structuresListFo = dataSorted.filter(el => (el.structure.kind && el.structure.kind.find(item => item === graphType) && !el.structure.isFrench));


      const limitFr = (structuresListFr.length < ECOSYSTEM_LIMIT) ? structuresListFr.length - 1 : ECOSYSTEM_LIMIT - 1;
      const limitedDataFr = [];
      for (let i = 0; i <= limitFr; i += 1) {
        limitedDataFr.push(structuresListFr[i]);
      }
      const limitFo = (structuresListFo.length < ECOSYSTEM_LIMIT) ? structuresListFo.length - 1 : ECOSYSTEM_LIMIT - 1;
      const limitedDataFo = [];
      for (let i = 0; i <= limitFo; i += 1) {
        limitedDataFo.push(structuresListFo[i]);
      }

      const dataFr = [];
      const dataFo = [];
      limitedDataFr.forEach((el) => {
        dataFr.push({ name: getSelectKey(el.structure, 'label', this.props.language, 'fr'), value: el.weight });
      });
      limitedDataFo.forEach((el) => {
        dataFo.push({ name: getSelectKey(el.structure, 'label', this.props.language, 'fr'), value: el.weight });
      });

      let color = '';
      switch (graphType) {
        case 'Structure de recherche':
          color = classes.researchstructuresColor;
          break;
        case 'Secteur Privé':
          color = classes.entreprisesColor;
          break;
        case 'Secteur public':
          color = classes.publicsectorColor;
          break;
        default:
          color = '';
      }

      const objFr = {
        name: graphType,
        data: dataFr,
        color,
      };
      const objFo = {
        name: graphType,
        data: dataFo,
        color,
      };

      if (dataFr.length > 0) {
        dataGraph.fr.push(objFr);
      }
      if (dataFo.length > 0) {
        dataGraph.fo.push(objFo);
      }
    });
    return dataGraph;
  }


  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  setSelectedCollaborationHandler = (selectedCollaboration) => {
    this.setState({ selectedCollaboration });
  }

  setFrIntFilter = (e) => {
    // Reset filtre types
    document.getElementById('typeSelect').value = 'all';

    if (e.target.value !== 'all') {
      /* eslint-disable-next-line */
      const data = this.props.data.filter(item => item.structure.isFrench === (e.target.value === 'fr'));
      this.setState({ data, selectedCollaboration: {} });
    } else {
      this.setState({ data: this.props.data, selectedCollaboration: {} });
    }
  }

  setKindFilter = (e) => {
    // Reset filtre frInt
    document.getElementById('frIntSelect').value = 'all';

    if (e.target.value !== 'all') {
      /* eslint-disable */
      const data = this.props.data.filter((item) => {
        if (item.structure && item.structure.kind && item.structure.kind.length > 1) {
          return (item.structure.kind.find(el => el === e.target.value));
        } else if (item.structure.kind) {
          return (item.structure.kind[0] === e.target.value);
        }
        return false;
      });
      this.setState({ data, selectedCollaboration: {} });
    } else {
      this.setState({ data: this.props.data, kindFilterValue: null, selectedCollaboration: {} });
    }
    /* eslint-enable */
  }

  createKindFilter = () => {
    const kindFilter = [];
    if (this.props.data) {
      GRAPH_ITEMS_LIST.forEach((graphType) => {
        const listObjects = this.props.data.filter(item => item.structure.kind && item.structure.kind.find(el => el === graphType));
        const obj = {
          value: graphType,
          count: listObjects.length,
        };
        kindFilter.push(obj);
      });
    }

    this.setState({ kindFilter });
  }

  createFrIntFilter = () => {
    let nbFr = 0;
    let nbEn = 0;
    if (this.props.data) {
      this.props.data.forEach((item) => {
        if (item.structure.isFrench) {
          nbFr += 1;
        } else {
          nbEn += 1;
        }
      });
    }
    const objFr = {
      value: 'fr',
      count: nbFr,
    };
    const objEn = {
      value: 'en',
      count: nbEn,
    };
    const listToAdd = [objFr, objEn];
    this.setState({ frIntFilter: listToAdd });
  }

  renderViewList = () => {
    if (!this.state.data || this.state.data.length === 0) {
      return (<div>Pas de données</div>);
    }
    // Tri des données filtrées avant affichage
    const dataSorted = this.state.data.sort((a, b) => {
      const prodA = ((a.details.Project) ? a.details.Project : 0) + ((a.details.publication) ? a.details.publication : 0);
      const prodB = ((b.details.Project) ? b.details.Project : 0) + ((b.details.publication) ? b.details.publication : 0);
      return prodB - prodA;
    });

    const content = dataSorted.map((data, index) => {
      const jointProductions = (data.details.publication || 0) + (data.details.Project || 0);
      let selected = '';
      if (data === this.state.selectedCollaboration) {
        selected = classes.Selected;
      }

      // Selection du premier élément par défaut
      if (!this.state.selectedCollaboration.structure && index === 0) {
        this.setSelectedCollaborationHandler(data);
      }

      return (
        <Fragment key={data.structure.id}>
          <div
            className={`${classes.Item} ${selected}`}
            onClick={() => this.setSelectedCollaborationHandler(data)}
            onKeyPress={() => this.setSelectedCollaborationHandler(data)}
            role="button"
            tabIndex={0}
          >
            <div className={classes.StructureTitle}>
              {getSelectKey(data.structure, 'label', this.props.language, 'fr')}
            </div>
            <div className={classes.SharedProd}>
              {`${jointProductions} ${messages[this.props.language]['Entity.ecosystem.jointProductions']}`}
            </div>
          </div>
        </Fragment>
      );
    });

    let acronym = null;
    if (this.state.selectedCollaboration.structure) {
      acronym = getSelectKey(this.state.selectedCollaboration.structure, 'acronym', this.props.language, 'default');
    }

    const dataSimple = [];
    if (this.state.selectedCollaboration) {
      if (this.state.selectedCollaboration.details && this.state.selectedCollaboration.details.publication) {
        dataSimple.push(<div className="col"><CounterDataSimple title="Publications" value={this.state.selectedCollaboration.details.publication} /></div>);
      }
      if (this.state.selectedCollaboration.details && this.state.selectedCollaboration.details.Project) {
        dataSimple.push(<div className="col"><CounterDataSimple title={(this.props.language === 'fr') ? 'Projets' : 'Projects'} value={this.state.selectedCollaboration.details.Project} /></div>);
      }
    }

    return (
      <Fragment>
        <div className={`row ${classes.FiltersRow}`}>
          <div className="col-md">
            <h3 className={classes.SelectTitle}>{messages[this.props.language]['Entity.ecosystem.selectTypesFilter.title']}</h3>
            <select id="typeSelect" className={`form-control ${classes.Select}`} onChange={this.setKindFilter}>
              <option value="all">{messages[this.props.language]['Entity.ecosystem.selectTypesFilter.allLabel']}</option>
              {
                this.state.kindFilter.map(item => (
                  <option key={item.value} value={item.value}>
                    {`${item.value} (${item.count})`}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="col-md">
            <h3 className={classes.SelectTitle}>{messages[this.props.language]['Entity.ecosystem.selectFrIntFilter.title']}</h3>
            <select id="frIntSelect" className={`form-control ${classes.Select}`} onChange={this.setFrIntFilter}>
              <option value="all">{messages[this.props.language]['Entity.ecosystem.selectFrIntFilter.allLabel']}</option>
              {
                this.state.frIntFilter.map(item => (
                  <option key={item.value} value={item.value}>
                    {`${item.value} (${item.count})`}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="row">
          <div className={`col-md-5 ${classes.List}`}>
            {content}
          </div>
          <div className="col-md">
            {
              (this.state.selectedCollaboration.structure)
                ? (
                  <div className={`d-flex flex-column h-100 ${classes.Details}`}>
                    <div className={classes.detailTitle}>
                      {getSelectKey(this.state.selectedCollaboration.structure, 'label', this.props.language, 'fr')}
                      {(acronym) ? (` (${acronym})`) : null}
                    </div>
                    {
                      (this.state.selectedCollaboration.structure && this.state.selectedCollaboration.structure.address && this.state.selectedCollaboration.structure.address[0])
                        ? (
                          <p>
                            {`${this.state.selectedCollaboration.structure.address[0].address || ''} - ${this.state.selectedCollaboration.structure.address[0].citycode} - ${this.state.selectedCollaboration.structure.address[0].city}`}
                          </p>
                        ) : null
                    }
                    <hr className={classes.Hr} />
                    <h4>
                      {messages[this.props.language]['Entity.ecosystem.jointProductions']}
                    </h4>
                    <div className={classes.Description}>
                      <div className={classes.Content}>
                        <div className="row">
                          {
                            dataSimple.map(el => (el))
                          }
                        </div>
                      </div>
                    </div>
                    <hr className={`mt-auto ${classes.Hr}`} />
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div>
                        {
                          (this.state.selectedCollaboration.structure.isFrench === false) ? '' : <img src={FranceFlag} alt="France" />
                        }
                        &nbsp;
                        {
                          this.state.selectedCollaboration.structure.nature || null
                        }
                      </div>
                      <ButtonToPage
                        className={`ml-auto ${classes.btn_dark}`}
                        url={`/entite/${this.state.selectedCollaboration.structure.id}`}
                      >
                        {messages[this.props.language]['Entity.ecosystem.button']}
                      </ButtonToPage>
                    </div>
                  </div>
                )
                : (
                  <div className={classes.Empty}>
                    {messages[this.props.language]['Entity.projects.empty.label']}
                  </div>
                )
            }
          </div>
        </div>
      </Fragment>
    );
  }


  renderViewGraph = (data, subtitle) => (
    <div className="row">
      {
        (data.fr.length > 0) ? (
          <div className="col-md">
            <PackedBubbleChart
              text={messages[this.props.language]['Entity.ecosystem.frenchEntities']}
              data={data.fr}
              subtitle={subtitle}
              tooltipText={messages[this.props.language]['Entity.ecosystem.jointProductions']}
            />
          </div>
        ) : null
      }
      {
        (data.fo.length > 0) ? (
          <div className="col-md">
            <PackedBubbleChart
              text={messages[this.props.language]['Entity.ecosystem.foreignEntities']}
              data={data.fo}
              subtitle={subtitle}
              tooltipText={messages[this.props.language]['Entity.ecosystem.jointProductions']}
            />
          </div>
        ) : null
      }
    </div>
  );

  render() {
    if (!this.props.data) {
      return (
        <Fragment>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <section className={`container-fluid ${classes.Ecosystem}`}>
              <div className="container">
                <SectionTitleViewMode
                  icon="fa-folder-open"
                  objectType="structures"
                  language={this.props.language}
                  id={this.props.id}
                  title={messages[this.props.language]['Entity.ecosystem.title']}
                  lexicon="EntityEcosystem"
                  viewModeClickHandler={this.viewModeClickHandler}
                  viewMode={this.state.viewMode}
                />
                <div className="row">
                  <div className="col">
                    <EmptySection
                      language={this.props.language}
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
    const subtitle = (this.props.language === 'fr') ? ("Avertissement : Ces données ne représentent que ce que scanR a réussi à collecter.<br/>Elles ne doivent pas être utilisées à des fins d'évaluation.") : ('Disclaimer: These data are represent only what scanR managed to collect.<br/>They cannot be used for assessment purposes.');

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Ecosystem}`}>
            <div className="container">
              <SectionTitleViewMode
                icon="fa-folder-open"
                objectType="structures"
                language={this.props.language}
                id={this.props.id}
                title={messages[this.props.language]['Entity.ecosystem.title']}
                lexicon="EntityEcosystem"
                viewModeClickHandler={this.viewModeClickHandler}
                viewMode={this.state.viewMode}
              />
              <hr />
              {
                (this.state.viewMode === 'list')
                  ? this.renderViewList(messages)
                  : this.renderViewGraph(dataGraph, subtitle)
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
  id: PropTypes.string.isRequired,
};
