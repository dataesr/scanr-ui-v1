import React, {Component} from 'react';
import { Map, TileLayer, Marker, Circle, withLeaflet, MapControl, ZoomControl, Tooltip } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

//import 'leaflet/dist/leaflet.css'
import './customLeafletCss.scss'

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
  state = {
    lat: 47,
    lng: 2,
    zoom: 5,
  }

  constructor() {
    super();
    this.circleLat = 0;
    this.circleLng = 0;
    this.circleLatMrs = 0;
    this.circleLngMrs = 0;
    this.circleLatPsg = 0;
    this.circleLngPsg = 0;
    this.loop = false;
  }

  componentDidMount(){
    Promise.all([
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=yPucddQBKXGSgLqCP47t1tz8AnfPrRGS&location=Strasbourg'),
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=yPucddQBKXGSgLqCP47t1tz8AnfPrRGS&location=Marseille'),
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=yPucddQBKXGSgLqCP47t1tz8AnfPrRGS&location=Paris')
    ])
    .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
    .then(([data1, data2, data3]) => {
        this.circleLat = data1.results[0].locations[0].latLng.lat;
        this.circleLng = data1.results[0].locations[0].latLng.lng;
        this.circleLatMrs = data2.results[0].locations[0].latLng.lat;
        this.circleLngMrs = data2.results[0].locations[0].latLng.lng;
        this.circleLatPsg = data3.results[0].locations[0].latLng.lat;
        this.circleLngPsg = data3.results[0].locations[0].latLng.lng;
        if (!this.loop) {
          this.forceUpdate();
          this.loop = true;
        }
    });
}

  render() {
    const position = [this.state.lat, this.state.lng]
    // alert(this.circleLat)
    // alert(this.circleLng)
    // alert(this.circleLatMrs)
    // alert(this.circleLngMrs)
    return (
      <Map zoomControl={false} center={position} zoom={this.state.zoom} style={{height: "400px", width: "1200px"}} >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={position}>
          <Circle center={position} radius={130000} attribution={"test"}/>
        </Marker> */}
        <ZoomControl position={'bottomleft'} />
        <Circle center={[this.circleLat, this.circleLng]} radius={45000} color={'#fdd85e'} stroke={false} fillOpacity={'1'}>
        <Tooltip permanent={true} direction={'center'} className={'leafletCustomText'}>50</Tooltip></Circle>
        <Circle center={[this.circleLatMrs, this.circleLngMrs]} radius={95000} color={'#fdd85e'} stroke={false} fillOpacity={'1'}>
        <Tooltip permanent={true} direction={'center'} className={'leafletCustomText'}>300</Tooltip></Circle>
        <Circle center={[this.circleLatPsg, this.circleLngPsg]} radius={130000} color={'#fdd85e'} stroke={false} fillOpacity={'1'}>
          <Tooltip permanent={true} direction={'center'} className={'leafletCustomText'}>804</Tooltip>
        </Circle>
        <GeoSearch />
      </Map>
    )
  }
}
