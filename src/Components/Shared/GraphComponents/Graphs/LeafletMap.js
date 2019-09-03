import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Map, TileLayer, Marker, withLeaflet, MapControl, Tooltip, ZoomControl,
} from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import PrintControlDefault from 'react-leaflet-easyprint';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import yellowIcon from './MarkerStyle';

import './customLeaflet.scss';

import classes from '../GraphComponents.scss';

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
          <Tooltip>{element.infos.map(info => (<div>{info}</div>))}</Tooltip>
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
    this.state = {
      lat: 46.5,
      lng: 2.618787,
      zoom: 5,
    };
  }

  print() {
    this.printControl.printMap('A4Portrait', 'MyFileName');
  }

  exportChartPng() {
    this.printControl.printMap('A4Portrait', this.props.filename);
  }

  render() {
    if (!this.props.data) {
      return (<p>Pas de données géographiques.</p>);
    }
    const position = [this.state.lat, this.state.lng];
    const markers = createMarkers(this.props.data);
    const downloadOptions = {
      position: 'bottomright',
      filename: this.props.filename,
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      title: 'Télécharger au format PNG',
      hideControlContainer: false,
      exportOnly: true,
    };

    const ShareComponent = () => (
      <div className={`d-flex flex-wrap pl-4 pr-4 p-3 ${classes.ShareComponent}`}>
        <div className="mr-auto d-flex align-items-center">
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 ${classes.ShareTexts}`}>Partager</span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-share-alt-square" />
            </button>
          </div>
          <div className="pr-1 d-flex align-items-center">
            <span className={`pr-2 pl-3 ${classes.ShareTexts}`}>Intégrer le code</span>
            <button type="button" className={classes.Button}>
              <i className="fas fa-code" />
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <div className={`pr-2 ${classes.ShareTexts}`}>Télécharger:</div>
          <div className="pr-1 d-flex align-items-center">
            <button type="button" onClick={this.exportChartPng} className={classes.Button}>
              <i className="fas fa-image" />
            </button>
            <span className={`pr-1 ${classes.ShareTexts}`}>.png</span>
          </div>
        </div>
      </div>
    );

    return (
      <div>
        <Map zoomControl={false} center={position} zoom={this.state.zoom} style={{ height: '40vh' }} minZoom={2} maxZoom={19}>
          <TileLayer
            attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <MarkerClusterGroup maxClusterRadius={20}>
            {markers}
          </MarkerClusterGroup>
          <ZoomControl position="bottomleft" />
          {/* <PrintControl ref={(ref) => { this.printControl = ref; }} {...printOptions} /> */}
          <PrintControl style={{ display: 'none' }} ref={(ref) => { this.printControl = ref; }} {...downloadOptions} />
          <GeoSearch />
        </Map>
        <ShareComponent />
      </div>
    );
  }
}

export default LeafletMap;

LeafletMap.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired,
};
