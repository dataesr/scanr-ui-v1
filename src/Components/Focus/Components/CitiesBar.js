import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsBar from '../../Shared/GraphComponents/Graphs/HighChartsBar';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

const addressLocationPerApi = {
  structures: 'address.urbanUnitLabel',
  persons: 'affiliations.structure.address.urbanUnitLabel',
  publications: 'affiliations.address.urbanUnitLabel',
  projects: 'participants.structure.address.urbanUnitLabel',
};

export default class CitiesBar extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      cities: {
        field: addressLocationPerApi[this.props.api],
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
    const url = `https://scanr-preprod.sword-group.com/api/v2/${this.props.api}/search`;
    const request = { ...this.props.request };
    request.aggregations = this.state.aggregations;
    Axios.post(url, transformRequest(request))
      .then((response) => {
        const newStateData = response.data.facets.find(item => item.id === 'cities') || { entries: [] };
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
            title={this.props.title}
            subtitle={this.props.subtitle}
          />
          <HighChartsBar
            filename="Top 10 des villes"
            data={this.state.data}
            language={this.props.language}
          />
        </div>
      );
    }
    return (
      <div className={`w-100 ${classes.graphCard}`}>
        <GraphTitles
          title={this.props.title}
          subtitle={this.props.subtitle}
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

CitiesBar.propTypes = {
  language: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
