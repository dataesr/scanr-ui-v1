import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import getSelectKey from '../../../../Utils/getSelectKey';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';
import Select from '../../../Shared/Ui/Select/Select';
import Autocomplete from '../../../Shared/Ui/Autocomplete/Autocomplete';

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
  }

  componentDidMount() {
    if (this.props.data) {
      this.sortByYear();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.state.data && this.state.data.length > 0) {
      this.sortByYear();
      this.createTypeFilter();
      this.createAutocompleteData();
    }
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
    for (let i = 0; i < this.props.data.length; i += 1) {
      const type = this.props.data[i].project.type;
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
    for (let i = 0; i < this.props.data.length; i += 1) {
      const obj = {};
      const values = [];
      if (this.props.data[i].project.label.en) {
        values.push(this.props.data[i].project.label.en);
      }
      if (this.props.data[i].project.label.fr) {
        values.push(this.props.data[i].project.label.fr);
      }
      if (this.props.data[i].project.acronym.en) {
        values.push(this.props.data[i].project.acronym.en);
      }
      if (this.props.data[i].project.acronym.fr) {
        values.push(this.props.data[i].project.acronym.fr);
      }

      obj.label = getSelectKey(this.props.data[i].project, 'label', this.props.language, 'fr');
      obj.values = values;
      obj.project = this.props.data[i];
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
      if (year !== item.project.year) {
        year = item.project.year;
        titleYear = <div className={classes.TitleYear}>{item.project.year}</div>;
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
              {item.project.acronym.en}
            </span>
            <span className={classes.Type}>
              {item.project.type}
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
            (this.state.selectedProject.project)
              ? (
                <Fragment>
                  <div className={classes.detailTitle}>
                    {this.state.selectedProject.project.label.en}
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col">
                      {`${this.state.selectedProject.founding.toLocaleString()} €`}
                    </div>
                    <div className="col">
                      {`${this.state.selectedProject.project.duration} mois`}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      {this.state.selectedProject.project.type}
                    </div>
                    <div className="col">
                      {`n°${this.state.selectedProject.project.id}`}
                    </div>
                  </div>
                  <hr />
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eros enim, fringilla in sagittis id, dictum at purus. Morbi vitae sapien consectetur, tincidunt enim et, condimentum tellus. Praesent lobortis fringilla enim vitae porta. Sed eu est erat. In egestas venenatis blandit. Vestibulum semper luctus nisi et tincidunt. Quisque imperdiet, tortor nec porta pellentesque, ligula sem condimentum nisl, sed ullamcorper felis risus id dui. Vivamus rhoncus nisi vel ipsum porta tempus. Nunc aliquet molestie rhoncus. Vestibulum vitae nibh quis velit iaculis blandit at quis sapien.
                  <hr />
                  <ButtonToPage
                    className={classes.btn_dark}
                    url="#"
                  >
                    Voir le projet dans scanR
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
      graph
    </div>
  );

  render() {
    if (!this.props.data) {
      return null;
    }
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const messagesEntity = {
      fr: messagesEntityFr,
      en: messagesEntityEn,
    };

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
                    {this.props.data.length}
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
                <div className="col">
                  <Select
                    allLabel={messages[this.props.language]['Entity.projects.selectTypesFilter.allLabel']}
                    count={this.state.data.length}
                    title={messages[this.props.language]['Entity.projects.selectTypesFilter.title']}
                    placeHolder={typeFilterPlaceHolder}
                    data={this.state.typeFilter}
                    onSubmit={this.setTypeFilter}
                  />
                </div>
                <div className="col">
                  slider year
                </div>
                <div className="col">
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
  data: PropTypes.string.isRequired,
};
