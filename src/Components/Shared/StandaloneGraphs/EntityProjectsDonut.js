import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';
import { API_STRUCTURES_SEARCH_END_POINT } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import HighChartsDonut from '../GraphComponents/Graphs/HighChartsDonut';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

export default class EntityProjects extends Component {
  state = {
    data: { entries: [] },
    isLoading: true,
    aggregations: {
      projectTypes: {
        field: 'projects.project.type',
        filters: {},
        min_doc_count: 0,
        order: {
          direction: 'DESC',
          type: 'COUNT',
        },
        size: 1000,
      },
    },
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    const missingText = (this.props.language === 'fr') ? 'Aucun financement' : 'No support';
    request.aggregations = this.state.aggregations;
    Axios.post(API_STRUCTURES_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        const newStateData = response.data.facets.find(item => item.id === 'projectTypes') || { entries: [] };
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const hasValue = newStateData.entries.map(facet => (facet.count)).reduce(reducer);
        if (hasValue !== response.data.total) {
          newStateData.entries.push({ count: (response.data.total - hasValue), value: missingText });
        }
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
          <HighChartsDonut
            filename="Type de projets auxquels ont participé les structures"
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

EntityProjects.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
