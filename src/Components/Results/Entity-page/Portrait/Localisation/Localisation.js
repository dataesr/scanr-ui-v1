import React, { Component } from 'react';
import {
  Map, Marker, TileLayer,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { yellowIcon } from './icons';

import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';

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
class Localisation extends Component {
  state = {
    data: {},
  };

  componentDidMount() {
    console.log('componentDidMount()');
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    const mapProps = { center: [this.props.address[0].gps.lat, this.props.address[0].gps.lon], zoom: 16 };

    return (
      <div className={classes.Localisation}>
        <CardsTitle title={messages[this.props.language]['Entity.portrait.localisation.title']} />

        <div className={classes.MapContainer}>
          <Map
            className={classes.Map}
            {...mapProps}
          >
            <TileLayer
              attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
            />
            <Marker
              position={this.props.address[0].gps}
              icon={yellowIcon}
            />
          </Map>
        </div>
        <div className={classes.AddressContainer}>
          <div className={classes.Title}>
            <i className="fas fa-map-marker" />
            Localisation
            <div className={classes.Address}>
              {this.props.address[0].address}
              <br />
              {`${this.props.address[0].city} - ${this.props.address[0].country}`}
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
  language: PropTypes.string.isRequired,
};
