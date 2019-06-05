import React from 'react';
import {
  Map, Marker, TileLayer,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { yellowIcon } from './icons';

import CardsTitle from '../../../../../Shared/Ui/CardsTitle/CardsTitle';

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
const Localisation = (props) => {
  const messages = {
    fr: messagesFr,
    en: messagesEn,
  };

  if (!props.address) {
    return null;
  }

  const mapProps = { center: [props.address[0].gps.lat, props.address[0].gps.lon], zoom: 16 };

  return (
    <div className="col-6">
      <div className={classes.Localisation}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle title={messages[props.language]['Entity.portrait.localisation.title']} />
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
                <Marker
                  position={props.address[0].gps}
                  icon={yellowIcon}
                />
              </Map>
            </div>
            <div className={classes.AddressContainer}>
              <div className={classes.Title}>
                <i className="fas fa-map-marker" />
                Localisation
                <div className={classes.Address}>
                  {props.address[0].address}
                  <br />
                  {`${props.address[0].city} - ${props.address[0].country}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localisation;

Localisation.propTypes = {
  address: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
