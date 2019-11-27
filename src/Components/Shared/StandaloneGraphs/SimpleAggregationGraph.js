import React, { Component } from 'react';
import Axios from 'axios';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_BASE_URL } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

const AvailableGraphs = {
  HighChartsDonut: loadable(() => import('../GraphComponents/Graphs/HighChartsDonut')),
  HighChartsBar: loadable(() => import('../GraphComponents/Graphs/HighChartsBar')),
  HighChartsTreemap: loadable(() => import('../GraphComponents/Graphs/HighChartsTreemap')),
  HighChartsWordCloud: loadable(() => import('../GraphComponents/Graphs/HighChartsWordCloud')),
  HighChartsTimeline: loadable(() => import('../GraphComponents/Graphs/HighChartsTimeline')),
};

export default class SimpleAggregationGraph extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      facet: {
        field: this.props.aggField,
        filters: {},
        min_doc_count: 1,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: this.props.aggSize,
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
        this.setState({ data: newStateData, isLoading: false });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render = () => {
    const Graph = AvailableGraphs[this.props.graphType];
    return (
      <div className={`w-100 ${classes.graphCard}`}>
        <GraphTitles
          title={this.props.title}
          subtitle={this.props.subtitle}
        />
        {
          (this.state.data !== [] && !this.state.isLoading)
            ? (
              <Graph
                filename={this.props.filename ? this.props.filename : 'scanr_export'}
                data={this.state.data}
                language={this.props.language}
              />
            )
            : (<GraphSpinner />)
        }
      </div>
    );
  }
}

SimpleAggregationGraph.propTypes = {
  language: PropTypes.string.isRequired,
  filename: PropTypes.string.isRequired,
  graphType: PropTypes.string.isRequired,
  aggField: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  aggSize: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
