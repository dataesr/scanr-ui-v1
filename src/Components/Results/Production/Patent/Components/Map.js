import React from 'react';
import { Map, GeoJSON } from 'react-leaflet';

import worldGeoJSON from './custom.geo.json';
import styles from '../../../../../style.scss';
import classes from './Map.scss';
/**
 * Cartographie
 * Url : /cartographie<br/>
 * Description : Gestions de la carte<br/>
 * Responsive : . <br/>
 * Accessible : . <br/>
 * Tests unitaires : . <br/>.
*/
const Carto = () => (
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
          color: styles.scanrlightgreyColor,
          weight: 0.7,
          fillOpacity: 1,
        })}
      />
    </Map>
  </div>
);
export default Carto;
