import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_STRUCTURES_SEARCH_END_POINT } from '../../../config/config';
import HighChartsNetwork from '../GraphComponents/Graphs/HighChartsNetwork';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';

class EntityMap extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    /* eslint-disable-next-line */
    Axios.post(API_STRUCTURES_SEARCH_END_POINT, transformRequest(request))
      .then((response) => {
        const data = [];
        const networkNodes = [];
        const weights = [];
        if (response.data && response.data.results) {
          response.data.results.forEach((element) => {
            if (element.value.relations) {
              element.value.relations.forEach((r) => {
                if (r.structure.acronym && r.structure.acronym.fr) {
                  if (weights[r.structure.acronym.fr] === undefined) {
                    weights[r.structure.acronym.fr] = 0;
                  }
                  weights[r.structure.acronym.fr] += 1;
                }
              });
            }
          });
        }
        Object.keys(weights).forEach((w) => {
          networkNodes.push({
            id: w,
            color: '#f75f00',
            marker: {
              radius: 7 * Math.sqrt(weights[w]),
            },
          });
        });

        if (response.data && response.data.results) {
          response.data.results.forEach((element) => {
            const elementLabel = element.value.label.fr;
            networkNodes.push({
              id: elementLabel,
              color: '#43ab92',
              marker: {
                radius: 20,
              },
            });
            if (element.value.relations) {
              element.value.relations.forEach((r) => {
                try {
                  if (r.structure.acronym && r.structure.acronym.fr) {
                    data.push([elementLabel, r.structure.acronym.fr]);
                  }
                } catch (error) {
                  // eslint-disable-no-empty
                }
              });
            }
          });
        }
        this.setState({ data, networkNodes, isLoading: false });
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
            <HighChartsNetwork
              filename={this.props.title}
              data={this.state.data}
              nodes={this.state.networkNodes}
              language={this.props.language}
            />
          )
          : (<GraphSpinner />)
      }
    </div>
  );
}

export default EntityMap;

EntityMap.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
