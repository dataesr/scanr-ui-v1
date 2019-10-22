import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';
import InputRange from 'react-input-range';
import moment from 'moment';

import getSelectKey from '../../../../Utils/getSelectKey';

import { API_PUBLICATIONS_SEARCH_END_POINT, API_PUBLICATIONS_END_POINT } from '../../../../config/config';
import Autocomplete from '../../Ui/Autocomplete/Autocomplete';
import EmptySection from '../../../Results/Entity-page/Shared/EmptySection/EmptySection';
import Select from '../../Ui/Select/Select';
import SectionTitle from '../SectionTitle/SectionTitle';
import ProductionDetail from './ProductionDetail';
import SunburstChart from '../../GraphComponents/Graphs/HighChartsSunburst';

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
    viewMode: 'list',
    data: [],
    initialData: [],
    selectedProduction: {},
    typeFilter: [],
    filterValue: null,
    autocompleteData: null,
    modifyMode: false,
    sliderYear: {
      min: 2000,
      max: new Date().getFullYear(),
    },
    minYear: 2000,
    maxYear: new Date().getFullYear(),
  }

  componentDidMount() {
    this.getData();
    // this.getYearsBounds();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data && this.state.data.length > 0) {
      // this.sortByYear();
      this.createTypeFilter();
      this.createAutocompleteData();
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

  getData = () => {
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    const filterKey = this.props.filterKey;
    const data = {
      pageSize: 5000,
      // sourceFields: ['id', 'title', 'type', 'year', 'acronym', 'duration', 'label', 'url', 'description', 'founding', 'participants'],
      lang: 'fr',
      filters: {},
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
      },
    };
    data.filters[filterKey] = {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: [this.props.objectId],
    };
    Axios.post(url, data).then((response) => {
      // eslint-disable-next-line
      this.setState({ data: response.data.results, initialData: response.data.results });
    });
  }

  getYearsBounds = () => {
    const url = API_PUBLICATIONS_SEARCH_END_POINT;
    const filterKey = this.props.filterKey;
    const data = {
      pageSize: 5000,
      lang: 'fr',
      sourceFields: ['id'],
      filters: {},
    };
    data.filters[filterKey] = {
      type: 'MultiValueSearchFilter',
      op: 'all',
      values: [this.props.objectId],
    };
    Axios.post(url, data).then((response) => {
      const facetPublicationDates = response.data.facets.find(facet => facet.id === 'facet_publication_date');

      if (facetPublicationDates) {
        const allYears = [];
        facetPublicationDates.entries.forEach(e => (allYears.push(e.value.substring(0, 4))));

        const minYear = Math.min(...allYears);
        const maxYear = Math.max(...allYears);
        this.setState({ minYear, maxYear, sliderYear: { min: minYear, max: maxYear } });
      }
    });
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  // eslint-disable-next-line
  setSelectedProductionHandler = (selectedProduction) => {
    const url = `${API_PUBLICATIONS_END_POINT}/${selectedProduction.value.id.replace('/', '%252f')}`;
    Axios.get(url).then((response) => {
      // eslint-disable-next-line
      this.setState({ selectedProduction: response.data });
      // eslint-disable-next-line
    }).catch(e => console.log('error:', e));
  };

  createTypeFilter = () => {
    const typeFilter = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      const type = this.state.data[i].value.productionType;
      const found = typeFilter.find(item => item.value === type);
      if (found) {
        found.count += 1;
      } else {
        const obj = {};
        obj.value = type;
        obj.count = 1;
        typeFilter.push(obj);
      }
    }
    this.setState({ typeFilter });
  }

  setTypeFilter = (filterValue) => {
    if (filterValue !== 'all') {
      /* eslint-disable-next-line */
      const data = this.state.data.filter(item => item.value.productionType.includes(filterValue));
      this.setState({ data });
    } else {
      this.setState(prevState => ({ data: prevState.initialData, filterValue: null }));
    }
  }

  createAutocompleteData = () => {
    const autocompleteData = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      const obj = {};
      const values = [];
      if (this.state.data[i].value && this.state.data[i].value.title && this.state.data[i].value.title.default) {
        values.push(this.state.data[i].value.title.default);
      }
      if (this.state.data[i].value && this.state.data[i].value.title && this.state.data[i].value.title.fr) {
        values.push(this.state.data[i].value.title.fr);
      }
      if (this.state.data[i].value && this.state.data[i].value.title && this.state.data[i].value.title.en) {
        values.push(this.state.data[i].value.title.en);
      }

      obj.label = getSelectKey(this.state.data[i].value, 'title', this.props.language, 'default');
      obj.values = values;
      obj.production = this.state.data[i];
      autocompleteData.push(obj);
    }
    this.setState({ autocompleteData });
  }

  renderViewList = (messages) => {
    const filteredData = this.state.data.sort((a, b) => (b.value.publicationDate - a.value.publicationDate));
    const content = filteredData.map((item, i) => {
      let first = false;
      if ((i - 1) > 0) {
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
            <span className={classes.Title}>
              {item.value.title.default}
            </span>
            <span className={classes.Type}>
              <span className={classes[item.value.productionType]} />
              {messages[this.props.language][`Productions.${item.value.productionType}`]}
            </span>
          </div>
        </Fragment>
      );
    });

    const typeFilterPlaceHolder = (this.state.filterValue)
      ? `${this.state.data.length} ${this.state.filterValue}`
      : `${this.state.data.length} ${messages[this.props.language]['Productions.selectTypesFilter.placeHolder']}`;

    return (
      <Fragment>
        <div className={`row ${classes.Filters}`}>
          <div className="col-md">
            <Select
              allLabel={messages[this.props.language]['Productions.selectTypesFilter.allLabel']}
              count={this.state.data.length}
              title={messages[this.props.language]['Productions.selectTypesFilter.title']}
              placeHolder={typeFilterPlaceHolder}
              data={this.state.typeFilter}
              onSubmit={this.setTypeFilter}
            />
          </div>
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
          <div className="col-md">
            <Autocomplete
              title={messages[this.props.language]['Productions.autoCompleteTypesFilter.title']}
              placeHolder={typeFilterPlaceHolder}
              data={this.state.autocompleteData}
              onSubmit={this.setSelectedProductionHandler}
            />
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

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
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
                  {messages[this.props.language]['Productions.label']}
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
                    {messages[this.props.language]['Productions.label']}
                  </span>
                  <div className="d-flex flex-wrap align-items-center">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-labelledBy="productionViewList"
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
                      aria-labelledBy="productionViewGraph"
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
  // id: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
};
