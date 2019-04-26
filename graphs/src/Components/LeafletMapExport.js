import React from 'react';
import { Map, TileLayer, WMSTileLayer, LayersControl, FeatureGroup, GeoJSON, withLeaflet } from 'react-leaflet';
import PrintControlDefault from 'react-leaflet-easyprint';
const PrintControl = withLeaflet(PrintControlDefault);

export default class SimpleExample extends React.Component {
  constructor() {
    super();
    this.print = this.print.bind(this);
    
    this.state = {
      center: [2.935403, 101.448205],
      zoom: 10,
      minZoom: 1,
			maxZoom: 22,
    };
  }
  
  print() {
    this.printControl.printMap('A4Portrait', 'MyFileName');
  }
  
  render() {
    const printOptions = {
      position: 'topleft',
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      hideControlContainer: false
    };
    const downloadOptions = {
      position: 'topleft',
      sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
      title: 'Export as PNG',
      hideControlContainer: false,
      exportOnly: true
    };
    return (
      <div>
        <Map {...this.state} style={{height: "400px", width: "1200px"}}>
          <PrintControl ref={(ref) => { this.printControl = ref; }} {...printOptions} />
          <PrintControl {...downloadOptions} />
        </Map>
        <button onClick={this.print} >Print Map</button>
      </div>
    );
  }
}