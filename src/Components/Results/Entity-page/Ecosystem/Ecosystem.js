import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';

import EmptySection from '../Shared/EmptySection/EmptySection';
import SectionTitle from '../../../Shared/Results/SectionTitle/SectionTitle';
import PackedBubbleChart from '../../../Shared/GraphComponents/Graphs/HighChartsPackedbubble';
import Autocomplete from '../../../Shared/Ui/Autocomplete/Autocomplete';
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
    viewMode: 'graph',
    modifyMode: false,
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
    console.log('renderViewList', this.props.data);

    return (
      <div className="row">
        <div className='col-md'>
          Selection type
        </div>
        <div className='col-md'>
          Selection fr/int
        </div>
        <div className='col-md'>
          Selection nature
        </div>
      </div>
    );

    // fr/internationnale
    // Nature des structures à afficher
    // type de collaboration (projet/publications)
    //
    // let year = null;
    // const content = this.props.data.map((item) => {
    //   let titleYear = null;
    //   if (year !== item.value.year) { // Rupture sur les années
    //     year = item.value.year;
    //     titleYear = <div className={classes.TitleYear}>{item.value.year}</div>;
    //   }
    //
    //   /* Selection du premier par defaut */
    //   let selected = '';
    //   if (item === this.state.selectedProject) {
    //     selected = classes.Selected;
    //   }
    //
    //   return (
    //     <Fragment key={item.value}>
    //       {titleYear}
    //       <div
    //         className={`${classes.Item} ${selected}`}
    //         onClick={() => this.setSelectedProjectHandler(item)}
    //         onKeyPress={() => this.setSelectedProjectHandler(item)}
    //         role="button"
    //         tabIndex={0}
    //       >
    //         <span className={classes.Acronym}>
    //           {item.value.acronym.default}
    //         </span>
    //         <span className={classes.Type}>
    //           {item.value.type}
    //         </span>
    //       </div>
    //     </Fragment>
    //   );
    // });
    // const typeFilterPlaceHolder = (this.state.filterValue)
    //   ? `${this.state.data.length} ${this.state.filterValue}`
    //   : `${this.state.data.length} ${messages[this.props.language]['Entity.projects.selectTypesFilter.placeHolder']}`;
    //
    // let description = null;
    // if (this.state.selectedProject.value) {
    //   description = getSelectKey(this.state.selectedProject.value, 'description', this.props.language, 'fr');
    // }
    // if (!description) {
    //   description = 'Pas de description trouvée';
    // }
    //
    // return (
    //   <Fragment>
    //     <div className={`row ${classes.Filters}`}>
    //       <div className="col-md">
    //         <Select
    //           allLabel={messages[this.props.language]['Entity.projects.selectTypesFilter.allLabel']}
    //           count={this.state.data.length}
    //           title={messages[this.props.language]['Entity.projects.selectTypesFilter.title']}
    //           placeHolder={typeFilterPlaceHolder}
    //           data={this.state.typeFilter}
    //           onSubmit={this.setTypeFilter}
    //         />
    //       </div>
    //       <div className={`col-md ${classes.RangeSlider}`}>
    //         <div className={classes.Title}>
    //           Sélectionner une période
    //         </div>
    //       </div>
    //       <div className="col-md">
    //         <Autocomplete
    //           title={messages[this.props.language]['Entity.projects.autoCompleteTypesFilter.title']}
    //           placeHolder={typeFilterPlaceHolder}
    //           data={this.state.autocompleteData}
    //           onSubmit={this.setSelectedProjectHandler}
    //         />
    //       </div>
    //     </div>
    //     {/* /row */}
    //     <div className="row">
    //       <div className="col-lg-5">
    //         <div className={classes.ListOfProjects}>
    //           {content}
    //         </div>
    //       </div>
    //       <div className="col-lg-7">
    //         {
    //           (this.state.selectedProject.value)
    //             ? (
    //               <Fragment>
    //                 <div className={classes.detailTitle}>
    //                   {this.state.selectedProject.value.label.en}
    //                 </div>
    //                 <hr />
    //                 <div className="row">
    //                   <div className="col">
    //                     {
    //                       /* eslint-disable-next-line */
    //                       /* `${this.state.selectedProject.founding.toLocaleString()} €  `*/
    //                     }
    //                     funding
    //                   </div>
    //                   <div className="col">
    //                     {
    //                       (this.state.selectedProject.value.duration)
    //                         ? (
    //                           `${this.state.selectedProject.value.duration} mois`
    //                         )
    //                         : (
    //                           <div>
    //                             Durée inconnue
    //                           </div>
    //                         )
    //                     }
    //                   </div>
    //                 </div>
    //                 <div className="row">
    //                   <div className="col">
    //                     {this.state.selectedProject.type}
    //                   </div>
    //                   <div className="col">
    //                     {`n°${this.state.selectedProject.value.id}`}
    //                   </div>
    //                 </div>
    //                 <hr />
    //                 <div className={classes.Description}>
    //                   {description}
    //                 </div>
    //                 <hr />
    //                 <ButtonToPage
    //                   className={classes.btn_dark}
    //                   url={this.state.selectedProject.value.url}
    //                 >
    //                   Voir le projet
    //                 </ButtonToPage>
    //               </Fragment>
    //             )
    //             : (
    //               <div className={classes.Empty}>
    //                 {messages[this.props.language]['Entity.projects.empty.label']}
    //               </div>
    //             )
    //         }
    //       </div>
    //     </div>
    //   </Fragment>
    // );
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
