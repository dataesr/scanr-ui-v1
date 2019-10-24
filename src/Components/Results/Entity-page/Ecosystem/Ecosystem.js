import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import { GRAPH_ITEMS_LIST, ECOSYSTEM_LIMIT } from '../../../../config/config';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';
import EmptySection from '../Shared/EmptySection/EmptySection';
import PackedBubbleChart from '../../../Shared/GraphComponents/Graphs/HighChartsPackedbubble';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
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
    data: this.props.data,
    viewMode: 'list',
    modifyMode: false,
    kindFilter: [],
    kindFilterValue: null,
    frIntFilter: [],
    // frIntFilterValue: null,
    selectedCollaboration: {},
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
      this.createKindFilter();
      this.createFrIntFilter();
    }
  }

  getDataGraph = () => {
    const dataGraph = [];
    GRAPH_ITEMS_LIST.forEach((graphType) => {
      // Recherche des structures qui ont ce libellé dans leur clé "kind"
      // const structuresListFr = this.props.data.filter(el => (el.structure.kind.find(item => item === graphType) && el.structure.isFrench));
      // const structuresListFo = this.props.data.filter(el => (el.structure.kind.find(item => item === graphType) && !el.structure.isFrench));

      const dataSorted = this.props.data.sort((a, b) => {
        const prodA = ((a.details.Project) ? a.details.Project : 0) + ((a.details.publication) ? a.details.publication : 0);
        const prodB = ((b.details.Project) ? b.details.Project : 0) + ((b.details.publication) ? b.details.publication : 0);
        return prodB - prodA;
      });
      const limitedData = [];
      const limit = (dataSorted.length < ECOSYSTEM_LIMIT) ? dataSorted.length - 1 : ECOSYSTEM_LIMIT;
      for (let i = 0; i <= limit; i += 1) {
        limitedData.push(dataSorted[i]);
      }

      const structuresListFr = limitedData.filter(el => (el.structure.kind.find(item => item === graphType) && el.structure.isFrench));
      const structuresListFo = limitedData.filter(el => (el.structure.kind.find(item => item === graphType) && !el.structure.isFrench));

      const dataFr = [];
      const dataFo = [];
      structuresListFr.forEach((el) => {
        dataFr.push({ name: getSelectKey(el.structure, 'label', this.props.language, 'fr'), value: el.weight });
      });
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

      dataGraph[graphType] = [objFr, objFo];
    });

    return dataGraph;
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  setSelectedCollaborationHandler = (selectedCollaboration) => {
    this.setState({ selectedCollaboration });
  }

  setFrIntFilter = (frIntFilterValue) => {
    if (frIntFilterValue !== 'all') {
      /* eslint-disable-next-line */
      const data = this.state.data.filter(item => item.structure.isFrench === (frIntFilterValue === 'fr'));
      this.setState({ data });
    } else {
      // this.setState(prevState => ({ data: prevState.initialData, frIntFilterValue: null }));
      this.setState(prevState => ({ data: prevState.initialData }));
    }
  }

  setKindFilter = (filterValue) => {
    if (filterValue !== 'all') {
      /* eslint-disable-next-line */
      const data = this.state.data.filter(item => item.structure.kind.find(el => el === filterValue));
      this.setState({ data });
    } else {
      this.setState({ data: this.props.data, kindFilterValue: null });
    }
  }

  createKindFilter = () => {
    const kindFilter = [];
    GRAPH_ITEMS_LIST.forEach((graphType) => {
      const listObjects = this.props.data.filter(item => item.structure.kind.find(el => el === graphType));
      const obj = {};
      obj.value = graphType;
      obj.count = listObjects.length;
      kindFilter.push(obj);
    });
    this.setState({ kindFilter });
    // this.setState(prevState => ({ viewListFilters: { frInt: prevState.viewListFilters.frInt, kind: typeFilter } }));
  }

  createFrIntFilter = () => {
    let nbFr = 0;
    let nbEn = 0;
    this.props.data.forEach((item) => {
      if (item.structure.isFrench) {
        nbFr += 1;
      } else {
        nbEn += 1;
      }
    });
    const objFr = {};
    objFr.value = 'fr';
    objFr.count = nbFr;
    const objEn = {};
    objEn.value = 'en';
    objEn.count = nbEn;
    const listToAdd = [objFr, objEn];
    this.setState({ frIntFilter: listToAdd });
    // this.setState(prevState => ({ viewListFilters: { kind: prevState.viewListFilters.kind, frInt: listToAdd } }));
  }

  renderViewList = (messages) => {
    if (!this.state.data || this.state.data.length === 0) {
      return (<div>Pas de données</div>);
    }
    // Tri des données filtrées avant affichage
    const dataSorted = this.state.data.sort((a, b) => {
      const prodA = ((a.details.Project) ? a.details.Project : 0) + ((a.details.publication) ? a.details.publication : 0);
      const prodB = ((b.details.Project) ? b.details.Project : 0) + ((b.details.publication) ? b.details.publication : 0);
      return prodB - prodA;
    });


    const content = dataSorted.map((data) => {
      let selected = '';
      if (data === this.state.selectedCollaboration) {
        selected = classes.Selected;
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
              {`${data.weight} productions en commun`}
            </div>
          </div>
        </Fragment>
      );
    });

    const kindFilterPlaceHolder = (this.state.kindFilterValue)
      ? `${this.props.data.length} ${this.state.kindFilterValue}`
      : `${this.props.data.length} ${messages[this.props.language]['Entity.ecosystem.selectTypesFilter.placeHolder']}`;

    const frIntFilterPlaceHolder = (this.state.filterValue)
      ? `${this.props.data.length} ${this.state.filterValue}`
      : `${this.props.data.length} ${messages[this.props.language]['Entity.ecosystem.selectTypesFilter.placeHolder']}`;

    return (
      <Fragment>
        <div className="row">
          <div className="col-md">
            <Select
              allLabel={messages[this.props.language]['Entity.ecosystem.selectTypesFilter.allLabel']}
              count={this.props.data.length}
              title={messages[this.props.language]['Entity.ecosystem.selectTypesFilter.title']}
              placeHolder={kindFilterPlaceHolder}
              data={this.state.kindFilter || []}
              onSubmit={this.setKindFilter}
            />
          </div>
          <div className="col-md">
            <Select
              allLabel={messages[this.props.language]['Entity.ecosystem.selectFrIntFilter.allLabel']}
              count={this.props.data.length}
              title={messages[this.props.language]['Entity.ecosystem.selectFrIntFilter.title']}
              placeHolder={frIntFilterPlaceHolder}
              data={this.state.frIntFilter || []}
              onSubmit={this.setFrIntFilter}
            />
          </div>
        </div>

        {`${this.state.data.length} productions communes`}
        <div className="row">
          <div className={`col-md-5 ${classes.List}`}>
            {content}
          </div>
          <div className="col-md">
            {
              (this.state.selectedCollaboration.structure)
                ? (
                  <div className={classes.Details}>
                    <div className={classes.detailTitle}>
                      {getSelectKey(this.state.selectedCollaboration.structure, 'label', this.props.language, 'fr')}
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        <span>
                          {`${this.state.selectedCollaboration.weight} productions communes`}
                        </span>
                      </div>
                      <div className="col">
                        {
                          (this.state.selectedCollaboration.details.publication)
                            ? (
                              <div className={classes.Arrow}>
                                <i className="fas fa-arrow-right" />
                                {`${this.state.selectedCollaboration.details.publication} publications`}
                              </div>
                            ) : null
                        }
                        {
                          (this.state.selectedCollaboration.details.Project)
                            ? (
                              <div className={classes.Arrow}>
                                <i className="fas fa-arrow-right" />
                                {`${this.state.selectedCollaboration.details.Project} projets`}
                              </div>
                            ) : null
                        }
                      </div>
                    </div>
                    <hr />
                    <div className={classes.Description}>
                      <div className={classes.Content}>

                        nature
                        isFrench
                        Adresse
                        statut (active/old)

                      </div>
                    </div>
                    <hr />
                    <ButtonToPage
                      className={classes.btn_dark}
                      url=""
                    >
                      Voir l entité
                    </ButtonToPage>
                  </div>
                )
                : (
                  <div className={classes.Empty}>
                    {messages[this.props.language]['Entity.projects.empty.label']}
                  </div>
                )
            }
            vide
          </div>
        </div>
      </Fragment>
    );
  }


  renderViewGraph = data => (
    <div className="row">
      {
        GRAPH_ITEMS_LIST.map((graphType) => {
          if (data[graphType].length > 0) {
            return (
              <div className="col-md">
                <PackedBubbleChart text={graphType} series={data[graphType]} />
              </div>
            );
          }
          return null;
        })
      }
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
