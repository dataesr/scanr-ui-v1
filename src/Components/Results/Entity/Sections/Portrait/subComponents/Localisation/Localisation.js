import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FormattedHTMLMessage } from 'react-intl';

import {
  Map, Marker, TileLayer, Tooltip,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import Axios from 'axios';
import { API_STRUCTURES_END_POINT } from '../../../../../../../config/config';

import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';
import { yellowIcon, greenIcon } from './icons';

import getSelectKey from '../../../../../../../Utils/getSelectKey';

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
    nearData: null,
    showEntityAround: false,
    showEntityGroup: true,
    showAllAddresses: false,
  };

  componentDidMount() {
    const url = `${API_STRUCTURES_END_POINT}/near/${this.props.id}?distance=${0.5}&nb=${1000}`;
    Axios.get(url).then((response) => {
      this.setState({ nearData: response.data });
    });
  }

  toggleEntityAround = () => {
    this.setState(prevState => ({ showEntityAround: !prevState.showEntityAround, showEntityGroup: !prevState.showEntityGroup }));
  }

  toggleDisplayedAddress = () => {
    this.setState(prevState => ({ showAllAddresses: !prevState.showAllAddresses }));
  }

  render() {
    if (!this.props.address) {
      return null;
    }

    const createMarkersGroup = (addresses, data = []) => {
      const markers = [];
      if (data) {
        data.forEach((element) => {
          try {
            markers.push(
              <Marker icon={greenIcon} position={element.address[0].gps} key={element.id}>
                <Tooltip>{element.label.fr}</Tooltip>
              </Marker>,
            );
          } catch (error) {
            // eslint-disable-no-empty
          }
        });
      }
      addresses.forEach((address) => {
        markers.push(<Marker position={address.gps} icon={yellowIcon} key={address.score} />);
      });

      return markers;
    };

    const createMarkersNear = (mainAddress, data = []) => {
      const markers = [];
      if (data) {
        data.forEach((element) => {
          try {
            markers.push(
              <Marker icon={greenIcon} position={element.address[0].gps} key={element.id}>
                <Tooltip>{element.label.fr}</Tooltip>
              </Marker>,
            );
          } catch (error) {
            // eslint-disable-no-empty
          }
        });
      }
      markers.push(
        <Marker position={mainAddress} icon={yellowIcon} key="1" />,
      );
      return markers;
    };

    const getDisplayedAddress = (address = {}, main = false, label = null) => {
      const displayedCity = address.city || '';
      const displayedCountry = address.country || '';
      const displayedSep = (address.city) ? ' - ' : '';
      const cityCountry = displayedCity.concat(displayedSep, displayedCountry);
      const displayedLabel = (label) ? <div className={classes.AddressStrong}>{label}</div> : null;
      return (
        <React.Fragment>
          <hr />
          <div className="d-flex flex-row">
            <div style={(main) ? { fontWeight: 'bold' } : null}>
              {displayedLabel}
              <div>{address.address}</div>
              <div>{cityCountry}</div>
            </div>
            {
              (main) ? <i className="fas fa-flag ml-auto" /> : null
            }
          </div>
        </React.Fragment>
      );
    };

    // Get main Address
    const mainAddress = this.props.address.find(ad => ad.main === true);

    const otherAddresses = this.props.address.filter(ad => ad.main === false);

    const childrenAddresses = this.props.entitiesWhereIMParent.map((child) => {
      if (child.value && child.value.address && child.value.address[0]) {
        return {
          label: child.value.label,
          address: child.value.address,
        };
      }
      return null;
    });

    const getCoordinates = (address) => {
      if (address.gps && address.gps.lat && address.gps.lon) {
        return [address.gps.lat, address.gps.lon];
      }
      return null;
    };

    const getAllBounds = (addresses) => {
      const bounds = [];

      addresses.forEach((address) => {
        const coordinates = getCoordinates(address);
        if (coordinates) {
          bounds.push(coordinates);
        }
      });

      this.props.entitiesWhereIMParent.forEach((item) => {
        if (item.value && item.value.address && item.value.address.length > 0) {
          const coordinates = getCoordinates(item.value.address[0]);
          if (coordinates) {
            bounds.push(coordinates);
          }
        }
      });

      return bounds;
    };

    let mapProps = {};
    let bounds = [];
    if (this.state.showEntityGroup) {
      bounds = getAllBounds(this.props.address);
      mapProps = { maxZoom: 17, bounds, zoom: 14 };
    } else {
      mapProps = { maxZoom: 17, center: [this.props.address[0].gps.lat, this.props.address[0].gps.lon], zoom: 14 };
    }

    const markersNear = createMarkersNear(this.props.address[0].gps, this.state.nearData);
    const markersGroup = createMarkersGroup(this.props.address, childrenAddresses);

    return (
      <div className="col-md-6">
        <div className={classes.Localisation}>
          <div className="row">
            <div className={`col ${classes.NoSpace}`}>
              <CardsTitle title={<FormattedHTMLMessage id="Entity.Portrait.Localisation.title" />} />
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
                  {
                    (this.state.showEntityAround && markersNear)
                      ? (
                        <MarkerClusterGroup maxClusterRadius={20}>
                          {markersNear}
                        </MarkerClusterGroup>
                      )
                      : null
                  }
                  {
                    (this.state.showEntityGroup && markersGroup)
                      ? (
                        <MarkerClusterGroup maxClusterRadius={20}>
                          {markersGroup}
                        </MarkerClusterGroup>
                      )
                      : null
                  }
                  <Marker
                    position={this.props.address[0].gps}
                    icon={yellowIcon}
                  />
                </Map>
              </div>
              <div className={classes.AddressContainer}>
                <div className={classes.Title}>
                  <div className="text-center">
                    {
                      (markersNear.length)
                        ? (
                          <button
                            className={`btn ${classes.btn_scanrBlue} ${classes.ButtonRectangle}`}
                            type="button"
                            onClick={this.toggleEntityAround}
                          >
                            {
                              (this.state.showEntityAround) ? <FormattedHTMLMessage id="Entity.Portrait.Localisation.NoNearby" /> : <FormattedHTMLMessage id="Entity.Portrait.Localisation.nearby" />
                            }
                          </button>
                        )
                        : null
                    }
                  </div>
                  <div className={classes.Address}>
                    {getDisplayedAddress(mainAddress, true)}
                    {
                      (this.state.showAllAddresses)
                        ? (
                          <Fragment>
                            {
                              otherAddresses.map(ad => (getDisplayedAddress(ad)))
                            }
                            {
                              childrenAddresses.map(ad => (getDisplayedAddress(ad.address[0], false, getSelectKey(ad, 'label', this.props.language, 'fr'))))
                            }
                          </Fragment>
                        )
                        : null
                    }
                    <div className="text-right">
                      <a
                        className={classes.LinkAddresses}
                        onClick={this.toggleDisplayedAddress}
                        onKeypress={this.toggleDisplayedAddress}
                        role="button"
                        tabIndex={0}
                      >
                        {
                          (this.state.showAllAddresses) ? <FormattedHTMLMessage id="Entity.Portrait.Localisation.noAllAddresses" /> : <FormattedHTMLMessage id="Entity.Portrait.Localisation.allAddresses" />
                        }
                      </a>
                    </div>
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
  id: PropTypes.array,
  language: PropTypes.string.isRequired,
  entitiesWhereIMParent: PropTypes.array,
};
