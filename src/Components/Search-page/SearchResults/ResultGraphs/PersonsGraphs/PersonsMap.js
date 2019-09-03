import React, { Component } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import { GridLoader } from 'react-spinners';

import classes from '../GraphCard.scss';
import transformRequest from '../../../../../Utils/transformRequest';
import LeafletMap from '../../../../Shared/GraphComponents/Graphs/LeafletMap';
import GraphTitles from '../../../../Shared/GraphComponents/Graphs/GraphTitles';

export default class PersonsMap extends Component {
  state = {
    data: [],
    isLoading: true,
    title: 'Cartographie',
    subtitle: 'des résultats de recheche',
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const url = 'https://scanr-preprod.sword-group.com/api/v2/persons/search/georesults';
    const request = { ...this.props.request };
    request.pageSize = 500;
    Axios.post(url, transformRequest(request))
      .then((response) => {
        const mapdata = [];
        if (response.data && response.data.results) {
          response.data.results.forEach((element) => {
            try {
              const affiliations = element.value.affiliations;
              affiliations.forEach((aff) => {
                try {
                  const dataElement = {
                    id: element.value.id + Math.floor(Math.random() * Math.floor(10000000)),
                    position: [aff.structure.address[0].gps.lat, aff.structure.address[0].gps.lon],
                    infos: [element.value.fullName, aff.structure.label.fr || aff.structure.label.en || ''],
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

  render() {
    const scanRcolor = '#3778bb';
    if (this.state.data !== [] && !this.state.isLoading) {
      return (
        <div className={`w-100 ${classes.graphCard}`}>
          <GraphTitles
            title={this.state.title}
            subtitle={this.state.subtitle}
          />
          <LeafletMap
            filename="carto"
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

PersonsMap.propTypes = {
  language: PropTypes.string.isRequired,
  request: PropTypes.object.isRequired,
};
