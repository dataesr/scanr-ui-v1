import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsWordCloud from '../GraphComponents/Graphs/HighChartsWordCloud';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

export default class ProductionKeywords extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      facet_en: {
        field: 'keywords.en',
        filters: {},
        min_doc_count: 1,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: 50,
      },
      facet_fr: {
        field: 'keywords.fr',
        filters: {},
        min_doc_count: 1,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: 50,
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
        const newStateDataEn = response.data.facets.find(item => item.id === 'facet_en') || { entries: [] };
        const newStateDataFr = response.data.facets.find(item => item.id === 'facet_fr') || { entries: [] };
        const newStateData = { entries: newStateDataEn.entries.concat(newStateDataFr.entries) };
        this.setState({ data: newStateData, isLoading: false });
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
            <HighChartsWordCloud
              filename={this.props.title}
              data={this.state.data}
              language={this.props.language}
            />
          )
          : (<GraphSpinner />)
      }
    </div>
  );
}

ProductionKeywords.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
