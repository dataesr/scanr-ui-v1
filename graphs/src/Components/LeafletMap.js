import React, { Component } from 'react';
import { Map, TileLayer, Marker, withLeaflet, MapControl, Tooltip, ZoomControl } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import PrintControlDefault from 'react-leaflet-easyprint';
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { yellowIcon } from './MarkerStyle'

import './markers.css'

const PrintControl = withLeaflet(PrintControlDefault);

var cities = require('./data/cities.json');
var data = [];
cities.forEach(element => {
  var tmp = [];
  tmp.push(element.gps_lat);
  tmp.push(element.gps_lng);
  data.push(tmp);
});

// var cities = require('./data/fr.json');
// var data = [];
// cities.forEach(element => {
//   var tmp = [];
//   tmp.push(element.lat);
//   tmp.push(element.lng);
//   data.push(tmp);
// });

class Search extends MapControl {

  createLeafletElement() {
    return GeoSearchControl({
      //style: 'button',
      autoClose: true,
      searchLabel: 'Ex : pays, villes, CP...',
      //keepResult: false,
      position: 'topright',
      provider: new OpenStreetMapProvider()
    })
  }
}

const GeoSearch = withLeaflet(Search)

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class SimpleExample extends Component<{}, State> {

  constructor() {
    super();
    this.print = this.print.bind(this);
  }

  print() {
    this.printControl.printMap('A4Portrait', 'MyFileName');
  }

  // state = {
  //   lat: 47,
  //   lng: 2,
  //   zoom: 5,
  // }

  state = {
    lat: 47.824905,
    lng: 2.618787,
    zoom: 5,
  }

  createMarkers = () => {
    let markers = []
    for (let i = 0; i < data.length; i++) {
      markers.push(<Marker icon={yellowIcon} position={data[i]}><Tooltip>{cities[i].name + ', ' + cities[i].zip_code}</Tooltip></Marker>)
    }
    return markers
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const printOptions = {
      position: 'topleft',
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      hideControlContainer: false
    };
    const downloadOptions = {
      position: 'bottomright',
      filename: 'wesh_le_gang',
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      title: 'Télécharger au format PNG',
      // hideControlContainer: false,
      exportOnly: true
    };
    return (
      <div>
        <div style={{ display: 'inline-block' }}>
          <Map zoomControl={false} center={position} zoom={this.state.zoom} style={{ height: "60vh", width: "33vw", borderStyle: 'solid' }} minZoom={2} maxZoom={19}>
            <TileLayer
              // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {/* <MarkerClusterGroup maxClusterRadius={90} >
              {this.createMarkers()}
            </MarkerClusterGroup> */}
            <ZoomControl position={'bottomleft'} />
            <PrintControl ref={(ref) => { this.printControl = ref; }} {...printOptions} />
            <PrintControl ref={(ref) => { this.printControl = ref; }} {...downloadOptions} />
            <GeoSearch />
          </Map>
        </div>
        <div style={{ display: 'inline-block' }}>
          <Map zoomControl={false} center={[15.30174, -61.38808]} zoom={7} style={{ height: "30vh", width: "16vw", borderStyle: 'solid', top: '-30vh' }} minZoom={2} maxZoom={19}>
            <TileLayer
              // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {/* <MarkerClusterGroup maxClusterRadius={90} >
                  {this.createMarkers()}
                </MarkerClusterGroup> */}
            <ZoomControl position={'bottomleft'} />
            {/* <GeoSearch /> */}
          </Map>
          {/* <div class="row"> */}
        </div>
        <div style={{ display: 'inline-block' }}>
          <Map zoomControl={false} center={[4, -53]} zoom={6} style={{ height: "30vh", width: "16vw", marginTop: '20px', borderStyle: 'solid', left: '-16vw' }} minZoom={2} maxZoom={19}>
            <TileLayer
              // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {/* <MarkerClusterGroup maxClusterRadius={90} >
                  {this.createMarkers()}
                </MarkerClusterGroup> */}
            <ZoomControl position={'bottomleft'} />
            {/* <GeoSearch /> */}
          </Map>
          {/* </div> */}
        </div>
        <div style={{ display: 'inline-block' }}>
          <Map zoomControl={false} center={[-12.807148, 45.150289]} zoom={9} style={{ height: "30vh", width: "17vw", borderStyle: 'solid', top: '-30vh', left: '-16vw' }} minZoom={2} maxZoom={19}>
            <TileLayer
              // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {/* <MarkerClusterGroup maxClusterRadius={90} >
                  {this.createMarkers()}
                </MarkerClusterGroup> */}
            <ZoomControl position={'bottomleft'} />
            {/* <GeoSearch /> */}
          </Map>
        </div>
        <div style={{ display: 'inline-block' }}>
          <Map zoomControl={false} center={[-21.100976, 55.547002]} zoom={8} style={{ height: "30vh", width: "17vw", marginTop: '20px', borderStyle: 'solid', left: '-33vw' }} minZoom={2} maxZoom={19}>
            <TileLayer
              // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {/* <MarkerClusterGroup maxClusterRadius={90} >
                  {this.createMarkers()}
                </MarkerClusterGroup> */}
            <ZoomControl position={'bottomleft'} />
            {/* <GeoSearch /> */}
          </Map>
        </div>
      </div>
    )
  }
}
