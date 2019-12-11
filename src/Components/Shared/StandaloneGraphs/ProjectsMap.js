import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import GraphSpinner from '../LoadingSpinners/GraphSpinner';
import { API_PROJECTS_GEORESULTS_END_POINT } from '../../../config/config';
import classes from './GraphCard.scss';
import transformRequest from '../../../Utils/transformRequest';
import LeafletMap from '../GraphComponents/Graphs/LeafletMap';
import GraphTitles from '../GraphComponents/Graphs/GraphTitles';

export default class ProjectsMap extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const request = { ...this.props.request };
    request.pageSize = 5000;
    Axios.post(API_PROJECTS_GEORESULTS_END_POINT, transformRequest(request))
      .then((response) => {
        const mapdata = [];
        if (response.data && response.data.results) {
          response.data.results.forEach((element) => {
            try {
              const participants = element.value.participants;
              participants.forEach((part) => {
                try {
                  const dataElement = {
                    id: element.value.id + Math.floor(Math.random() * Math.floor(10000000)),
                    position: [part.structure.address[0].gps.lat, part.structure.address[0].gps.lon],
                    infos: [element.value.label.en, part.structure.label.fr || part.structure.label.en || ''],
                  };
                  mapdata.push(dataElement);
                } catch (error) {
                  // eslint-disable-no-empty
                }
              });
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
        lexicon={this.props.lexicon}
        title={this.props.title}
        language={this.props.language}
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
          : (<GraphSpinner />)
      }
    </div>
  );
}

ProjectsMap.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
  lexicon: PropTypes.string,
};
