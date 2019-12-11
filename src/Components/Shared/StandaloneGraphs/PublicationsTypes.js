import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import HighChartsBar from '../GraphComponents/Graphs/HighChartsBar';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';
import TypeMapping from './Utils/TypeMapping';

import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import { API_PUBLICATIONS_SEARCH_END_POINT } from '../../../config/config';

export default class ProductionTypes extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      facet: {
        field: 'type',
        filters: {},
        min_doc_count: 1,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: 20,
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
        const typesData = { id: 'types', entries: [] };
        newStateData.entries.forEach((entry) => {
          const type = { ...entry };
          if (TypeMapping[this.props.language][entry.value]) {
            type.value = TypeMapping[this.props.language][entry.value];
          } else {
            type.value = TypeMapping[this.props.language].standard;
          }
          typesData.entries.push(type);
        });
        this.setState({ data: typesData, isLoading: false });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render = () => (
    <div className={`w-100 ${classes.graphCard}`}>
      <GraphTitles
        language={this.props.language}
        lexicon={this.props.lexicon}
        title={this.props.title}
        subtitle={this.props.subtitle}
      />
      {
        (this.state.data !== [] && !this.state.isLoading)
          ? (
            <HighChartsBar
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

ProductionTypes.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  lexicon: PropTypes.string,
};
