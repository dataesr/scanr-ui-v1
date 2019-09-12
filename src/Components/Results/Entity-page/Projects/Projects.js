import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';
import InputRange from 'react-input-range';

import { API_PROJECTS_SEARCH_END_POINT } from '../../../../config/config';
import getSelectKey from '../../../../Utils/getSelectKey';

import Autocomplete from '../../../Shared/Ui/Autocomplete/Autocomplete';
import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';
import EmptySection from '../Shared/EmptySection/EmptySection';
import Select from '../../../Shared/Ui/Select/Select';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';

import SankeyGraph from '../../../Shared/GraphComponents/Graphs/HightChartsSankey';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import messagesEntityFr from '../translations/fr.json';
import messagesEntityEn from '../translations/en.json';

import classes from './Projects.scss';
import '../Shared/rangeSlider.css';

/**
 * Projects component graph sankey + liste
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class Projects extends Component {
  state = {
    viewMode: 'list',
    data: [],
    initialData: [],
    selectedProject: {},
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
    this.getYearsBounds();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data && this.state.data.length > 0) {
      this.sortByYear();
      this.createTypeFilter();
      this.createAutocompleteData();
    }
  }

  getData = () => {
    // https://scanr-preprod.sword-group.com/api/v2/publications/search
    // affiliations.id
    const url = API_PROJECTS_SEARCH_END_POINT;
    const data = {
      pageSize: 5000,
      sourceFields: ['id', 'title', 'type', 'year', 'acronym', 'duration', 'label', 'url', 'description', 'founding', 'participants'],
      filters: {
        'participants.structure.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: [this.props.structureId],
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
      },
    };
    Axios.post(url, data).then((response) => {
      this.setState({ data: response.data.results, initialData: response.data.results });
    });
  }

  getYearsBounds = () => {
    const url = API_PROJECTS_SEARCH_END_POINT;
    const data = {
      pageSize: 5000,
      sourceFields: ['id'],
      filters: {
        'participants.structure.id': {
          type: 'MultiValueSearchFilter',
          op: 'all',
          values: [this.props.structureId],
        },
      },
    };
    Axios.post(url, data).then((response) => {
      const facetYears = response.data.facets.find(facet => facet.id === 'facet_years');

      if (facetYears) {
        const allYears = [];
        facetYears.entries.forEach(e => (allYears.push(e.value)));

        const minYear = Math.min(...allYears);
        const maxYear = Math.max(...allYears);
        this.setState({ minYear, maxYear, sliderYear: { min: minYear, max: maxYear } });
      }
    });
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  sortByYear = () => {
    const sortedData = this.state.data;
    if (sortedData) {
      sortedData.sort((a, b) => (a.value.year - b.value.year));
      this.setState({ data: sortedData });
    }
  }

  setSelectedProjectHandler = (selectedProject) => {
    this.setState({ selectedProject });
  }

  createTypeFilter = () => {
    const typeFilter = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      const type = this.state.data[i].value.type;
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

  createAutocompleteData = () => {
    const autocompleteData = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      const obj = {};
      const values = [];
      if (this.state.data[i].value && this.state.data[i].value.label && this.state.data[i].value.label.en) {
        values.push(this.state.data[i].value.label.en);
      }
      if (this.state.data[i].value && this.state.data[i].value.label && this.state.data[i].value.label.fr) {
        values.push(this.state.data[i].value.label.fr);
      }
      if (this.state.data[i].value && this.state.data[i].value.acronym && this.state.data[i].value.acronym.en) {
        values.push(this.state.data[i].value.acronym.en);
      }
      if (this.state.data[i].value && this.state.data[i].value.acronym && this.state.data[i].value.acronym.fr) {
        values.push(this.state.data[i].value.acronym.fr);
      }

      obj.label = getSelectKey(this.state.data[i].value, 'label', this.props.language, 'fr');
      obj.values = values;
      obj.project = this.state.data[i];
      autocompleteData.push(obj);
    }
    this.setState({ autocompleteData });
  }

  setTypeFilter = (filterValue) => {
    if (filterValue !== 'all') {
      /* eslint-disable-next-line */
      const data = this.state.data.filter(item => item.value.type.includes(filterValue));
      this.setState({ data });
    } else {
      this.setState(prevState => ({ data: prevState.initialData, filterValue: null }));
    }
  }

  renderViewList = (messages) => {
    const filteredData = [];
    for (let i = 0; i < this.state.data.length; i += 1) {
      if (this.state.data[i].value.year >= this.state.sliderYear.min && this.state.data[i].value.year <= this.state.sliderYear.max) {
        filteredData.push(this.state.data[i]);
      }
    }

    let year = null;
    const content = filteredData.map((item) => {
      let titleYear = null;
      if (year !== item.value.year) { // Rupture sur les années
        year = item.value.year;
        titleYear = <div className={classes.TitleYear}>{item.value.year}</div>;
      }

      /* Selection du premier par defaut */
      let selected = '';
      if (item === this.state.selectedProject) {
        selected = classes.Selected;
      }

      return (
        <Fragment key={item.value}>
          {titleYear}
          <div
            className={`${classes.Item} ${selected}`}
            onClick={() => this.setSelectedProjectHandler(item)}
            onKeyPress={() => this.setSelectedProjectHandler(item)}
            role="button"
            tabIndex={0}
          >
            <span className={classes.Acronym}>
              {item.value.acronym.default}
            </span>
            <span className={classes.Type}>
              {item.value.type}
            </span>
          </div>
        </Fragment>
      );
    });

    const typeFilterPlaceHolder = (this.state.filterValue)
      ? `${this.state.data.length} ${this.state.filterValue}`
      : `${this.state.data.length} ${messages[this.props.language]['Entity.projects.selectTypesFilter.placeHolder']}`;

    let description = null;
    if (this.state.selectedProject.value) {
      description = getSelectKey(this.state.selectedProject.value, 'description', this.props.language, 'fr');
    }
    if (!description) {
      description = 'Pas de description trouvée';
    }

    return (
      <Fragment>
        <div className={`row ${classes.Filters}`}>
          <div className="col-md">
            <Select
              allLabel={messages[this.props.language]['Entity.projects.selectTypesFilter.allLabel']}
              count={this.state.data.length}
              title={messages[this.props.language]['Entity.projects.selectTypesFilter.title']}
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
              title={messages[this.props.language]['Entity.projects.autoCompleteTypesFilter.title']}
              placeHolder={typeFilterPlaceHolder}
              data={this.state.autocompleteData}
              onSubmit={this.setSelectedProjectHandler}
            />
          </div>
        </div>
        {/* /row */}
        <div className="row">
          <div className="col-lg-5">
            <div className={classes.ListOfProjects}>
              {content}
            </div>
          </div>
          <div className="col-lg-7">
            {
              (this.state.selectedProject.value)
                ? (
                  <Fragment>
                    <div className={classes.detailTitle}>
                      {this.state.selectedProject.value.label.en}
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col">
                        {
                          /* eslint-disable-next-line */
                          /* `${this.state.selectedProject.founding.toLocaleString()} €  `*/
                        }
                        funding
                      </div>
                      <div className="col">
                        {
                          (this.state.selectedProject.value.duration)
                            ? (
                              `${this.state.selectedProject.value.duration} mois`
                            )
                            : (
                              <div>
                                Durée inconnue
                              </div>
                            )
                        }
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        {this.state.selectedProject.type}
                      </div>
                      <div className="col">
                        {`n°${this.state.selectedProject.value.id}`}
                      </div>
                    </div>
                    <hr />
                    <div className={classes.Description}>
                      {description}
                    </div>
                    <hr />
                    <ButtonToPage
                      className={classes.btn_dark}
                      url={this.state.selectedProject.value.url}
                    >
                      Voir le projet
                    </ButtonToPage>
                  </Fragment>
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

  renderViewGraph = () => (
    <div className="row">
      <div className="col">
        <SankeyGraph />
      </div>
    </div>
  );

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

    if (!this.state.data) {
      return (
        <Fragment>
          <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
            <section className={`container-fluid ${classes.Projects}`}>
              <div className="container">
                <SectionTitle
                  icon="fas fa-folder-open"
                  modifyModeHandle={this.modifyModeHandle}
                  modifyMode={this.state.modifyMode}
                  emptySection
                >
                  {messagesEntity[this.props.language]['Entity.Section.Projects.label']}
                </SectionTitle>
                <div className="row">
                  <div className="col">
                    <EmptySection
                      language={this.props.language}
                      masterKey="Projects"
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

    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.Projects}`}>
            <div className="container">
              <div className={`row ${classes.SectionTitle}`}>
                <div className="col">
                  <i className="fas fa-folder-open" />
                  <span className={classes.Label}>
                    {this.state.data.length}
                    &nbsp;
                    {messagesEntity[this.props.language]['Entity.Section.Projects.label']}
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
                  : this.renderViewGraph()
              }
              <hr />
              badges liés aux projets
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}


export default Projects;

Projects.propTypes = {
  language: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,
};
