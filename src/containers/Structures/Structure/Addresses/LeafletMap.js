import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as L from 'leaflet';
import PropTypes from 'prop-types';
import { greenIcon, blueIcon, greyIcon } from './Icons';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../UI/Button/Button';

const getIconColor = (status) => {
  switch (status) {
    case 'main':
      return greenIcon;
    case 'valid':
      return blueIcon;
    case 'old':
      return greyIcon;
    default:
      return blueIcon;
  }
};

class LeafletMap extends Component {
  state = {
    latlng: null,
    bounds: null,
  };
  // feature temporarly removed
  onClick = (event) => {
    this.setState({
      latlng: event.latlng,
    });
  }

  componentDidMount() {
    const markerArray = []
    this.props.displayedAddresses.map(address => markerArray.push(address.coordinates))
    const bounds = L.latLngBounds(markerArray);
    this.setState({ bounds })
  }

  renderMarker() {
    return this.props.displayedAddresses.map(address => (
      <Marker
        key={address.id}
        position={address.coordinates}
        icon={getIconColor(address.status)}
      >
        <Popup>
          <div>
            {`${address.geocoder_address.house_number} ${address.geocoder_address.street}`}
            <br />
            {`${address.geocoder_address.post_code}, ${address.geocoder_address.city}`}
            <br />
            {address.geocoder_address.country}
          </div>
        </Popup>
      </Marker>));
  }

  render() {
    let marker = null;
    let saveButton = null;
    // const marker = this.state.latlng ? (
    //   <Marker position={this.state.latlng}>
    //     <Popup>
    //       <span>Ajuster la géolocalisation ?</span>
    //     </Popup>
    //   </Marker>
    // ) : null;
    // let saveButton = null;
    // if (this.state.latlng) {
    //   saveButton = <Button>Corriger les coordonnées gps</Button>;
    // }

    return (
      <Aux>
        <Map
          onClick={this.onClick}
          bounds={this.state.bounds}
          boundsOptions={{ padding: [50, 50] }}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.renderMarker()}
          {marker}
        </Map>
        {saveButton}
      </Aux>
    );
  }
}

LeafletMap.propTypes = {
  displayedAddresses: PropTypes.array.isRequired,
};

export default LeafletMap;
