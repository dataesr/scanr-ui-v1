import React, { Component } from 'react';
import {
  Map, Marker, TileLayer,
} from 'react-leaflet';
import PropTypes from 'prop-types';
import { yellowIcon } from './icons';

import getSelectKey from '../../../../../../../Utils/getSelectKey';

import SubmitBox from '../../../../../../Shared/SubmitBox/SubmitBox';
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
class Localisation extends Component {
  state = {
    modifyMode: false,
  }

  modifyModeHandle = () => {
    this.setState(prevState => ({ modifyMode: !prevState.modifyMode }));
  }

  render() {
    const messages = {
      fr: messagesFr,
      en: messagesEn,
    };

    // eslint-disable-next-line
    if (!this.props.address || (!this.props.address[0].address && !this.props.address[0].city || !this.props.address[0].country)) {
      return null;
    }

    let mapProps = {};
    if (this.props.address[0].gps && this.props.address[0].gps.lat && this.props.address[0].gps.lon) {
      mapProps = { center: [this.props.address[0].gps.lat, this.props.address[0].gps.lon], zoom: 16 };
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
                  <Marker
                    position={this.props.address[0].gps}
                    icon={yellowIcon}
                  />
                </Map>
              </div>
              <div className={classes.AddressContainer}>
                {(this.props.modifyMode) ? <SubmitBox language={this.props.language} masterKey={this.props.masterKey} label={getSelectKey(this.props.allData, 'label', this.props.language, 'fr')} /> : null}
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
  masterKey: PropTypes.string, // Utilisée pour le mode modifier/enrichir
  modifyMode: PropTypes.bool,
  allData: PropTypes.object.isRequired,
};
