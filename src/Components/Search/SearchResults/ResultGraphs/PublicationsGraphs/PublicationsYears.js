import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from '../GraphCard.scss';
import transformRequest from '../../../../../Utils/transformRequest';
import HighChartsLine from '../../../../Shared/GraphComponents/Graphs/HighChartsLine';
import GraphTitles from '../../../../Shared/GraphComponents/Graphs/GraphTitles';

export default class ProductionYears extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    title: 'Publications par années depuis 2013',
    subtitle: 'basé sur les résultats de recherche',
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
    const url = 'https://scanr-preprod.sword-group.com/api/v2/publications/search';
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(url, transformRequest(request))
      .then((response) => {
        const newStateData = response.data.facets.find(item => item.id === 'facet') || { entries: [] };
        const newData = { entries: newStateData.entries.sort((a, b) => a.value - b.value) };
        newData.entries = newData.entries.filter(item => (item.value > '2012') && (item.value < '2024'));
        this.setState({ data: newData, isLoading: false });
      })
      .catch((error) => {
        /* eslint-disable-next-line */
        console.log(error);
      });
  }

  render() {
    const scanRcolor = '#3778bb';
    if (this.state.data !== [] && !this.state.isLoading) {
      return (
        <div className={`w-100 ${classes.graphCard}`}>
          <GraphTitles
            title={this.state.title}
            subtitle={this.state.subtitle}
          />
          <HighChartsLine
            filename="publicationsYear"
            data={this.state.data}
            language={this.props.language}
          />
        </div>
      );
    }
    return (
      <div className={`w-100 ${classes.graphCard}`}>
        <GraphTitles
          title={this.state.title}
          subtitle={this.state.subtitle}
        />
        <div className="row justify-content-center p-4">
          <GridLoader
            color={scanRcolor}
            loading={this.state.isLoading}
          />
        </div>
      </div>
    );
  }
}

ProductionYears.propTypes = {
  language: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
