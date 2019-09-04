import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

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
    selectedProject: {},
    typeFilter: [],
    filterValue: null,
    autocompleteData: null,
    modifyMode: false,
  }

  componentDidMount() {
    this.getData();
    // if (this.props.data) {
    //   this.sortByYear();
    // }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.state.data && this.state.data.length > 0) {
      this.sortByYear();
      // this.createTypeFilter();
      // this.createAutocompleteData();
    }
  }

  getData = () => {
    //https://scanr-preprod.sword-group.com/api/v2/publications/search
    //affiliations.id
    const url = 'https://scanr-preprod.sword-group.com/api/v2/projects/search';
    const data = {
      pageSize: 5000,
      sourceFields: ['id', 'title', 'type', 'year', 'acronym', 'duration', 'label', 'url', 'description', 'founding'],
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
      this.setState({ data: response.data.results });
    });
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  sortByYear = () => {
    const sortedData = this.props.data;
    if (sortedData) {
      sortedData.sort((a, b) => (a.project.year - b.project.year));
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
      const data = this.props.data.filter(item => item.project.type.includes(filterValue));
      this.setState({ data });
    } else {
      this.setState({ data: this.props.data, filterValue: null });
    }
  }

  renderViewList = () => {
    let year = null;
    const content = this.state.data.map((item) => {
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
        <Fragment>
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
    return (
      <Fragment>
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
                      {/*`${this.state.selectedProject.founding.toLocaleString()} €`*/}
                      founding
                    </div>
                    <div className="col">
                      {`${this.state.selectedProject.value.duration} mois`}
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
                    {this.state.selectedProject.value.description.en}
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
              : null
          }
        </div>
      </Fragment>
    );
  }

  renderViewGraph = () => (
    <div className="col">
      <SankeyGraph />
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


    const typeFilterPlaceHolder = (this.state.filterValue)
      ? `${this.state.data.length} ${this.state.filterValue}`
      : `${this.state.data.length} ${messages[this.props.language]['Entity.projects.selectTypesFilter.placeHolder']}`;

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
                              Liste des résultats
                            </button>
                            <button type="button" onClick={() => this.viewModeClickHandler('graph')} className={`btn  btn-sm ${classes.btn_scanrlightgrey}`}>
                              Visualisation des résultats
                            </button>
                          </Fragment>
                        )
                        : (
                          <Fragment>
                            <button type="button" onClick={() => this.viewModeClickHandler('list')} className={`btn  btn-sm ${classes.btn_scanrlightgrey}`}>
                              Liste des résultats
                            </button>
                            <button type="button" onClick={() => this.viewModeClickHandler('graph')} className={`btn  btn-sm ${classes.btn_scanrBlue}`}>
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
                <div className="col-md">
                  slider year
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
              {/* /row */}
              <div className="row">
                {
                  (this.state.viewMode === 'list')
                    ? this.renderViewList()
                    : this.renderViewGraph()
                }
              </div>
              {/* /row */}
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
  // data: PropTypes.string.isRequired,
  structureId: PropTypes.string.isRequired,
};
