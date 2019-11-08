import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { API_PUBLICATIONS_SEARCH_END_POINT, API_PUBLICATIONS_END_POINT } from '../../config/config';
import EmptySection from '../Shared/Results/EmptySection/EmptySection';
import PublicationCard from '../Search/SearchResults/ResultCards/PublicationCard';
import SectionTitle from '../Shared/Results/SectionTitle/SectionTitle';
import SunburstChart from '../Shared/GraphComponents/Graphs/HighChartsSunburst';
import BarChart from '../Shared/GraphComponents/Graphs/HighChartsBar';

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
    data: [],
    total: '',
    isOa: {},
    journals: {},
    years: {},
    types: {},
    modifyMode: false,
    graph: 'isOa',
  }

  componentDidMount() {
    this.getData();
  }

  changeGraphHandler = (nextGraph) => {
    this.setState({ graph: nextGraph });
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
    const filterKey = 'affiliations.id';
    const request = {
      pageSize: 50,
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
    request.filters[filterKey] = {
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
      console.log(response.data);
      this.setState(
        {
          data: response.data.results,
          total: response.data.total,
          journals: response.data.facets.find(item => item.id === 'journal'),
          years: response.data.facets.find(facet => facet.id === 'years'),
          domains: response.data.facets.find(facet => facet.id === 'domains'),
          types: response.data.facets.find(facet => facet.id === 'types'),
        },
      );
    });
  }

  // eslint-disable-next-line
  setSelectedProductionHandler = (selectedProduction) => {
    const url = `${API_PUBLICATIONS_END_POINT}/${selectedProduction.value.id.replace(new RegExp('/', 'g'), '%252f')}`;
    Axios.get(url).then((response) => {
      // eslint-disable-next-line
      this.setState({ selectedProduction: response.data });
      // eslint-disable-next-line
    }).catch(e => console.log('error:', e));
  };

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  renderViewList = (messages) => {
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
    return (
      <div className="row">
        <div className="col-md-4">
          {
            this.state.data.map(publi => (
              <PublicationCard
                data={publi.value}
                language={this.props.language}
              />
            ))
          }
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
                    {this.state.total || 0}
                    &nbsp;
                    {messages[this.props.language]['Productions.label']}
                  </span>
                </div>
              </div>
              <ul className="nav justify-content-center py-1">
                <li
                  className="btn btn-primary mx-1"
                  onClick={() => this.changeGraphHandler('isOa')}
                  onKeyPress={() => this.changeGraphHandler('isOa')}
                >
                  OpenAccess
                </li>
                <li
                  className="btn btn-primary mx-1"
                  onClick={() => this.changeGraphHandler('journals')}
                  onKeyPress={() => this.changeGraphHandler('journals')}
                >
                  Journals
                </li>
                <li
                  className="btn btn-primary mx-1"
                  onClick={() => this.changeGraphHandler('years')}
                  onKeyPress={() => this.changeGraphHandler('years')}
                >
                  Years
                </li>
                <li
                  className="btn btn-primary mx-1"
                  onClick={() => this.changeGraphHandler('types')}
                  onKeyPress={() => this.changeGraphHandler('types')}
                >
                  Types
                </li>
              </ul>

              {
                !this.state.data || this.state.data.length < 6
                  ? this.renderViewList(messages)
                  : this.renderViewGraph(dataGraph, messages)
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
  match: PropTypes.object.isRequired,
  productionType: PropTypes.string,
};
