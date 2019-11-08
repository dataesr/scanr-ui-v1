import React, { Component, Fragment } from 'react';
import { IntlProvider } from 'react-intl';
import PropTypes from 'prop-types';
import Axios from 'axios';

import { API_PUBLICATIONS_SEARCH_END_POINT, API_PUBLICATIONS_END_POINT } from '../../config/config';
import SunburstChart from '../Shared/GraphComponents/Graphs/HighChartsSunburst';
import BarChart from '../Shared/GraphComponents/Graphs/HighChartsBar';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './WorldCloud.scss';

/**
 * WorldCloud
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
class WorldCloud extends Component {
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


  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };


    return (
      <Fragment>
        <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
          <section className={`container-fluid ${classes.WorldCloud}`}>
            <div className="container">
              <div className={classes.SectionTitle}>
                <div className="d-flex flex-wrap align-items-center">
                  <i className="fas fa-folder-open" />
                  <span className={`mr-auto my-2 ${classes.Label}`}>
                    {this.state.total || 0}
                    &nbsp;
                    {messages[this.props.language]['WorldCloud.label']}
                  </span>
                </div>
              </div>
              <p>Hello World</p>
            </div>
          </section>
        </IntlProvider>
      </Fragment>
    );
  }
}

export default WorldCloud;

WorldCloud.propTypes = {
  language: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  productionType: PropTypes.string,
};
