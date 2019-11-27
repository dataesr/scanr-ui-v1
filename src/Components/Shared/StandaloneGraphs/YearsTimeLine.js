import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_BASE_URL } from '../../../config/config';

import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsLine from '../GraphComponents/Graphs/HighChartsLine';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

export default class ProductionYears extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      facet: {
        field: 'year',
        filters: {},
        min_doc_count: 1,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: 100,
      },
    },
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = `${API_BASE_URL}/${this.props.api}/search`;
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(url, transformRequest(request))
      .then((response) => {
        const newStateData = response.data.facets.find(item => item.id === 'facet') || { entries: [] };
        const newData = { entries: newStateData.entries.sort((a, b) => a.value - b.value) };
        newData.entries = newData.entries.filter(item => (item.value > this.props.filterLow) && (item.value < this.props.filterHigh));
        this.setState({ data: newData, isLoading: false });
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
            <HighChartsLine
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

ProductionYears.propTypes = {
  language: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  filterLow: PropTypes.number.isRequired,
  filterHigh: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
