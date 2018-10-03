import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import { redIcon } from './Icons';

import Aux from '../../../../hoc/Aux';
import Button from '../../../../UI/Button/Button';

class LeafletMap extends Component {
  state = {
    zoom: 16,
    latlng: null,
  };

  onClick = (event) => {
    this.setState({
      latlng: event.latlng,
    });
  }

  render() {

    const marker = this.state.latlng ? (
      <Marker position={this.state.latlng}>
        <Popup>
          <span>Ajuster la géolocalisation ?</span>
        </Popup>
      </Marker>
    ) : null;
    const position = [this.props.latitude, this.props.longitude];
    let saveButton = null;
    if (this.state.latlng) {
      saveButton = <Button>Corriger les coordonnées gps</Button>;
    }
    return (
      <Aux>
        <Map
          center={position}
          zoom={this.state.zoom}
          onClick={this.onClick}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            icon={redIcon}
          >
            <Popup>
              <div>
                {this.props.formattedAddress}
              </div>
            </Popup>
          </Marker>
          {marker}
        </Map>
        {saveButton}
      </Aux>
    );
  }
}

LeafletMap.propTypes = {
  formattedAddress: PropTypes.object.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
}

export default LeafletMap;
