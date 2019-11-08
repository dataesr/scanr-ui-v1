import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';
import InputRange from 'react-input-range';
import moment from 'moment';


import { API_PUBLICATIONS_SEARCH_END_POINT, API_PUBLICATIONS_END_POINT } from '../../../../../config/config';

import EmptySection from '../../../../Shared/Results/EmptySection/EmptySection';
import SectionTitle from '../../../../Shared/Results/SectionTitle/SectionTitle';
import ProductionDetail from '../../../../Shared/Results/Productions/ProductionDetail';
import SunburstChart from '../../../../Shared/GraphComponents/Graphs/HighChartsSunburst';
import BarChart from '../../../../Shared/GraphComponents/Graphs/HighChartsBar';
import WorldCloud from '../../../../Shared/GraphComponents/Graphs/HighChartsWordCloud';
import YearChart from '../../../../Shared/GraphComponents/Graphs/HighChartsLine';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

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
    keywords: {},
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
    this.getData(true);
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
        keywords: {
          field: 'keywords.fr',
          filters: {},
          min_doc_count: 1,
          order: {
            direction: 'DESC',
            type: 'COUNT',
          },
          size: 100,
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
        minYear = (years.length > 0) ? Math.min(...years) : 2000;
        maxYear = (years.length > 0) ? Math.max(...years) : 2020;
      }
      this.setState({
        data: response.data.results,
        initialData: response.data.results,
        total: response.data.total,
        sliderYear: {
          min: (years.length > 0) ? Math.min(...years) : 2000,
          max: (years.length > 0) ? Math.max(...years) : 2020,
        },
        minYear,
        maxYear,
        journals: response.data.facets.find(item => item.id === 'journal'),
        keywords: response.data.facets.find(item => item.id === 'keywords'),
        years: {
          entries: [],
        },
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

  queryChangeHandler = (e) => {
    // eslint-disable-next-line
    e.preventDefault();
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

  renderViewList = (messages) => {
    const filteredData = this.state.data.sort((a, b) => (b.value.publicationDate - a.value.publicationDate));

    const content = filteredData.map((item, i) => {
      let first = false;
      if (i > 0) {
        first = (moment(filteredData[i - 1].value.publicationDate).format('YYYY') !== moment(item.value.publicationDate).format('YYYY'));
      }
      let selected = '';
      if (item === this.state.selectedProduction) {
        selected = classes.Selected;
      }
      return (
        <Fragment key={item.value.id}>
          {
            (i === 0 || first)
              ? (
                <div className={classes.TitleYear}>
                  {
                    moment(item.value.publicationDate).format('YYYY')
                  }
                </div>
              )
              : null
          }
          <div
            className={`${classes.Item} ${selected}`}
            onClick={() => this.setSelectedProductionHandler(item)}
            onKeyPress={() => this.setSelectedProductionHandler(item)}
            role="button"
            tabIndex={0}
          >
            <p className={classes.Title}>
              {item.value.title.default}
            </p>
            <div className={`d-flex align-items-center ${classes.Type}`}>
              <div className="mr-auto" />
              <span className={classes[item.value.productionType]} />
              <p className="m-0">{item.value.type}</p>
            </div>
          </div>
        </Fragment>
      );
    });

    return (
      <Fragment>
        <div className={`row align-items-center ${classes.Filters}`}>
          <div className={`col-lg-5 ${classes.RangeSlider} ${(this.state.years.entries.length > 0 ? '' : 'hidden')}`}>
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
          <form className="col-lg-7" onSubmit={this.queryChangeHandler}>
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
            >
              <i className={`fas fa-search ${classes.SearchIcon}`} />
            </button>
          </form>
        </div>
        {/* /row */}
        <div className="row">
          <div className="col-lg-5">
            <div className={classes.ListOfProductions}>
              {(content.length > 0) ? content : 'Aucun résultat'}
            </div>
          </div>
          <div className="col-lg-7">
            <ProductionDetail data={this.state.selectedProduction} language={this.props.language} />
          </div>
        </div>
      </Fragment>
    );
  }

  changeGraphHandler = (nextGraph) => {
    console.log('nextGraph', nextGraph);
    this.setState({ activeGraph: nextGraph });
  }

  whichGraph = (data) => {
    if (this.state.activeGraph === 'isOa') {
      return <SunburstChart text="Productions" series={data} />;
    }
    if (this.state.activeGraph === 'keywords') {
      return <WorldCloud filename={this.state.activeGraph} data={this.state[this.state.activeGraph]} language={this.props.language} />;
    }
    if (this.state.activeGraph === 'years') {
      return <YearChart filename={this.state.activeGraph} data={this.state[this.state.activeGraph]} language={this.props.language} />;
    }
    return (
      <BarChart
        filename={this.state.activeGraph}
        data={this.state[this.state.activeGraph]}
        language={this.props.language}
      />
    );
  }

  renderViewGraph = data => (
    <React.Fragment>
      <ul className="nav justify-content-center py-1">
        <li
          className={`btn mx-1 ${classes.graphSelector} ${(this.state.activeGraph === 'isOa') ? classes.active : ''} ${(this.state.isOa) ? '' : 'disabled'}`}
          onClick={() => this.changeGraphHandler('isOa')}
          onKeyPress={() => this.changeGraphHandler('isOa')}
        >
          OpenAccess
        </li>
        <li
          className={`btn mx-1 ${classes.graphSelector} ${(this.state.activeGraph === 'journals') ? classes.active : ''} ${(this.state.journals.entries) ? '' : 'disabled'}`}
          onClick={() => this.changeGraphHandler('journals')}
          onKeyPress={() => this.changeGraphHandler('journals')}
        >
          Journals
        </li>
        <li
          className={`btn mx-1 ${classes.graphSelector} ${(this.state.activeGraph === 'years') ? classes.active : ''}`}
          disable={(this.state.years.entries && this.state.years.entries.length > 0) ? 'false' : 'true'}
          onClick={() => this.changeGraphHandler('years')}
          onKeyPress={() => this.changeGraphHandler('years')}
        >
          Years
        </li>
        <li
          className={`btn mx-1 ${classes.graphSelector} ${(this.state.activeGraph === 'types') ? classes.active : ''} ${(this.state.types.entries) ? '' : 'disabled'}`}
          onClick={() => this.changeGraphHandler('types')}
          onKeyPress={() => this.changeGraphHandler('types')}
        >
          Types
        </li>
        <li
          className={`btn mx-1 ${classes.graphSelector} ${(this.state.activeGraph === 'keywords') ? classes.active : ''} ${(this.state.keywords.entries) ? '' : 'disabled'}`}
          onClick={() => this.changeGraphHandler('keywords')}
          onKeyPress={() => this.changeGraphHandler('keywords')}
        >
          Keywords
        </li>
      </ul>
      <div className="row">
        <div className={`col-md-12 ${classes.graphCard}`}>
          {this.whichGraph(data)}
        </div>
      </div>
    </React.Fragment>
  );

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    if (!this.state.query && this.state.data.length === 0) {
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
                  {messages[this.props.language]['Entity.productions.publication.label']}
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
              <div className={classes.SectionTitle}>
                <div className="d-flex flex-wrap align-items-center">
                  <i className="fas fa-folder-open" />
                  <span className={`mr-auto my-2 ${classes.Label}`}>
                    {this.state.data.length}
                    &nbsp;
                    {messages[this.props.language]['Entity.productions.publication.label']}
                  </span>
                  <div className="d-flex flex-wrap align-items-center">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-labelledby="productionViewList"
                      onClick={() => this.viewModeClickHandler('list')}
                      onKeyPress={() => this.viewModeClickHandler('list')}
                      className={classes.ViewChangeButton}
                    >
                      <div className="mx-3 d-flex flex-nowrap align-items-center">
                        <span className={`mx-2 btn ${classes.SquareButton} ${(this.state.viewMode === 'list') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}>
                          <i aria-hidden className="fas fa-list" />
                        </span>
                        <p className="m-0" id="productionViewList">
                          Liste
                          <br />
                          des résultats
                        </p>
                      </div>
                    </div>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-labelledby="productionViewGraph"
                      onClick={() => this.viewModeClickHandler('graph')}
                      onKeyPress={() => this.viewModeClickHandler('graph')}
                      className={classes.ViewChangeButton}
                    >
                      <div className="mx-3 d-flex flex-nowrap align-items-center">
                        <span className={`mx-2 btn ${classes.SquareButton} ${(this.state.viewMode === 'graph') ? classes.btn_scanrBlue : classes.btn_scanrlightgrey}`}>
                          <i aria-hidden className="fas fa-chart-pie" />
                        </span>
                        <p className="m-0" id="productionViewGraph">
                          Visualisation
                          <br />
                          des résultats
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
