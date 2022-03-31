import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map, TileLayer, Marker, withLeaflet, MapControl, Tooltip, ZoomControl,
} from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import PrintControlDefault from 'react-leaflet-easyprint';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import ReactPiwik from 'react-piwik';
import yellowIcon from './MarkerStyle';

import './customLeaflet.scss';

import classes from '../GraphComponents.scss';

/* Gestion des langues */
import messagesFr from './translations/fr.json';
import messagesEn from './translations/en.json';

const messages = {
  fr: messagesFr,
  en: messagesEn,
};

const PrintControl = withLeaflet(PrintControlDefault);

class Search extends MapControl {
  // eslint-disable-next-line
  createLeafletElement() {
    return GeoSearchControl({
      autoClose: true,
      searchLabel: 'Ex : pays, villes, CP...',
      position: 'topright',
      provider: new OpenStreetMapProvider(),
    });
  }
}

const GeoSearch = withLeaflet(Search);
type State = {
  lat: number,
  lng: number,
  zoom: number,
}

const createMarkers = (pos) => {
  const markers = [];
  pos.forEach((element) => {
    try {
      markers.push(
        <Marker icon={yellowIcon} position={element.position} key={element.id}>
          <Tooltip>{element.infos.map(info => (<div key={JSON.stringify(element)}>{info}</div>))}</Tooltip>
        </Marker>,
      );
    } catch (error) {
      // eslint-disable-no-empty
    }
  });
  return markers;
};

// export default class SimpleExample extends Component<{}, State> {
class LeafletMap extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.print = this.print.bind(this);
    this.exportChartPng = this.exportChartPng.bind(this);
  }

  getBounds() {
    const bounds = [];
    this.props.data.forEach((el) => {
      bounds.push([el.position[0], el.position[1]]);
    });

    return bounds;
  }

  exportChartPng() {
    ReactPiwik.push(['trackEvent', 'Download', 'PNG_'.concat(this.props.filename)]);
    this.printControl.printMap('A4Portrait', this.props.filename);
  }

  print() {
    this.printControl.printMap('A4Portrait', 'MyFileName');
  }

  render() {
    if (!this.props.data) {
      return (<p>Pas de données géographiques.</p>);
    }
    const mapStyle = this.props.style || { height: '40vh' };
    const position = [this.props.lat, this.props.lng];
    const markers = createMarkers(this.props.data);
    const downloadOptions = {
      position: 'bottomright',
      filename: this.props.filename,
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      title: 'Télécharger au format PNG',
      hideControlContainer: false,
      exportOnly: true,
    };

    const ShareComponent = () => {
      if (this.props.share) {
        return (
          <div className={`d-flex flex-wrap pl-4 pr-4 p-3 ${classes.ShareComponent}`}>
            <div className="mr-auto d-flex align-items-center">
              <div className="pr-1 d-flex align-items-center">
                <span className={`pr-2 ${classes.ShareTexts}`}>
                  {messages[this.props.language].share}
                </span>
                <button type="button" className={classes.Button}>
                  <i className="fas fa-share-alt-square" />
                </button>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className={`pr-2 ${classes.ShareTexts}`}>
                {messages[this.props.language].download}
              </div>
              <div className="pr-1 d-flex align-items-center">
                <button type="button" onClick={this.exportChartPng} className={classes.Button}>
                  <i className="fas fa-image" title="export PNG" />
                </button>
              </div>
            </div>
          </div>
        );
      }
      return null;
    };

    return (
      <div className="w-100">
        <Map
          zoomControl={false}
          center={position}
          zoom={this.props.zoom}
          style={mapStyle}
          minZoom={2}
          maxZoom={19}
          bounds={this.getBounds()}
        >
          <TileLayer
            attribution="<a href='https://www.jawg.io' target='_blank'>&copy; Jawg</a> | <a href='https://www.openstreetmap.org' target='_blank'>&copy; OpenStreetMap</a>&nbsp;contributors"
            url="https://tile.jawg.io/jawg-sunny/{z}/{x}/{y}.png?access-token=5V4ER9yrsLxoHQrAGQuYNu4yWqXNqKAM6iaX5D1LGpRNTBxvQL3enWXpxMQqTrY8"
          />
          <MarkerClusterGroup maxClusterRadius={20}>
            {markers}
          </MarkerClusterGroup>
          <ZoomControl position="bottomleft" />
          <PrintControl style={{ display: 'none' }} ref={(ref) => { this.printControl = ref; }} {...downloadOptions} />
          <GeoSearch />
        </Map>
        <ShareComponent />
      </div>
    );
  }
}

export default LeafletMap;

LeafletMap.defaultProps = {
  share: true,
  lat: 46.5,
  lng: 2.618787,
  zoom: 5,
};

LeafletMap.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired,
  style: PropTypes.object,
  share: PropTypes.bool,
  lat: PropTypes.number,
  lng: PropTypes.number,
  zoom: PropTypes.number,
};
