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

const PrintControl = withLeaflet(PrintControlDefault);
//
// const cities = require('./data/cities.json');
//
// const data = [];
// cities.forEach((element) => {
//   const tmp = [];
//   tmp.push(element.gps_lat);
//   tmp.push(element.gps_lng);
//   data.push(tmp);
// });

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
      // style: 'button',
      autoClose: true,
      searchLabel: 'Ex : pays, villes, CP...',
      // keepResult: false,
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

// export default class SimpleExample extends Component<{}, State> {
class FranceMaps extends Component<{}, State> {
  constructor() {
    super();
    this.print = this.print.bind(this);
    this.data = [];
    this.label = [];
  }

  state = {
    lat: 46.5,
    lng: 2.618787,
    zoom: 5,
  }

  print() {
    this.printControl.printMap('A4Portrait', 'MyFileName');
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    // const printOptions = {
    //   position: 'topleft',
    //   sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
    //   hideControlContainer: false
    // };
    const downloadOptions = {
      position: 'bottomright',
      filename: 'wesh_le_gang',
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      title: 'Télécharger au format PNG',
      // hideControlContainer: false,
      exportOnly: true,
    };
    // htmlToImage.toPng(document.getElementById('mapContainer'))
    //   .then(function (dataUrl) {
    //     download(dataUrl, 'my-node.png');
    //   });

    // alert(data[0].address[0].gps.lat);
    // alert(data[0].address[0].gps.lon);

    const pos = this.props.data.data;

    pos.forEach((element) => {
      const tmp = [];
      try {
        tmp.push(element.address[0].gps.lat);
        tmp.push(element.address[0].gps.lon);
        this.data.push(tmp);
        this.label.push(element.label.fr);
      } catch (error) {
        console.log(error);
      }
    });
    this.createMarkers = () => {
      const markers = [];
      for (let i = 0; i < this.data.length; i += 1) {
        markers.push(<Marker icon={yellowIcon} position={this.data[i]}><Tooltip>{this.label[i]}</Tooltip></Marker>);
      }
      return markers;
    };
    return (
      <div>
        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '66vw' }}>
          <Map zoomControl={false} center={position} zoom={this.state.zoom} style={{ height: '40vh', width: '66vw', borderStyle: 'solid' }} minZoom={2} maxZoom={19}>
            <TileLayer
              attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <MarkerClusterGroup maxClusterRadius={20}>
              {this.createMarkers()}
            </MarkerClusterGroup>
            <ZoomControl position="bottomleft" />
            {/* <PrintControl ref={(ref) => { this.printControl = ref; }} {...printOptions} /> */}
            <PrintControl style={{ display: 'none' }} ref={(ref) => { this.printControl = ref; }} {...downloadOptions} />
            <GeoSearch />
          </Map>
        </div>
        <button type="button" onClick={() => this.printControl.printMap('A4Portrait', 'MyFileName')}>Print Map</button>
      </div>
      // <div id='mapContainer'>
      //   <div style={{ display: 'inline-block' }}>
      //     <Map zoomControl={false} center={position} zoom={this.state.zoom} style={{ height: "60vh", width: "33vw", borderStyle: 'solid' }} minZoom={2} maxZoom={19}>
      //       <TileLayer
      //         // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       <MarkerClusterGroup maxClusterRadius={60} >
      //         {this.createMarkers()}
      //       </MarkerClusterGroup>
      //       <ZoomControl position={'bottomleft'} />
      //       <PrintControl ref={(ref) => { this.printControl = ref; }} {...printOptions} />
      //       <PrintControl ref={(ref) => { this.printControl = ref; }} {...downloadOptions} />
      //       <GeoSearch />
      //     </Map>
      //   </div>
      //   {/* <button onClick={() => this.print()} >Print Map</button> */}
      //   <div style={{ display: 'inline-block' }}>
      //     <Map zoomControl={false} center={[15.30174, -61.38808]} zoom={7} style={{ height: "30vh", width: "16vw", borderStyle: 'solid', top: '-30vh' }} minZoom={2} maxZoom={19}>
      //       <TileLayer
      //         // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       {/* <MarkerClusterGroup maxClusterRadius={90} >
      //             {this.createMarkers()}
      //           </MarkerClusterGroup> */}
      //       <ZoomControl position={'bottomleft'} />
      //       {/* <GeoSearch /> */}
      //       {/* <PrintControl ref={(ref) => { this.printControl = ref; }} {...printOptions} />
      //       <PrintControl ref={(ref) => { this.printControl = ref; }} {...downloadOptions} /> */}
      //     </Map>
      //     {/* <div class="row"> */}
      //   </div>
      //   <div style={{ display: 'inline-block' }}>
      //     <Map zoomControl={false} center={[4, -53]} zoom={6} style={{ height: "30vh", width: "16vw", marginTop: '20px', borderStyle: 'solid', left: '-16vw' }} minZoom={2} maxZoom={19}>
      //       <TileLayer
      //         // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       {/* <MarkerClusterGroup maxClusterRadius={90} >
      //             {this.createMarkers()}
      //           </MarkerClusterGroup> */}
      //       <ZoomControl position={'bottomleft'} />
      //       {/* <GeoSearch /> */}
      //     </Map>
      //     {/* </div> */}
      //   </div>
      //   <div style={{ display: 'inline-block' }}>
      //     <Map zoomControl={false} center={[-12.807148, 45.150289]} zoom={9} style={{ height: "30vh", width: "17vw", borderStyle: 'solid', top: '-30vh', left: '-16vw' }} minZoom={2} maxZoom={19}>
      //       <T// url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       {/* <MarkerClusterGroup maxClusterRadius={90} >
      //             {this.createMarkers()}
      //           </MarkerClusterGroup> */}
      //       <ZoomControl position={'bottomleft'} />
      //       {/* <GeoSearch /> */}
      //     </Map>
      //   </div>
      //   <div style={{ display: 'inline-block' }}>
      //     <Map zoomControl={false} center={[-21.100976, 55.547002]} zoom={9} style={{ height: "30vh", width: "17vw", marginTop: '20px', borderStyle: 'solid', left: '-33vw' }} minZoom={2} maxZoom={19}>
      //       <TileLayer
      //         // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       {/* <MarkerClusterGroup maxClusterRadius={90} >
      //             {this.createMarkers()}
      //           </MarkerClusterGroup> */}
      //       <ZoomControl position={'bottomleft'} />
      //       {/* <GeoSearch /> */}
      //     </Map>
      //   </div>
      //   {/* <button id='btnClick' onClick={() => this.print()} >Print Map</button> */}
      // </div>ileLayer
      //         // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       {/* <MarkerClusterGroup maxClusterRadius={90} >
      //             {this.createMarkers()}
      //           </MarkerClusterGroup> */}
      //       <ZoomControl position={'bottomleft'} />
      //       {/* <GeoSearch /> */}
      //     </Map>
      //   </div>
      //   <div style={{ display: 'inline-block' }}>
      //     <Map zoomControl={false} center={[-21.100976, 55.547002]} zoom={9} style={{ height: "30vh", width: "17vw", marginTop: '20px', borderStyle: 'solid', left: '-33vw' }} minZoom={2} maxZoom={19}>
      //       <TileLayer
      //         // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      //         // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      //         attribution='&amp;copy <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &amp;copy <a href="https://carto.com/attributions">CARTO</a>'
      //         url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      //       />
      //       {/* <MarkerClusterGroup maxClusterRadius={90} >
      //             {this.createMarkers()}
      //           </MarkerClusterGroup> */}
      //       <ZoomControl position={'bottomleft'} />
      //       {/* <GeoSearch /> */}
      //     </Map>
      //   </div>
      //   {/* <button id='btnClick' onClick={() => this.print()} >Print Map</button> */}
      // </div>
    );
  }
}

export default FranceMaps;

FranceMaps.propTypes = {
  data: PropTypes.string.isRequired,
};
