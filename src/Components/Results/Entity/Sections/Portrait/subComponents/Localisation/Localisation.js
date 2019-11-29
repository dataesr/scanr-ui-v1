import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map, Marker, TileLayer, Tooltip,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { yellowIcon, greenIcon } from './icons';


import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

import classes from './Localisation.scss';

/**
 * Localisation
 * Url : /entite/<id>
 * Description : Affichage du bloc localisation. carte positionnant l'adresse + adresse en dessous
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const messages = {
  fr: messagesFr,
  en: messagesEn,
};

class Localisation extends Component {
  state = {
    showEntityAround: false,
  }

  switchShowAround = () => {
    this.setState(prevState => ({ showEntityAround: !prevState.showEntityAround }));
  }

  createMarkers = () => {
    const markers = [];
    this.props.geoNear.forEach((element) => {
      try {
        markers.push(
          <Marker icon={greenIcon} position={element.address[0].gps} key={element.id}>
            <Tooltip>{element.label.fr}</Tooltip>
          </Marker>,
        );
      } catch (error) {
        // eslint-disable-no-empty
      }
    });
    markers.push(
      <Marker position={this.props.address[0].gps} icon={yellowIcon} key="1" />,
    );
    return markers;
  };

  render() {
    // eslint-disable-next-line
    if (!this.props.address || (!this.props.address[0].address && !this.props.address[0].city || !this.props.address[0].country)) {
      return null;
    }

    let mapProps = {};
    if (this.props.address[0].gps && this.props.address[0].gps.lat && this.props.address[0].gps.lon) {
      mapProps = { maxZoom: 17, center: [this.props.address[0].gps.lat, this.props.address[0].gps.lon], zoom: 14 };
    }
    let markers = null;
    if (this.props.geoNear) {
      markers = this.createMarkers();
    }

    return (
      <div className="col-md-6">
        <div className={classes.Localisation}>
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={messages[this.props.language]['Entity.portrait.localisation.title']} />
            </div>
          </div>
          <div className="row">
            <div className={`col-lg ${classes.NoSpace}`}>
              <div className={classes.MapContainer}>
                <Map
                  className={classes.Map}
                  {...mapProps}
                >
                  <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                  />
                  {
                    (this.state.showEntityAround && markers)
                      ? (
                        <MarkerClusterGroup maxClusterRadius={20}>
                          {markers}
                        </MarkerClusterGroup>
                      )
                      : (
                        <Marker
                          position={this.props.address[0].gps}
                          icon={yellowIcon}
                        />
                      )
                  }
                </Map>
              </div>
              <div className={classes.AddressContainer}>
                <div className={classes.Title}>
                  <div className="d-flex align-items-center">
                    <div>
                      <i className="fas fa-map-marker" />
                      Localisation
                    </div>
                    <div className="px-2 ml-auto">
                      {
                        (this.props.geoNear)
                          ? (
                            <button
                              className={`btn ${classes.btn_scanrBlue} ${classes.ButtonRectangle}`}
                              type="button"
                              onClick={this.switchShowAround}
                            >
                              Entités à proximité
                            </button>
                          )
                          : null
                      }
                    </div>
                  </div>
                  <div className={classes.Address}>
                    {this.props.address[0].address}
                    <br />
                    {`${this.props.address[0].city} - ${this.props.address[0].country}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Localisation;

Localisation.propTypes = {
  address: PropTypes.object.isRequired,
  geoNear: PropTypes.array,
  language: PropTypes.string.isRequired,
};
