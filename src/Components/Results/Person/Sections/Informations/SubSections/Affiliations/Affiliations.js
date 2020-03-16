import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FormattedHTMLMessage } from 'react-intl';

import {
  Map, Marker, TileLayer, Tooltip,
} from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { yellowIcon } from '../../../../../Shared/leafletIcons';

import getSelectKey from '../../../../../../../Utils/getSelectKey';
import CardsTitle from '../../../../../../Shared/Ui/CardsTitle/CardsTitle';

import classes from './Affiliations.scss';

/**
 * Affiliations
 * Url : .
 * Description : .
 * Responsive : .
 * Accessible : .
 * Tests unitaires : .
*/
const Affiliations = (props) => {
  const markers = [];
  const bounds = [];
  if (props.data) {
    props.data.forEach((aff) => {
      if (aff.structure.address && aff.structure.address[0] && aff.structure.address[0].gps) {
        try {
          markers.push(
            <Marker icon={yellowIcon} position={aff.structure.address[0].gps} key={aff.structure.id}>
              <Tooltip>{getSelectKey(aff.structure, 'label', props.language, 'default')}</Tooltip>
            </Marker>,
          );
          bounds.push(aff.structure.address[0].gps);
        } catch (error) {
          // eslint-disable-no-empty
        }
      }
    });

    const testAffs = {};
    props.data.forEach((aff) => {
      const affiliation = { ...aff };
      affiliation.endDate = moment(aff.endDate).format('YYYY');
      affiliation.startDate = moment(aff.startDate).format('YYYY');
      if (affiliation.sources.length === 1) {
        affiliation.subLabel = affiliation.sources.length.toString().concat(' ', 'production');
      } else {
        affiliation.subLabel = affiliation.sources.length.toString().concat(' ', 'productions');
      }
      const key = affiliation.startDate.concat('-', affiliation.endDate);
      if (affiliation.structure.label) {
        if (!(key in testAffs)) {
          testAffs[key] = [];
        }
        testAffs[key].push(affiliation);
      }
    });

    if (props.data.roles) {
      props.data.roles.forEach((role) => {
        const affiliation = {};
        affiliation.startDate = moment(role.startDate).format('YYYY');
        if (role.endDate) {
          affiliation.endDate = moment(role.endDate).format('YYYY');
        } else {
          affiliation.endDate = '\n...';
        }
        affiliation.sources = [];
        affiliation.subLabel = role.role;
        const structure = {};
        structure.id = role.description.split('__idstructure__')[1];
        structure.label = { default: role.description.split('__idstructure__')[0] };
        affiliation.structure = structure;
        const key = affiliation.startDate.concat('-', affiliation.endDate);
        if (!(key in testAffs)) {
          testAffs[key] = [];
        }
        testAffs[key].push(affiliation);
      });
    }

    const orderedYears = Object.keys(testAffs).sort((a, b) => b.slice(-4) - a.slice(-4));

    const mapProps = { maxZoom: 17, bounds, zoom: 14 };

    return (
      <section className={`container-fluid ${classes.Affiliations}`}>
        <div className="row">
          <div className={`col ${classes.NoSpace}`}>
            <CardsTitle
              title={<FormattedHTMLMessage id="Person.Informations.Affiliations.title" />}
              lexicon="PersonAffiliation"
              language={props.language}
            />
          </div>
        </div>
        <div className="row">
          <div className={`col-12 ${classes.CardContainer}`}>
            <div className="w-100">
              <Map
                className={classes.Map}
                {...mapProps}
              >
                <TileLayer
                  attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                  url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
                />
                <MarkerClusterGroup maxClusterRadius={20}>
                  {markers}
                </MarkerClusterGroup>
              </Map>
            </div>
            <div className={`w-100 ${classes.AffiliationsAlert}`}>
              <FormattedHTMLMessage id="Person.Informations.Affiliations.warning" />
            </div>
            <div className={`w-100 ${classes.AffiliationsList}`}>
              {
                orderedYears.map(year => (
                  <div className="d-flex" key={year}>
                    <div className={`pl-2 pt-4 ${classes.AffiliationYears}`}>
                      {year}
                    </div>
                    <div className={`${classes.vl}`} />
                    <div className={`d-flex flex-column pt-3 pb-3 w-100 ${classes.AffiliationItem}`}>
                      {
                        testAffs[year].map(struct => (
                          <div key={JSON.stringify(struct)} className="d-flex pl-2 pr-2 pb-2 align-items-center">
                            <div className="d-flex flex-column mr-auto">
                              <p className={`m-0 ${classes.AffiliationTitle}`}>
                                {getSelectKey(struct.structure, 'label', props.language, 'default')}
                              </p>
                              <p className={`m-0 ${classes.AffiliationYears}`}>
                                {`${struct.subLabel}`}
                              </p>
                            </div>
                            <a href={`/entite/${struct.structure.id}`} className={`align-self-start ml-3 mr-3 btn ${classes.btn_scanrBlue}`}>
                              <i className="fas fa-arrow-right" aria-hidden="true" />
                            </a>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </section>
    );
  }
  return null;
};

export default Affiliations;

Affiliations.propTypes = {
  language: PropTypes.string.isRequired,
  data: PropTypes.array,
};
