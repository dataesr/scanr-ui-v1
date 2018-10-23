import React, { Component } from 'react';
import {
  Map, Marker, Popup, TileLayer,
} from 'react-leaflet';
import * as L from 'leaflet';
import PropTypes from 'prop-types';
import {
  greenIcon, blueIcon, greyIcon, violetIcon,
} from './Icons';
import { STATUS_MAIN, STATUS_ACTIVE, STATUS_OLD } from '../../../../../../config/config';
import Aux from '../../../../../../hoc/Aux';
import Button from '../../../../../../UI/Button/Button';
import InfoMessage from '../../../../../../UI/Messages/InfoMessage';

const getIconColor = (status) => {
  switch (status) {
    case STATUS_MAIN:
      return greenIcon;
    case STATUS_ACTIVE:
      return blueIcon;
    case STATUS_OLD:
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
    this.setBounds();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.displayedAddresses.length !== this.props.displayedAddresses.length) {
      this.setBounds();
    }
  }

  setBounds() {
    const markers = this.props.displayedAddresses.reduce((markerArray, address) => {
      if (address.geocoded) {
        const { coordinates } = address.coordinates;
        const alreadyMarked = markerArray.find(marker => marker[0] === coordinates[0] && marker[1] === coordinates[1]);
        if (!alreadyMarked) {
          markerArray.push(address.coordinates.coordinates);
        }
      }
      return markerArray;
    }, []);
    const bounds = L.latLngBounds(markers);
    if (markers.length > 1) {
      this.setState({ bounds });
    }
  }

  onMapClick = (event) => {
    if (this.props.editedAddress) {
      this.setState({
        latlng: [event.latlng.lat, event.latlng.lng],
      });
    }
  }

  onSaveButtonClick = () => {
    const updatedAddress = { ...this.props.editedAddress };
    updatedAddress.coordinates = {
      coordinates: this.state.latlng,
      type: 'Point',
    };
    this.props.editAddress(updatedAddress);
  }

  renderMarker() {
    if (this.props.editedAddress && this.props.editedAddress.geocoded) {
      return (
        <Marker
          key={this.props.editedAddress.id}
          position={this.props.editedAddress.coordinates.coordinates}
          icon={violetIcon}
        />);
    }
    return this.props.displayedAddresses.map((address) => {
      if (address.geocoded) {
        let colorIcon = getIconColor(address.status);
        if (this.props.hoveredAddress === address.meta.id) {
          colorIcon = violetIcon;
        }
        return (
          <Marker
            key={address.meta.id}
            position={address.coordinates.coordinates}
            icon={colorIcon}
          >
            <Popup>
              <div>
                {`${address.housenumber} ${address.street}`}
                <br />
                {`${address.postcode}, ${address.city}`}
                <br />
                {address.country}
              </div>
            </Popup>
          </Marker>);
      }
      return null;
    });
  }

  render() {
    let mapProps = { center: [48.853932, 2.333101], zoom: 5 };
    let message = null;

    if (this.state.bounds) {
      mapProps = { bounds: this.state.bounds, boundsOptions: { padding: [50, 50] } };
    }
    if (this.props.editedAddress) {
      if (this.props.editedAddress.geocoded) {
        mapProps = {
          center: this.props.editedAddress.coordinates.coordinates,
          zoom: 16,
        };
        message = 'Cliquer sur la carte pour ajuster la géolocalisation';
      } else {
        message = 'Aucune géolocalisation disponible pour cette adresse, cliquer sur la carte pour en ajouter une';
      }
    }
    if (this.props.displayedAddresses.length === 1) {
      const [displayedAddress] = this.props.displayedAddresses;
      mapProps = {
        center: displayedAddress.geocoded ? displayedAddress.coordinates.coordinates : [48.853932, 2.333101],
        zoom: displayedAddress.geocoded ? 16 : 5,
      };
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
        {saveButton}
        <Map
          onClick={this.onMapClick}
          {...mapProps}
        >
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
          />
          {this.renderMarker()}
          {updatePositionMarker}
        </Map>
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
