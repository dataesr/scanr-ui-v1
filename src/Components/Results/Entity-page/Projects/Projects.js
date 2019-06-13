import React, { Component, Fragment } from 'react';
import { IntlProvider, FormattedHTMLMessage } from 'react-intl';
import PropTypes from 'prop-types';

import ButtonToPage from '../../../Shared/Ui/Buttons/ButtonToPage';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

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
  }

  componentDidMount() {
    if (this.props.data) {
      this.sortByYear();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.state.data) {
      this.sortByYear();
    }
  }

  viewModeClickHandler = (viewMode) => {
    this.setState({ viewMode });
  }

  sortByYear = () => {
    const sortedData = this.props.data;
    sortedData.sort((a, b) => (a.project.year - b.project.year));
    this.setState({ data: sortedData });
  }

  setSelectedProjectHandler = (selectedProject) => {
    this.setState({ selectedProject });
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
                      {`${this.state.selectedProject.founding} €`}
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

  renderViewGraph = () => {
    return (
      <div className="col">
        graph
      </div>
    );
  }

  render() {
    if (!this.props.data) {
      return null;
    }
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

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
                    <FormattedHTMLMessage id="Entity.projects.title" defaultMessage="Entity.projects.title" />
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
              <div className={`row ${classes.Filters}`}>
                <div className="col">
                  filtre type
                </div>
                <div className="col">
                  slider year
                </div>
                <div className="col">
                  search label
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
              badges ?
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  };
}


export default Projects;

Projects.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};
