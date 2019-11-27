import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import LeafletMap from '../../Shared/GraphComponents/Graphs/LeafletMap';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

class EntityMap extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = 'https://scanr-preprod.sword-group.com/api/v2/structures/search/georesults';
    const request = { ...this.props.request };
    Axios.post(url, transformRequest(request))
      .then((response) => {
        const mapdata = [];
        if (response.data && response.data.results) {
          response.data.results.forEach((element) => {
            try {
              const dataElement = {
                id: element.value.id,
                position: [element.value.address[0].gps.lat, element.value.address[0].gps.lon],
                infos: [element.value.label.fr || element.value.label.en || ''],
              };
              mapdata.push(dataElement);
            } catch (error) {
              // eslint-disable-no-empty
            }
          });
        }
        this.setState({ data: mapdata, isLoading: false });
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
            <LeafletMap
              filename="Localisations des structures"
              data={this.state.data}
              language={this.props.language}
            />
          )
          : (
            <div className="row justify-content-center p-4">
              <GridLoader
                color="#3778bb"
                loading={this.state.isLoading}
              />
            </div>
          )
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
