import React, { Component } from 'react';
import {
  Map, Marker, Popup, TileLayer,
} from 'react-leaflet';
import * as L from 'leaflet';
import PropTypes from 'prop-types';
import {
  greenIcon, blueIcon, greyIcon, violetIcon,
} from './Icons';
import Aux from '../../../../hoc/Aux';
import Button from '../../../../UI/Button/Button';
import InfoMessage from '../../../../UI/Messages/InfoMessage';

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

  componentDidMount() {
    const markerArray = [];
    this.props.displayedAddresses.map(address => markerArray.push(address.coordinates));
    const bounds = L.latLngBounds(markerArray);
    this.setState({ bounds });
  }

  onMapClick = (event) => {
    console.log(event);
    if (this.props.editedAddress) {
      this.setState({
        latlng: event.latlng,
      });
    }
  }

  onSaveButtonClick = () => {
    const updatedAddress = [...this.props.editedAddress];
    updatedAddress.coordinates = this.state.latlng;
    this.props.editAddress(updatedAddress);
  }

  renderMarker() {
    if (this.props.editedAddress && this.props.editedAddress.geocoded) {
      const { editedAddress } = this.props;
      return (
        <Marker
          key={editedAddress.id}
          position={editedAddress.coordinates}
          icon={violetIcon}
        >
          <Popup>
            <div>
              {`${editedAddress.geocoder_address.house_number} ${editedAddress.geocoder_address.street}`}
              <br />
              {`${editedAddress.geocoder_address.post_code}, ${editedAddress.geocoder_address.city}`}
              <br />
              {editedAddress.geocoder_address.country}
            </div>
          </Popup>
        </Marker>);
    }
    return this.props.displayedAddresses.map((address) => {
      if (address.geocoded) {
        let colorIcon = getIconColor(address.status);
        if (this.props.hoveredAddress === address.id) {
          colorIcon = violetIcon;
        }
        return (
          <Marker
            key={address.id}
            position={address.coordinates}
            icon={colorIcon}
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
          </Marker>);
      }
      return null;
    });
  }

  render() {
    let mapProps = { bounds: this.state.bounds, boundsOptions: { padding: [50, 50] } };
    let message = null;
    if (this.props.editedAddress || this.props.displayedAddresses.length === 1) {
      const displayedAddress = this.props.editedAddress || this.props.displayedAddresses[0];
      mapProps = {
        center: displayedAddress.coordinates || [48.853932, 2.333101],
        zoom: displayedAddress.geocoded ? 16 : 5,
      };
      if (!displayedAddress.geocoded) {
        message = 'Aucune géolocalisation disponible pour cette adresse, cliquer sur la carte pour en ajouter une';
      }
    }

    let updatePositionMarker = null;
    let saveButton = null;
    if (this.state.latlng) {
      updatePositionMarker = (
        <Marker position={this.state.latlng}>
          <Popup>
            <span>Ajuster la géolocalisation ?</span>
          </Popup>
        </Marker>);
      saveButton = <Button onClick={this.onSaveButtonClick}>Corriger les coordonnées gps</Button>;
    }

    return (
      <Aux>
        <InfoMessage>{message}</InfoMessage>
        <Map
          onClick={this.props.editedAddress ? this.onMapClick : null}
          {...mapProps}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
          />
          {this.renderMarker()}
          {updatePositionMarker}
        </Map>
        {saveButton}
      </Aux>
    );
  }
}

LeafletMap.propTypes = {
  displayedAddresses: PropTypes.array.isRequired,
  editAddress: PropTypes.func.isRequired,
  editedAddress: PropTypes.object,
  hoveredAddress: PropTypes.string,
};

export default LeafletMap;
