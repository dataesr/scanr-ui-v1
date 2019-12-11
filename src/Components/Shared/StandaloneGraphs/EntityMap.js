import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_STRUCTURES_GEORESULTS_END_POINT } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import LeafletMap from '../GraphComponents/Graphs/LeafletMap';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

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
    Axios.post(API_STRUCTURES_GEORESULTS_END_POINT, transformRequest(request))
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
        language={this.props.language}
        lexicon={this.props.lexicon}
        subtitle={this.props.subtitle}
      />
      {
        (this.state.data !== [] && !this.state.isLoading)
          ? (
            <LeafletMap
              filename={this.props.title}
              data={this.state.data}
              style={this.props.style}
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
  style: PropTypes.object,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  lexicon: PropTypes.string,
};
