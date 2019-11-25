import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from '../GraphCard.scss';
import transformRequest from '../../../../../Utils/transformRequest';
import HighChartsDonut from '../../../../Shared/GraphComponents/Graphs/HighChartsDonut';
import GraphTitles from '../../../../Shared/GraphComponents/Graphs/GraphTitles';

export default class ProductionIsOa extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    title: 'Open Access',
    subtitle: 'basé sur les résultats de recherche',
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
    const url = 'https://scanr-preprod.sword-group.com/api/v2/publications/search';
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(url, transformRequest(request))
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

  render() {
    const scanRcolor = '#3778bb';
    if (this.state.data !== [] && !this.state.isLoading) {
      return (
        <div className={`w-100 ${classes.graphCard}`}>
          <GraphTitles
            title={this.state.title}
            subtitle={this.state.subtitle}
          />
          <HighChartsDonut
            filename="Taux accès ouvert"
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

ProductionIsOa.propTypes = {
  language: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
