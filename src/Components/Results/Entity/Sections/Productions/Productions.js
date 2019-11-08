import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';
import InputRange from 'react-input-range';

import { API_PUBLICATIONS_SEARCH_END_POINT, API_PUBLICATIONS_END_POINT } from '../../../../../config/config';

import EmptySection from '../../../../Shared/Results/EmptySection/EmptySection';
import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import ProductionDetail from '../../../../Shared/Results/Productions/ProductionDetail';
import SunburstChart from '../../../../Shared/GraphComponents/Graphs/HighChartsSunburst';
import BarChart from '../../../../Shared/GraphComponents/Graphs/HighChartsBar';
// import PublicationCard from '../../../../Search/SearchResults/ResultCards/PublicationCard';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../../translations/fr.json';
import messagesEntityEn from '../../translations/en.json';

import classes from './Productions.scss';

/**
 * Productions
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Productions extends Component {
  state = {
    query: '',
    currentQueryText: '',
    total: '',
    isOa: {},
    journals: {},
    years: {},
    types: {},
    modifyMode: false,
    activeGraph: 'isOa',
    viewMode: 'list',
    data: [],
    initialData: [],
    selectedProduction: {},
    autocompleteData: null,
    sliderYear: {
      min: null,
      max: null,
    },
    minYear: null,
    maxYear: null,
  }

  componentDidMount() {
    const initial = true;
    this.getData(initial);
    // this.setYearsBounds();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sliderYear.min !== this.state.sliderYear.min || prevState.sliderYear.max !== this.state.sliderYear.max) {
      this.getData();
    }
    if (prevState.query !== this.state.query) {
      const sliderYears = {
        min: null,
        max: null,
      };
      this.setState({ sliderYears });
      this.getData(true);
    }
  }

  getDataGraph = () => {
    const pubOa = this.state.data.filter(el => (el.value.productionType === 'publication' && el.value.isOa));
    const pubNoa = this.state.data.filter(el => (el.value.productionType === 'publication' && !el.value.isOa));
    const thesesOa = this.state.data.filter(el => (el.value.productionType === 'thesis' && el.value.isOa));
    const thesesNoa = this.state.data.filter(el => (el.value.productionType === 'thesis' && !el.value.isOa));

    const dataGraph = [{
      id: 'Production',
      parent: '',
      name: 'Production',
    },
    {
      id: 'Publications',
      parent: 'Production',
      name: 'Publications',
      color: '#cc3d8f',
    },
    {
      id: 'Publications-oa',
      parent: 'Publications',
      name: 'Publications<br>Accès ouvert',
      value: pubOa.length,
      color: '#D580B0',
    },
    {
      id: 'Publications-noa',
      parent: 'Publications',
      name: 'Publications<br>Accès fermé',
      value: pubNoa.length,
      color: '#4D2E3F',
    },
    {
      id: 'Theses',
      parent: 'Production',
      name: 'Thèses',
      color: '#fead3f',
    },
    {
      id: 'Theses-oa',
      parent: 'Theses',
      name: 'Thèses<br>Accès ouvert',
      value: thesesOa.length,
      color: '#FFCF8C',
    },
    {
      id: 'Theses-noa',
      parent: 'Theses',
      name: 'Thèses<br>Accès fermé',
      value: thesesNoa.length,
      color: '#806846',
    },
    ];
    return dataGraph;
  }

  getData = (initial = false) => {
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    let st = this.state.sliderYear.min ? this.state.sliderYear.min : 2000;
    let en = this.state.sliderYear.max ? this.state.sliderYear.max : 2020;
    if (initial) {
      st = 2000;
      en = 2020;
    }
    const start = new Date(Date.UTC(st, 0, 1)).toISOString();
    const end = new Date(Date.UTC(en, 11, 31)).toISOString();
    const request = {
      pageSize: 500,
      query: this.state.query,
      filters: {
        publicationDate: {
          type: 'DateRangeFilter',
          max: end,
          min: start,
          missing: false,
        },
      },
      aggregations: {
        types: {
          field: 'type',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 50,
        },
        journal: {
          field: 'source.title',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 10,
        },
        years: {
          field: 'year',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 100,
        },
        isOa: {
          field: 'isOa',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 10,
        },
      },
    };
    request.filters[this.props.filterKey] = {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: [this.props.match.params.id],
    };
    request.filters.productionType = {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: ['publication'],
    };
    Axios.post(url, request).then((response) => {
      // eslint-disable-next-line
      let years = [2000, 2020]
      try {
        years = response.data.facets.find(facet => facet.id === 'years').entries.map(a => parseInt(a.value, 10));
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
      const stableState = { ...this.state };
      let minYear = stableState.minYear;
      let maxYear = stableState.maxYear;
      if (initial) {
        minYear = Math.min(...years);
        maxYear = Math.max(...years);
      }
      this.setState({
        data: response.data.results,
        initialData: response.data.results,
        total: response.data.total,
        sliderYear: {
          min: Math.min(...years),
          max: Math.max(...years),
        },
        minYear,
        maxYear,
        journals: response.data.facets.find(item => item.id === 'journal'),
        years: response.data.facets.find(facet => facet.id === 'years'),
        domains: response.data.facets.find(facet => facet.id === 'domains'),
        types: response.data.facets.find(facet => facet.id === 'types'),
      });
    });
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  queryTextChangeHandler = (e) => {
    this.setState({ currentQueryText: e.target.value });
  }

  queryChangeHandler = () => {
    // eslint-disable-next-line
    const prevState = { ...this.state };
    this.setState({ query: prevState.currentQueryText });
  }

  changeGraphHandler = (nextGraph) => {
    this.setState({ activeGraph: nextGraph });
  }

  // eslint-disable-next-line
  setSelectedProductionHandler = (selectedProduction) => {
    const url = `${API_PUBLICATIONS_END_POINT}/${selectedProduction.value.id.replace(new RegExp('/', 'g'), '%252f')}`;
    Axios.get(url).then((response) => {
      this.setState({ selectedProduction: response.data });
      // eslint-disable-next-line
    }).catch(e => console.log('error:', e));
  };

  renderViewList = () => {
    const filteredData = this.state.data;

    const content = filteredData.map((item) => {
      let selected = '';
      if (item === this.state.selectedProduction) {
        selected = classes.Selected;
      }

      return (
        <Fragment key={item.value.id}>
          <div
            className={`${classes.Item} ${selected}`}
            onClick={() => this.setSelectedProductionHandler(item)}
            onKeyPress={() => this.setSelectedProductionHandler(item)}
            role="button"
            tabIndex={0}
          >
            <span className={classes.Title}>
              {item.value.title.default}
            </span>
            <span className={classes.Type}>
              <span className={classes[item.value.productionType]} />
              {item.value.productionType}
            </span>
          </div>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <div className={`row align-items-center ${classes.Filters}`}>
          <div className={`col-md ${classes.RangeSlider}`}>
            <div className={classes.Title}>
              Sélectionner une période
            </div>
            <div className={classes.Slider}>
              <InputRange
                minValue={this.state.minYear}
                maxValue={this.state.maxYear}
                formatLabel={value => value}
                value={this.state.sliderYear}
                onChange={value => this.setState({ sliderYear: value })}
              />
            </div>
          </div>
          <div className="col-md col-xs-hidden" />
          <div className="col-md">
            <label className={classes.Title} htmlFor="input">
              Rechercher dans les publications
            </label>
            <input
              type="text"
              autoComplete="off"
              id="input"
              value={this.state.currentQueryText}
              className={`pl-2 ${classes.SearchBar}`}
              onChange={this.queryTextChangeHandler}
              onFocus={this.setActive}
              onBlur={this.setInactive}
            />
            <button
              className={classes.SearchButton}
              type="submit"
              onClick={this.queryChangeHandler}
            >
              <i className={`fas fa-search ${classes.SearchIcon}`} />
            </button>
          </div>
        </div>
        {/* /row */}
        <div className="row">
          <div className="col-lg-5">
            <div className={classes.ListOfProductions}>
              {content}
            </div>
          </div>
          <div className="col-lg-7">
            <ProductionDetail data={this.state.selectedProduction} language={this.props.language} />
          </div>
        </div>
      </Fragment>
    );
  }

  renderViewGraph = (data) => {
    const pubOa = data.find(el => (el.id === 'Publications-oa'));
    const pubNoa = data.find(el => (el.id === 'Publications-noa'));
    const thesesOa = data.find(el => (el.id === 'Theses-oa'));
    const thesesNoa = data.find(el => (el.id === 'Theses-noa'));

    return (
      <div className="row">
        <div className={`col-md ${classes.Legendary}`}>
          <div className={classes.Production}>
            <span className={`${classes.Bullet} ${classes.publicationColor}`} />
            {`${(pubOa.value + pubNoa.value).toLocaleString()} publications`}
            <div className={classes.Sub}>
              {`dont ${pubOa.value.toLocaleString()} en accès ouvert`}
            </div>
            <div className={classes.Sub}>
              {`et ${pubNoa.value.toLocaleString()} en accès fermé`}
            </div>
          </div>

          <div className={classes.Production}>
            <span className={`${classes.Bullet} ${classes.theseColor}`} />
            {`${(thesesOa.value + thesesNoa.value).toLocaleString()} thèses`}
            <div className={classes.Sub}>
              {`dont ${thesesOa.value.toLocaleString()} en accès ouvert`}
            </div>
            <div className={classes.Sub}>
              {`et ${thesesNoa.value.toLocaleString()} en accès fermé`}
            </div>
          </div>
        </div>
        <div className="col-md">
          <SunburstChart text="Productions" series={data} />
        </div>
      </div>
    );
  }

  whichGraph = (data) => {
    if (this.state.graph === 'isOa') {
      return <SunburstChart text="Productions" series={data} />;
    }
    return (
      <BarChart
        filename={this.state.graph}
        data={this.state[this.state.graph]}
        language={this.props.language}
      />
    );
  }

  renderViewGraph = data => (
    <div className="row">
      <div className={`col-md-12 ${classes.graphCard}`}>
        {this.whichGraph(data)}
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

    if (!this.state.data || this.state.data.length === 0) {
      return (
        <Fragment>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <section className={`container-fluid ${classes.Productions}`}>
              <div className="container">
                <SectionTitle
                  icon="fas fa-th"
                  modifyModeHandle={this.modifyModeHandle}
                  modifyMode={this.state.modifyMode}
                  emptySection
                >
                  {messagesEntity[this.props.language]['Entity.Section.Productions.label']}
                </SectionTitle>
                <div className="row">
                  <div className="col">
                    <EmptySection
                      language={this.props.language}
                      masterKey="Productions"
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
          <section className={`container-fluid ${classes.Productions}`}>
            <div className="container">
              <div className={`row ${classes.SectionTitle}`}>
                <div className="col">
                  <i className="fas fa-folder-open" />
                  <span className={classes.Label}>
                    {this.state.data.length}
                    &nbsp;
                    {messagesEntity[this.props.language]['Entity.Section.Productions.label']}
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

export default Productions;

Productions.propTypes = {
  language: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
};
