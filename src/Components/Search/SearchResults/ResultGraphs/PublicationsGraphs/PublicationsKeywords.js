import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from '../GraphCard.scss';
import transformRequest from '../../../../../Utils/transformRequest';
import HighChartsWordCloud from '../../../../Shared/GraphComponents/Graphs/HighChartsWordCloud';
import GraphTitles from '../../../../Shared/GraphComponents/Graphs/GraphTitles';

export default class ProductionKeywords extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    title: 'Principaux mots-clés',
    subtitle: 'basé sur les résultats de recherche',
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
    const url = 'https://scanr-preprod.sword-group.com/api/v2/publications/search';
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(url, transformRequest(request))
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

  render() {
    const scanRcolor = '#3778bb';
    if (this.state.data !== [] && !this.state.isLoading) {
      return (
        <div className={`w-100 ${classes.graphCard}`}>
          <GraphTitles
            title={this.state.title}
            subtitle={this.state.subtitle}
          />
          <HighChartsWordCloud
            filename="Mot-clé des publications"
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

ProductionKeywords.propTypes = {
  language: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
