import React, { Component } from 'react';
import {
  Map, Marker, TileLayer,
} from 'react-leaflet';
import PropTypes from 'prop-types';
// import { violetIcon } from './icons';

import CardsTitle from '../../../../Shared/Ui/CardsTitle/CardsTitle';

/* Gestion des langues */
// import messagesFr from './translations/fr.json';
// import messagesEn from './translations/en.json';

import classes from './Localisation.scss';

/**
 * Localisation
 * Url : /entite/<id>
 * Description : Affichage de la carte positionnant l'adresse
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
    // const messages = {
    //   fr: messagesFr,
    //   en: messagesEn,
    // };
    return (
      <div className={classes.Localisation}>
        {
        /*
        <CardsTitle title={messages[this.props.language]['Entity.portrait.localisation.title']} />
  <Map
  onClick={this.onMapClick}
  {...mapProps}
  >
  <TileLayer
  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
  url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
  />
  <Marker
  key={this.props.editedAddress.id}
  position={this.props.editedAddress.coordinates.coordinates}
  icon={violetIcon}
  />
  </Map>
}
*/
}
rien
      </div>
    );
  }
}

export default Localisation;

Localisation.propTypes = {
  address: PropTypes.object.isRequired,
  language: PropTypes.string.isRequired,
};
