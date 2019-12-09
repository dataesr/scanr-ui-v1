import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GeoJSON } from 'react-leaflet';

import worldGeoJSON from './custom.geo.json';
import styles from '../../../../../style.scss';

import classes from './Carto.scss';
/**
 * Cartographie
 * Url : /cartographie<br/>
 * Description : Gestions de la carte<br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/


class Carto extends Component {
  onEachFeature = (feature: Object, layer: Object) => {
    const popupContent = ` <Popup>${feature.properties.name}</Popup>`;
    layer.bindPopup(popupContent);
    if (this.props.data.find(el => (el.country === feature.properties.iso_a2))) {
      layer.setStyle({ fillColor: styles.productionbrevetsColor });
    }
  };

  render() {
    return (
      <div>
        <Map
          className={classes.MapBox}
          center={[35, 5]}
          zoom={2}
          minZoom={2}
          zoomControl={false}
          maxZoom={7}
          attributionControl
          doubleClickZoom={false}
          scrollWheelZoom={false}
          dragging
          animate
          maxBounds={[[85, -180], [-85, 180]]}
          easeLinearity={0.35}
          style={{
            height: '60vh',
            color: 'black',
            backgroundColor: '#fff',
          }}
        >
          <GeoJSON
            data={worldGeoJSON}
            style={() => ({
              color: styles.scanrmiddlegreyColor,
              weight: 0.7,
              fillOpacity: 1,
            })}
            onEachFeature={this.onEachFeature}
          />
        </Map>
      </div>
    );
  }
}

export default Carto;

Carto.propTypes = {
  data: PropTypes.array.isRequired,
};
