import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GraphSpinner from '../../Shared/LoadingSpinners/GraphSpinner';
import classes from './GraphCard.scss';
import LeafletMap from '../../Shared/GraphComponents/Graphs/LeafletMap';
import GraphTitles from '../../Shared/GraphComponents/Graphs/GraphTitles';

class OpendataEntityMap extends Component {
  state = {
    data: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    /* eslint-disable-next-line */
    const opendata = require('../../Focus/Data/'.concat(`${this.props.opendata}`));
    const mapdata = [];
    opendata.records.forEach((element) => {
      try {
        const dataElement = {
          id: (element.fields.nom).concat(element.fields.prenom),
          position: [element.geometry.coordinates[1], element.geometry.coordinates[0]],
          infos: ['bla'],
        };
        mapdata.push(dataElement);
      } catch (error) {
      // eslint-disable-no-empty
      }
    });
    this.setState({ data: mapdata, isLoading: false });
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
          : (<GraphSpinner />)
      }
    </div>
  );
}

export default OpendataEntityMap;

OpendataEntityMap.propTypes = {
  language: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  opendata: PropTypes.string,
};