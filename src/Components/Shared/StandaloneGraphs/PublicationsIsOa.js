import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsDonut from '../GraphComponents/Graphs/HighChartsDonut';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

export default class ProductionIsOa extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      facet: {
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
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(API_PUBLICATIONS_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        const newStateData = response.data.facets.find(item => item.id === 'facet') || { entries: [] };
        const data = { id: 'isOa', entries: [] };
        newStateData.entries.forEach((entry) => {
          if (entry.value === 'false') {
            data.entries.push({
              color: 'rgb(170, 170, 170)',
              value: (this.props.language === 'fr') ? 'Accès fermé' : 'Closed access',
              count: entry.count,
            });
          } else {
            data.entries.push({
              color: 'rgb(32, 225, 104)',
              value: (this.props.language === 'fr') ? 'Accès ouvert' : 'Open access',
              count: entry.count,
            });
          }
        });
        this.setState({ data, isLoading: false });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      {
        (this.state.data !== [] && !this.state.isLoading)
          ? (
            <HighChartsDonut
              filename="publication_is_oa_rate"
              data={this.state.data}
              language={this.props.language}
            />
          )
          : (<GraphSpinner />)
      }
    </div>
  );
}

ProductionIsOa.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
